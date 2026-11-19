# カバレッジによる抜けの洗い出し(coverage)

E2E テストの全体実行中にアプリ側のコードカバレッジを計測し、一度も実行されなかったハンドラや分岐から未検証箇所を見つける工程。見つけた箇所は、[defining.md](defining.md) の探索とゲートを通してからシナリオにする。

カバレッジ率は目標にも合否基準にもしない。カバレッジから分かるのは「どこを見るか」までで、何が起きるかは探索で観測し、テストするかはユーザーが決める。

## 前提

- feature-map に `coverage` ブロックがあること。無ければ [setup.md](setup.md) の「2. ユーザーへの質問」4 に戻って決める
- 起動コマンドを変えられない環境や、本番・共用環境では使わない
- 起動から回収までを 1 つのセッションで終える(バックグラウンドのプロセスはセッション終了で止まり、データが消えることがある)
- Windows でネイティブに動かすアプリは、SIGTERM が無いので Go / Node / Python の回収が成り立たない。Docker(Linux コンテナ)で動かすか、JaCoCo(稼働中の dump)のときだけ使う

## coverage ブロック

`features/feature-map.json` の `coverage`(形式は [conventions.md](conventions.md) の「feature-map.json の形式」)の各項目。値はどれも文字列で、複数行の値(`unreachable` など)は `\n` で書く:

- `language`: `java` / `go` / `node` / `python`
- `started_by`: `agent`(エージェントがバックグラウンドで起動)/ `user`(ユーザーに起動を依頼)
- `start`: 計測付きで起動する 1 コマンド。Go は計装ビルドも含める
- `collect`: JaCoCo は稼働中の dump。Go / Node / Python は、SIGTERM を明示的に送って正常終了させるコマンド(例: `pkill -TERM -f '[d]ist/server.js'`、Docker なら `docker stop <名前>`)。データはプロセスの正常終了時に書き出される
- `report`: レポートを生成するコマンド。Python で `parallel = True` のときは `coverage combine` を `report` の先頭に置く(`collect` の後ろに続けると書き出し前に走る)
- `scope`: 分析するコードの範囲(UI から到達する挙動のコード)。エージェントがコード構成(controller / handler / view のパッケージやディレクトリ)から提案し、ユーザーが確認する
- `unreachable`: UI から到達不能として分析から除く領域と理由。手順 4 で見つかるたびに追記する

## 手順

### 1. 計測付きでアプリを起動

1. 通常起動のアプリが動いていれば止める(`started_by: user` ならユーザーに依頼する)。`playwright.config` に `webServer` があれば `reuseExistingServer: true` かを確かめる。false なら、この実行の間だけ true にしてよいかユーザーに確認し、終わったら戻す
2. `evidence/coverage-raw/` を空にし、`data/` と `report/` を作り直す
3. `coverage.start` で起動する。`started_by: agent` ならバックグラウンドで起動し、`user` ならユーザーに起動を依頼して完了の返答を待つ
4. `baseURL` が応答することを確かめる

JaCoCo で agent 付きの JVM が既に動いているときは、1 と 3 を飛ばして 2 を行い、`coverage.collect` を 1 回実行してカウンタをゼロにする。

### 2. E2E テストの全体実行

[running.md](running.md) の 1〜5 をそのまま行う。以降の手順でも同じ実行 ID を使う。失敗があっても、修復(running の 6)は手順 3 の回収が終わってから行う。running の 6 の状態の戻し(`テスト済み` を `定義済み` にすること)は、手順 4 の分析を終えるまで行わない。手順 4 は `定義済み` の機能のコードを除くので、先に戻すと、その機能のコードが分析から外れる。

### 3. 回収とレポート生成

