# E2E テスト仕様のビューア

照合ツールの検査の結果(`features/feature-map.json`、`features/*.feature`、`tests/e2e/` のテスト)と、全体実行の結果の控え `features/last-run.json` から、要件とシナリオの表 `features/viewer/index.html` と、行ごとにコメント欄を持つレビュー用の CSV `features/viewer/review.csv` を作る。どちらもコミットする生成物で、手で編集しない。

## ビルド

プロジェクトのルートで実行する。引数は取らない。

```bash
node <このスキルのディレクトリ>/viewer/build.mjs
```

- ビルドするきっかけは、[SKILL.md](../SKILL.md) の「表とレビュー用 CSV の更新」に従う
- 要るのは Node.js 22.18 以上だけ。`build.mjs` は依存と照合ツールをまとめた 1 ファイルなので、インストールもネットワークも要らず、プロジェクトにもスキルの置き場にも `node_modules` を作らない。`build.mjs` は生成物なので編集しない
- 出力は `features/viewer/` の `index.html` と `review.csv`。新しい出力を書き終えてから、前回の出力と入れ替える。`index.html` は CSS と、列の幅を変えるスクリプトを埋め込み、外部のファイルを参照しないので、ブラウザで直接開ける
- 成功すると終了コード 0 で、`features/viewer/ を更新した(機能 N、要件 N、シナリオ N)` の 1 行を出す。報告に、`features/viewer/index.html` を更新したことを 1 行で添える。ユーザーに初めて伝えるときは、`index.html` をブラウザで直接開けることと、下の「Excel で CSV を保存するとき」も添える
- 同じプロジェクトで、ビルドを同時に 2 つ走らせない

## 失敗したとき

0 以外の終了コードで終わり、標準エラーにエラーの中身が出る。`features/viewer/` には前回の出力が残る。止まるのは次のとき:

- 照合ツールの不整合のうち、表を作れないもの(ID 未付与、.feature 側の重複 ID、feature-map の形式、feature-map に無い .feature、.feature の無い機能、slug の重なり)。1 件 1 行の `<種別>: <機能>: <対象>` で、照合ツールの `## 不整合` と同じ中身が出る。ほかの不整合と状態と結果の食い違いでは止まらない。`未生成` はシナリオの結果の列に、それ以外はページの「照合ツールの不整合」の節に出る
- `features/feature-map.json` が無い
- .feature の構文エラー。`<パス>: (<行>:<列>): <理由>` の形で出る
- 照合ツールと Gherkin の読み取りの食い違い。`<パス>:<行>: 照合ツールと Gherkin の読み取りが食い違う(<原因の見当>)` の形で出る
- `features/last-run.json` が読めない。JSON として読めないとき(ブランチのマージで衝突の印が入ったときなど)は、生成物なので手で直さない。git でどちらかの版に戻すか(`git checkout --theirs features/last-run.json` か `--ours`)、全体実行をやり直して `npm run e2e:trace -- --run-id <実行ID>` で書き直してから、ビルドし直す
- `features/viewer/` を入れ替えられない、書けない

どれも [SKILL.md](../SKILL.md) の「失敗と不整合の扱い」に振り分ける。Windows で `features/viewer/` の中のファイルを Excel などのアプリが開いていると、入れ替えられずに止まる。そのアプリは自分で閉じず、閉じてもらってからビルドし直すよう報告に書く。ビューアは補助なので、環境の問題で直せないときは報告に書き添えて、E2E テストの作業を続ける。

## テストファイルへのリンク

要件とシナリオの表で、シナリオの結果の下に出るテストファイルのパスは、`index.html` から見た相対パスで `.spec.ts` へリンクする。エディタで開くときは、パス(リンクの `title` にも入っている)をコピーする。`evidence/<実行ID>/` にコピーした `index.html` からは、相対パスの起点が変わるのでリンクを開けない。

## Excel で CSV を保存するとき

`review.csv` は UTF-8(BOM 付き)なので、Excel でそのまま開ける。コメントを書いて保存するときは、ファイルの種類で「CSV UTF-8」を選ぶ。ほかの CSV の形式では UTF-8 で保存されない。保存先は `features/viewer/` の外にする。`features/viewer/` はビルドのたびに置き換わるので、中に保存すると、feature-map か .feature を書き換えた後のビルドで消える。
