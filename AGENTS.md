# AGENTS.md

ブラウザ E2E テスト用 Agent Skill `e2e-testing` を開発・配布するリポジトリ。利用者向けの説明は README.md に、開発に必要な事実はこのファイルに書く。文書とコードコメントは日本語、コミットメッセージは英語。

## 構成

- `skills/e2e-testing/`: 配布物の本体。`SKILL.md` が入口、`references/` が状況に応じて読まれる手順、`scripts/e2e-trace.mts` が照合ツール、`viewer/` がビューア。照合ツールは利用者のプロジェクトへ setup がコピーして使う
- `skills/e2e-testing/viewer/`: 配布するビューア(表とレビュー用 CSV)。`build.mjs` と `README.md` だけを置く。`build.mjs` はリポジトリ直下の `viewer/` から作る生成物で、依存と照合ツールごと 1 ファイルにまとめてある。利用者は Node だけで実行し、依存をインストールしない。手で編集しない
- `viewer/`: ビューアの開発用のソース。配布しない。入口の `src/build.ts` が、照合ツールの `inspect` と `deriveResults` の結果と `features/last-run.json` を読み、React の `renderToStaticMarkup` で HTML を書いて、`features/viewer/` と入れ替える。`bundle.mts` が esbuild で `src/build.ts` を依存と照合ツールごとまとめ、`skills/e2e-testing/viewer/build.mjs` に書き出す。esbuild の `define` で `import.meta.main` を `false` にし、取り込んだ照合ツールの CLI を止める。依存は `viewer/package.json` と `viewer/pnpm-lock.yaml` で exact に固定し、build.mjs に取り込むものを dependencies、それ以外を devDependencies に置く。viewer はルートと別の pnpm プロジェクトで、ルートのワークスペースに入れない。`viewer/test/` は vitest のテストと fixture。`viewer/test/fixtures/project/` は、ビューアのテストと、照合ツールとビューアを利用者と同じ順で通して確かめるときに使うプロジェクト。`viewer/test/fixtures/` と生成物の `skills/e2e-testing/viewer/build.mjs` は Biome の対象外
- `viewer/.storybook/` と `viewer/stories/`: Storybook の設定と、表のページ(`src/ViewerPage.tsx`)のストーリー。`@storybook/react-vite` は React のプラグインを足さないので、`.storybook/vite.config.ts` で足す
- `test/`: 照合ツールのテスト。`test/fixtures/` は照合ツールの入力データで、整形すると検査内容が変わるため Biome の対象外

## コマンド

Node.js 22.18 以上と pnpm 12.11.2(ルートの package.json の `packageManager`)。`.mts` はトランスパイルせず Node の型ストリップで直接実行する。

```bash
pnpm install --frozen-lockfile
pnpm run lint       # biome ci . 整形崩れとルール違反で失敗する
pnpm run lint:fix   # biome check --write .
pnpm run typecheck  # tsc --noEmit 実行時に型検査は行われないのでここで行う
pnpm test           # node --test "test/**/*.test.mts"
pnpm run archive    # dist/sample-e2e-testing-skill-<git describe>.zip を作る。README と LICENSE と THIRD-PARTY-LICENSES とスキル一式、git archive なので追跡ファイルのみ
```

viewer(リポジトリ直下の `viewer/`)は別の package.json と pnpm-lock.yaml を持つ。lint はルートの `pnpm run lint` が viewer も対象にする。

```bash
cd viewer
pnpm install --frozen-lockfile
pnpm run bundle     # src/build.ts を依存と照合ツールごとまとめ、skills/e2e-testing/viewer/build.mjs とリポジトリ直下の THIRD-PARTY-LICENSES を作り直す
pnpm run typecheck  # viewer の tsconfig で型検査する。bundle.mts、.storybook、stories を含む
pnpm run storybook  # Storybook を http://127.0.0.1:6006 で起動する。127.0.0.1 だけで待ち受ける
pnpm test           # vitest run。node と storybook の 2 つのプロジェクトを実行する
```