1. `coverage.collect` を実行する。Go / Node / Python は SIGTERM で正常終了させる(Docker なら `docker stop`)
   - `pkill -TERM -f` のパターンは先頭 1 文字を `[ ]` で囲む(`'[d]ist/server.js'`)。囲まないと pkill を動かしているシェル自身にも一致する
   - `started_by: user` でも SIGTERM はエージェントが送る。ユーザーに頼むなら `kill -TERM <pid>` を指定する(Ctrl+C は SIGINT なので、アプリが SIGINT でも終了処理をする場合だけ使える)
   - 送るシグナルが分からない停止手段(IDE やエージェントのプロセス停止機能)と `kill -9` は使わない。データが消える
2. プロセスが消えたこと(`pgrep -f '[d]ist/server.js'` が空)と、`data/` に生データがあること(`ls -A` で `covcounters.*` / `coverage-*.json` / `.coverage*` / `jacoco.exec` が見える)を確かめてから進む。生データが無いまま report すると、全ファイル 0% のもっともらしいレポートができてしまう
3. `coverage.report` でレポートを作り、`evidence/coverage-raw/report/` を `evidence/<実行ID>/coverage/` にコピーする(HTML と機械可読形式の両方)

回収の後、Go / Node / Python のアプリは止まっている。探索や修復に進む前に通常起動で立ち上げ直す(`started_by: user` なら依頼する)。

### 4. 分析

機械可読レポートを `scope` に絞って読む。次は先に除く:

- status が `未着手` / `定義済み` / `対象外` の機能のコード
- 失敗したシナリオと既知バグのシナリオが通るはずだった経路(`test-results/results.json` と突き合わせる)
- `coverage.unreachable` に記録済みの領域

見るのは次の 2 つ:

- 一度も実行されなかったエントリポイント(ハンドラ / コントローラ / ビュー / ルート)。コードを読み、対応する画面と操作を特定する
- scope 内でエントリポイントから到達する、未実行の分岐

見つけた箇所を feature-map と突き合わせて分類する:

| 分類 | 条件 | 扱い |
|---|---|---|
| 既存機能の未検証箇所 | 対応する機能が feature-map にあり、その .feature に該当する挙動のシナリオが無い | 探索対象として提示する |
| feature-map に無い機能 | 対応する機能が feature-map に無い | 機能の追加を提示する(機能マップの過不足はユーザーが決める) |
| UI から到達不能(推定) | 障害時の分岐、内部ジョブ、無効化されたフィーチャーフラグの経路など | 「到達不能として記録する予定」と提示し、異論が無ければ `coverage.unreachable` に領域と理由を追記する |

エントリポイント単位で見て、未実行の行を全部は拾わない。提案するのは、画面で観測できる結果(Then)を書けるシナリオだけにする。10 件を大きく超えるなら、機能ごとに区切って提示する。

### 5. 提示とユーザー判断

次の形式で提示する:

```markdown
## カバレッジから見つかった未検証箇所(実行ID: <実行ID>)

| # | 機能 | 未実行コード | 推定される画面上の挙動 | 提案 |
|---|---|---|---|---|
| 1 | 商品検索 | `SearchController#search` L42-48(キーワード空の分岐) | 空のまま検索するとエラー表示? | 探索して追加シナリオを検討(異常系) |
| 2 | (なし) | `ExportController` 全体 | CSV エクスポート | feature-map への追加を判断してください |
| 3 | 注文 | `OrderService` L120(在庫更新の DB 例外) | UI から再現不能 | 到達不能として記録する予定(異論があれば教えてください) |

### 疑問点(回答が必要です)

