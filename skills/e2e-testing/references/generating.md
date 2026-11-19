# テスト生成(generating)

確定した .feature のシナリオを、素の Playwright テストにする工程。CLI での実演、コード生成、アサーション追加の方法は playwright-cli スキルの test-generation リファレンスに従う。テストファイルは [conventions.md](conventions.md) の「テストファイル」の形式で書き、[test-code-rules.md](test-code-rules.md) に従う。Windows(PowerShell)で実行するときのコマンドの読み替えは [setup.md](setup.md) の「1. 前提条件とワークスペースの確認」にある。

- ステップはすべて playwright-cli で実際に操作し、出力されたコードを使う。snapshot を見ずにロケータを書かない
- 実演中に .feature と実アプリが食い違ったら、SKILL.md の「失敗と不整合の扱い」に従う
- シナリオは 1 つずつ順番に処理する(playwright-cli のセッションとデバッグ実行は同時に 1 つしか持てない)

照合ツール(`npm run e2e:trace`)で、テストファイルがすでに結ばれているシナリオ(`## 不整合` に `未生成` で出ないもの)は生成し直さず、下の手順 5 の単体実行だけを行う。状態を `定義済み` に戻した機能が、機能ループに再び入ったときのため。

## シナリオ 1 件の手順

1. 最初の Given からロールを読み、そのロールの seed に attach する([setup.md](setup.md) の「seed への attach 定型」。`-g "<ロール名>"` で指定)
2. Given → When → Then を 1 句ずつ CLI で実演し、生成されたコードを集める
3. テストファイルを `tests/e2e/<機能スラッグ>/<シナリオ ID>-<シナリオスラッグ>.spec.ts` に書き出す(名前の決まりは [conventions.md](conventions.md) の「命名規則」)。既定以外のロールと未認証のシナリオでは、実演に使った seed と同じ storageState を `test.use` で宣言する
4. セッションを閉じ、バックグラウンドのテストを止める
5. 書き出したテストを単体で実行し、green を確かめる:

   ```bash
   PLAYWRIGHT_HTML_OPEN=never npx playwright test tests/e2e/<機能スラッグ>/<シナリオ ID>-<シナリオスラッグ>.spec.ts
   ```

   失敗したら、playwright-cli スキルの test-generation リファレンス「3. Heal」の手順でそのテストを `--debug=cli` で起動して attach し、観察してから SKILL.md の「失敗と不整合の扱い」に従う。green になってから次のシナリオに進む

## 機能の締め

対象機能の全シナリオが green になったら:

1. `npm run e2e:trace` を実行する。標準出力の `## 不整合` で、機能欄が対象機能(feature-map の `name`)の行が 0 なら 2 に進む。他機能の行(まだ生成していない機能の `未生成` など)は判断に含めないので、終了コードではなく機能欄で絞る
   - 対象機能の行があれば、SKILL.md の「失敗と不整合の扱い」に従って直し、照合ツールをやり直す
   - 未生成のシナリオが単なる生成漏れなら、「シナリオ 1 件の手順」で生成してから 1 に戻る
2. feature-map の状態を `テスト済み` にし、ビューアをビルドする(SKILL.md の「表とレビュー用 CSV の更新」)
3. 次の 4 点を報告する: 生成したテストファイルの一覧 / green の実行結果 / .feature に加えた変更(あれば)/ 照合ツールで対象機能の不整合が 0 だったこと