`pnpm test` の node プロジェクトは `test/` のテストを Node で実行する。ビルドのテストは、コミットされた `skills/e2e-testing/viewer/build.mjs` を fixture のプロジェクトで実行する。`test/bundle.test.ts` は、bundle.mts で一時ディレクトリに作り直したものと、コミットされた build.mjs がバイト単位で一致するかを確かめる。storybook プロジェクトは `stories/` のストーリーを Chromium で描き、描画、アクセシビリティの違反、play 関数のレイアウトの検査で失敗する。Chromium は Playwright のものを使うので、初めてのときは viewer で `pnpm exec playwright install chromium` を実行しておく。片方だけ実行するときは `pnpm test --project node` か `pnpm test --project storybook`。

viewer の `src/` か依存を変えたら、viewer で `pnpm run bundle` を実行し、ソースと `skills/e2e-testing/viewer/build.mjs` と `THIRD-PARTY-LICENSES` を同じコミットに入れる。作り直し忘れると `test/bundle.test.ts` が落ちる。`THIRD-PARTY-LICENSES` は build.mjs に取り込んだ第三者パッケージのライセンス全文で、bundle.mts が生成する。手で編集しない。

照合ツール(`skills/e2e-testing/scripts/e2e-trace.mts`)の中身を変えたら、先頭の `TRACE_TOOL_VERSION` を 1 増やす。利用者のプロジェクトのコピーが古いかを、エージェントがこの定数で確かめるため。`build.mjs` は照合ツールを取り込んでいるので、viewer で `pnpm run bundle` を実行し、照合ツールと作り直した `build.mjs` を同じコミットに入れる。

変更を終えたら lint・typecheck・test を通す。viewer か照合ツールを変えたら、viewer の typecheck と test も通す。

## CI とリリース

`.github/workflows/ci.yml` が main への push と Pull Request で、check ジョブ(lint・typecheck・test)と viewer ジョブ(リポジトリ直下の viewer/ で typecheck と test)を実行する。Node は 22 の最新、pnpm は `pnpm/action-setup` が package.json の `packageManager` から読むので、pnpm の版を上げるときは package.json だけを変える。pnpm のストアは `actions/setup-node` の `cache: pnpm` がロックファイルごとにキャッシュする。viewer ジョブは、ストーリーのテストのために `pnpm exec playwright install --with-deps chromium` で Chromium と、それが要る OS のパッケージを入れてからテストする。`v` で始まるタグを push すると `.github/workflows/release.yml` が `npm run archive` で zip を作り、`gh release create` で GitHub Release にアセットとして添付する。リリース名はタグ名。

```bash
git tag v1.0.0 && git push origin v1.0.0
```

## 規約

- Biome は recommended ルールのみで `biome-ignore` を使わない。違反はコード側で直す
- `lineWidth: 140` と `quoteStyle: "single"` は既存コードとの整形差分が最小になる値。変えると全ファイルが再整形される
- 文書では番号付きの造語ラベルや文末の括弧参照を使わず、見出しは規則の本体を言う
- README には利用者が今の構成を理解・操作するための事実だけを書く。経緯・検証ログ・計測値は書かない
- viewer に依存を足すときは、package.json に exact な版を書き、ロックファイルを残したまま `pnpm install` する。依存の版はモジュールの区切りのコメント(`node_modules/.pnpm/react@19.3.1/…`)として build.mjs に入るので、版を変えたら `pnpm run bundle` で作り直す
- pnpm 12 は公開から 1 日たっていない版を解決せず、ロックファイルにあると install を止める(既定の `minimumReleaseAge`)。依存を足して install が止まったら、1 日待つか一つ前の版にする
- `viewer/pnpm-workspace.yaml` の `allowBuilds` で esbuild のインストールスクリプトを止める。pnpm 12 は、許可も拒否もしていないスクリプトがあると install を失敗させる。スクリプトを止めても、bundle.mts が使う esbuild の API は動く