Q1. ...
```

- 「推定される画面上の挙動」はコードから読んだ仮説なので、この段階では Given / When / Then を書かない
- ユーザーが採用した箇所は、機能ごとに defining.md の 2.1〜2.4(探索、採番、候補と疑問点の提示、ユーザーによる .feature の確定)をすべて行ってから generating に進む
- feature-map に機能を足すときは `未着手` で登録し、着手順をユーザーに確認する

提示と同時に、`evidence/<実行ID>/summary.md` に節「カバレッジ」を追記する。中身は、計測範囲(`scope`)/ 除外後に残った、一度も実行されなかったエントリポイントの一覧 / 提示した件数と分類、の 3 つ。率は書かない。

## 初回の動作確認(setup で一度)

`coverage` ブロックを決めたら、E2E テストを回す前に計測の経路が通ることを確かめる: 手順 1 で起動 → `baseURL` を 1 回開く(curl でよい)→ 手順 3 の回収とレポート生成(実行 ID は無いのでコピーは不要)→ レポートの scope 内に 0% 以外の行があることを確かめる。何も出なければ、停止時に書き出されていない(Go / Node / Python の終了処理)か、レポートの参照先(class ファイル・ソース・source map)が違う。

## 言語別レシピ

コマンドは feature-map の `coverage` ブロックに記録する。ここにあるのは各言語の要点で、パスや起動方法はプロジェクトのものを使う。アプリのルートが Playwright のルートと別(monorepo など)なら、起動と report の cwd をアプリ側にし、パスを読み替える。計測のためにアプリ側のコード(シグナル処理、終了ハンドラ)を変える必要があれば、差分を提示して承認を得てから変える。

### Java / Kotlin(JaCoCo)

- 起動: `java "-javaagent:<path>/jacocoagent.jar=output=tcpserver,port=6300" -jar app.jar`(引用符は PowerShell が `,` で引数を分けないために付ける)。コード変更・再ビルドは要らない。Docker なら `address=*` を足してポートを公開する
- 回収(稼働中のまま): `java -jar <path>/jacococli.jar dump --destfile evidence/coverage-raw/data/jacoco.exec --reset`
- レポート: `java -jar <path>/jacococli.jar report evidence/coverage-raw/data/jacoco.exec --classfiles <classes ディレクトリ> --sourcefiles src/main/java --csv evidence/coverage-raw/report/jacoco.csv --xml evidence/coverage-raw/report/jacoco.xml --html evidence/coverage-raw/report/html`
  - `--classfiles` はビルド出力の classes ディレクトリ(Gradle: `build/classes/java/main`、Kotlin は `build/classes/kotlin/main` も。Maven: `target/classes`。複数指定可)。Kotlin は `--sourcefiles src/main/kotlin` も付ける。fat jar を指すと、ライブラリのクラスが 0% で大量に混ざる
  - class ファイルは、起動中の jar と同じビルドのものを使う(実行後に再ビルドしてから report すると class id が合わず 0% になる)
  - 分析は CSV(クラス単位。未ロードのクラスも 0 で出る)→ XML(行・分岐)の順に読む
- `jacocoagent.jar` / `jacococli.jar` は JaCoCo の配布物に入っている。プロジェクトの外(例 `~/.jacoco/`)に置き、`<path>` はそこを絶対パスで指す
- tcpserver には認証が無い。本番・共用環境には付けない

### Go(`go build -cover`、Go 1.20 以上)

- 起動(`start` にビルドを含める): `go build -cover -o <bin> ./cmd/app && GOCOVERDIR=evidence/coverage-raw/data <bin>`。既定でメインモジュールの全パッケージを計装する。`GOCOVERDIR` のディレクトリは先に作っておく
- 回収: データは `main` の正常終了か `os.Exit` で書き出される。シグナルを処理していないサーバーは SIGTERM で即終了してデータが残らないので、`signal.NotifyContext`(SIGTERM / SIGINT)+ `srv.Shutdown` で main を抜ける変更を提案する。panic で終わってもデータは失われる
- レポート: `go tool covdata textfmt -i=evidence/coverage-raw/data -o evidence/coverage-raw/report/profile.txt && go tool cover -func=evidence/coverage-raw/report/profile.txt > evidence/coverage-raw/report/func.txt && go tool cover -html=evidence/coverage-raw/report/profile.txt -o evidence/coverage-raw/report/coverage.html`
  - `func.txt` は関数単位で、0.0% の関数がエントリポイントの抜け。分岐カバレッジは無く文単位だけなので、if ブロック内の未実行文から分岐を読み取る

### Node.js / TypeScript(V8 内蔵 + c8)

- 起動: `NODE_V8_COVERAGE=evidence/coverage-raw/data node dist/server.js`。計装・再ビルドは要らない。子プロセスにも自動で伝わる
- 回収: プロセス終了時に書き出されるが、ハンドラの無い SIGTERM / SIGINT では書き出されない(nodejs/node#35212)。SIGTERM と SIGINT の両方で `process.exit()` する処理(既存の graceful shutdown があればその末尾に `process.exit()`)を提案する
- レポート: `npx c8 report --temp-directory evidence/coverage-raw/data --all --src <実行されるコードの場所(ビルド済みなら dist、tsx / ts-node で直接実行なら src)> --reporter=lcovonly --reporter=html --reports-dir evidence/coverage-raw/report`
  - `lcov.info` の `FNDA:0,<関数名>` が未実行の関数、`BRDA` が行ごとの分岐。無名のルートハンドラ(`app.get('/x', (req, res) => …)`)は `(anonymous_N)` になるので、`FN:<行>` の行番号からコードを特定する
  - `--all` で、読み込まれなかったファイルも 0% として出る
  - TypeScript や bundler の出力は、source map 付きでビルドされていれば元ファイルに対応付けられる(無いと dist の行番号しか出ない)

### Python(coverage.py)

- 専用の設定ファイル(例 `.coveragerc.e2e`)を作り、すべての coverage コマンドに `--rcfile=.coveragerc.e2e` を付ける(環境変数 `COVERAGE_RCFILE` は `&&` で繋いだ 2 つ目以降のコマンドに効かない)。プロジェクトの単体テスト用の設定は触らない:

  ```ini
  # 行末コメントは値の一部と解釈されるので、コメントは行頭にだけ書く
  [run]
  data_file = evidence/coverage-raw/data/.coverage
  branch = True
  # 計測対象パッケージ。import されなかったファイルも 0% で出る
  source =
      app
  # SIGTERM 停止で書き出す(Linux / macOS のみ)
  sigterm = True
  ```

  gunicorn などマルチプロセスのときだけ、次を追記する(`report` の先頭に `coverage combine --rcfile=.coveragerc.e2e` が要る):

  ```ini
  parallel = True
  # os._exit() で終わるワーカーからもデータを取る(coverage 7.10 以上)
  patch =
      subprocess
      _exit
  ```

- 起動: `coverage run --rcfile=.coveragerc.e2e -m uvicorn app.main:app`。Django の開発サーバーは `runserver --noreload` にする(リローダの親プロセスが別に残り、停止と回収が二重になる)
- 回収: SIGTERM で止める(`sigterm = True` が前提)
- レポート: `coverage json --rcfile=.coveragerc.e2e -o evidence/coverage-raw/report/coverage.json && coverage html --rcfile=.coveragerc.e2e -d evidence/coverage-raw/report/html`。JSON はファイルごとの `missing_lines` と、関数単位の `functions`(7.5 以上)を持つ

### 共通

- Docker: agent やツールをイメージに入れ、出力先のディレクトリをボリュームにし、`docker stop` で止める。CMD / ENTRYPOINT は exec 形式(JSON 配列)にする。shell 形式だと SIGTERM がアプリに届かず、10 秒後の SIGKILL でデータが消える。graceful shutdown に時間がかかるなら `docker stop -t 30`。JaCoCo は TCP で dump できるのでボリュームは要らない
- 計測付きの起動は通常より遅く、メモリも増える。全体実行でタイムアウトが出たら値を伸ばさず、計測なしで再実行して切り分ける([test-code-rules.md](test-code-rules.md) の「2. 待機とタイムアウト」)
