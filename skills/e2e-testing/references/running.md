# E2E テストの実行と証跡(running)

Windows(PowerShell)で実行するときのコマンドの読み替えは [setup.md](setup.md) の「1. 前提条件とワークスペースの確認」にある。

## 手順

### 1. データ初期化

```bash
npm run e2e:reset-data
```

手動リセット運用のプロジェクトでは、ユーザーにリセットを依頼し、完了の返答を待つ。どちらの場合も、初期化が終わってから 2 に進む。

### 2. 全体実行

実行 ID([conventions.md](conventions.md) の「命名規則」)を決め、全シナリオの trace を証跡に残すため `--trace on` を付けて実行する:

```bash
PLAYWRIGHT_HTML_OPEN=never npx playwright test tests/e2e --trace on
```

### 3. 証跡の保全

```bash
mkdir -p evidence/<実行ID>
cp -r playwright-report evidence/<実行ID>/playwright-report
cp test-results/results.json evidence/<実行ID>/results.json
```

`evidence/<実行ID>/summary.md` を書く。中身は、実行日時 / 対象環境 / コミットハッシュ(取れれば)/ 機能ごとの pass・fail 件数 / 失敗シナリオの一覧。

### 4. 結果の記録

3 の直後、`test-results/results.json` がこの全体実行のものであるうちに、照合ツールで `features/last-run.json` を書き、ビューアをビルドして(SKILL.md の「表とレビュー用 CSV の更新」)、両方を証跡にコピーする:

```bash
npm run e2e:trace -- --run-id <実行ID>
node <このスキルのディレクトリ>/viewer/build.mjs
cp features/last-run.json evidence/<実行ID>/last-run.json
cp -R features/viewer evidence/<実行ID>/viewer
```

- 照合ツールの終了コード `1`(不整合あり)でも `features/last-run.json` は書かれている。続けてビルドとコピーを行い、不整合は 6 で扱う
- 照合ツールの終了コード `2`(実行不能)なら、標準エラーに出た原因を直して再実行する。`test-results/results.json` が壊れていれば 2 からやり直す。`features/last-run.json` を手で書いて代わりにしない
- ビルドが失敗したら、`features/viewer/` は前回の出力のままなので、証跡にコピーしない。エラーの扱いは SKILL.md の「表とレビュー用 CSV の更新」に従う
- 証跡にコピーした `index.html` からは、テストファイルへのリンクを開けない(相対パスの起点が変わるため)。読むときは、リンクの `title` のパスを使う

### 5. 報告

次の順に報告する:

1. 総括 1 行(例: 24 シナリオ中 22 green、2 failed)
2. 機能ごとの集計表
3. 失敗シナリオの一覧(機能 / シナリオ名 / テストファイル)
4. 証跡の場所(`evidence/<実行ID>/`)と閲覧コマンド `npx playwright show-report evidence/<実行ID>/playwright-report`
5. 照合ツールの標準出力の `## 集計`(状態と結果の食い違いを含む)と `## 不整合`。要約せずにそのまま貼る(不整合が無ければ `なし` のまま)

### 6. 失敗・不整合への対応

- テストの失敗: 修復に進むかユーザーに確認する。進め方は SKILL.md のルーティングの「テストが失敗した / flaky を直したい」。失敗したテストを再実行の繰り返しで通そうとしない([test-code-rules.md](test-code-rules.md) の「4. 実行とデータ」)
- 不整合(4 の `## 不整合` に行がある): SKILL.md の「失敗と不整合の扱い」に従う
- 修復がこのセッションで終わらないとき(.feature の修正案か、アプリのバグ疑いについて、ユーザーの判断を待つとき)だけ、`fail` のある `テスト済み` の機能を `定義済み` に戻す。テストコードの問題として直し、その要件を指定した部分実行が通ったものは戻さない。戻した機能は、修復して、その機能の要件を指定した部分実行がすべて通り、照合ツールで不整合が無ければ、`テスト済み` に戻す
- 修復した後は該当テストだけを再実行する(次節)。`features/last-run.json` は次の全体実行で更新される

## 要件を指定した実行

ユーザーが要件 ID を指定したときや、修復後に該当要件だけ確かめるときは、tag で絞る:

```bash
npx playwright test tests/e2e --grep "@REQ-<番号>-"
```

末尾の `-` で、`REQ-001` の指定が `REQ-0010` などに一致しないようにする。部分実行では `test-results/results.json` がその要件の分だけになるので、照合ツールに `--run-id` を付けない(`features/last-run.json` を書かない)。
