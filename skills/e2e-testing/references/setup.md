# 環境準備(setup)

## 1. 前提条件とワークスペースの確認

```bash
node --version                         # 22.18 以上か
playwright-cli --version               # playwright-cli コマンドが動くか
npx playwright cli --version           # playwright-cli が無いときは、こちらで確かめる

# Playwright ワークスペースか(どちらかが通れば OK)
ls playwright.config.*
npx --no-install playwright --version
```

- playwright-cli が無ければ導入を案内する。CLI は `npm i -g @playwright/cli@latest`、スキルは `npx skills add microsoft/playwright-cli --skill playwright-cli -g -a kiro-cli claude-code codex -y`。このコマンドは Kiro・Claude Code・Codex にスキルを配置し、使わないエージェントは `-a` から外してよい
- Node.js が古いときは SKILL.md の「前提条件」に従う
- Playwright ワークスペースが無ければ `npm init playwright@latest` で作る。選択肢はユーザーに任せる(TypeScript とテストディレクトリ `tests` を勧める)。作ったら次を行う:
  - `playwright.config.ts` を [conventions.md](conventions.md) の「playwright.config 推奨値(新規セットアップ時)」で丸ごと置き換え、`baseURL` を対象環境の URL にする
  - 生成されたサンプル(`tests/example.spec.ts`、`tests-examples/`)を消す
  - [conventions.md](conventions.md) の「.gitignore 必須項目」と「.gitattributes 必須項目」を追加する
- 既存の config があるときは [conventions.md](conventions.md) 冒頭の優先関係に従う
- Windows(PowerShell)で実行するときは、スキルの文書にあるコマンドを次のように読み替える:
  - 環境変数を前に置くコマンド(`PLAYWRIGHT_HTML_OPEN=never npx playwright test …`)は、`$env:PLAYWRIGHT_HTML_OPEN='never'; npx playwright test …` のように `$env:名前='値';` を前に置く形にする。同じシェルのセッションでは 1 回設定すればよい
  - `mkdir -p` は `-p` を外す(PowerShell の `mkdir` は親のディレクトリも作る)
  - `npm` / `npx` が「このシステムではスクリプトの実行が無効になっているため…」のエラーで止まるときは、`npm.cmd` / `npx.cmd` を使う。PowerShell の実行ポリシーは変えない(変える必要があるなら、ユーザーの了承を得る)

## 2. ユーザーへの質問

次をまとめて 1 回で聞く。

1. アプリ名と対象環境
   - アプリ名: 要件文の `the <アプリ名> SHALL …` に使う名前(例: `会員サイト`)。`features/feature-map.json` の `app` に記録する(`features/feature-map.json` は defining で作るので、それまで控えておく)
   - テスト対象の URL、ローカル開発サーバーか専用のテスト環境か、起動方法
   - 探索とデータ初期化で中身を壊してよい環境か。本番データや共用データを含む環境なら作業を進めない
2. アカウントとロール
   - ログインが要るか。テスト用アカウントの資格情報は環境変数名で受け取り、値をチャットや config に書かない
   - ロールが複数あるか(一般/管理者など)。ロールごとにテストすべき挙動の違いがあるか
   - ロールが複数あれば、既定ロール(最も多くのシナリオが使うロール)を 1 つ決める
3. テストデータの初期化
   - 手段はどれか: 専用 API やシードスクリプトがある / DB を直接リセットできる(コマンド、docker compose など)/ 何も無い。何も無ければ「初期化スクリプトを作る」か「手動リセット運用」かをユーザーが選ぶ
   - 初期化後の状態(ベースライン状態)は空か、代表データ入りか。代表データが無ければ、ベースラインに含める方法(シードスクリプトに足すなど)をユーザーと決める
   - テスト単位のデータ投入・削除の手段(テスト用 API / DB 直接 / UI 操作のみ)
4. カバレッジ計測(任意)
   - [coverage.md](coverage.md) の工程を使うか
   - 使うなら、アプリの言語(Java / Go / Node / Python)、計測付きの起動方法(ローカルか Docker か)、起動する人(エージェントがバックグラウンドで起動 / ユーザーが起動)、ソースコードとビルド出力の場所を聞き、[coverage.md](coverage.md) の「coverage ブロック」の各項目を決める。決めた内容は `features/feature-map.json` の `coverage` に記録する(それまで控えておく)

## 3. データ初期化の npm script

決まった初期化手段を、npm script `e2e:reset-data` 1 つにまとめる(手動リセット運用なら作らない)。このスクリプトはベースライン状態に戻すもので、データを空にするものではない。ベースラインの中身は `features/feature-map.json` の `baseline_data` に記録する。

```jsonc
// package.json
{
  "scripts": {
    "e2e:reset-data": "<確定した初期化コマンド>"
  }
}
```

## 4. 照合ツールの配置

1. スキルの `scripts/e2e-trace.mts` を、プロジェクトの `scripts/e2e-trace.mts` にコピーする(ファイル名を変えない。`tests/` の下に置かない)。ファイルの中の `export const TRACE_TOOL_VERSION = <整数>;` の行が照合ツールの版で、作業の最初に SKILL.md の「照合ツールの版の確認」でスキルの原本と比べる
2. package.json の `scripts` に `"e2e:trace": "node scripts/e2e-trace.mts"` を足す
3. `features/` と `tests/e2e/` が無い状態で次を実行し、終了コードが `0` であることを確かめる(実行に使ったツールが返す終了コードで見る):

   ```bash
   npm run e2e:trace
   ```

   型注釈の位置で `SyntaxError` が出たら Node.js が 22.18 未満なので 1 に戻る。パッケージのインストールは要らない

## 5. 認証状態(storage-state)

ログインが要る場合は、Playwright 標準の setup project 方式で、ロールごとの認証状態を `playwright/.auth/<ロール>.json` に保存する(config 側の設定は conventions.md の推奨 config に含まれる)。ログイン用のヘルパー関数は作らない。

```ts
// tests/auth.setup.ts — ロールごとに 1 つの setup テスト
import { test as setup } from '@playwright/test';

setup('一般ユーザーとして認証', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('メールアドレス').fill(process.env.E2E_USER_EMAIL!);
  await page.getByLabel('パスワード').fill(process.env.E2E_USER_PASSWORD!);
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.waitForURL('/dashboard');  // ログイン完了を示す安定した条件で待つ
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});

setup('管理者として認証', async ({ page }) => {
  // 同様に playwright/.auth/admin.json へ保存
});
```

資格情報は環境変数で渡す。`.env` に置くなら gitignore 済みかを確かめ、config の先頭で読み込む(`dotenv` など。既存の慣習があればそれに従う)。

## 6. seed の作成

seed は、シナリオの出発点を作る fixture と、ロールごとの空テストからなる。

```ts
// tests/fixtures.ts
import { test as baseTest } from '@playwright/test';
export { expect } from '@playwright/test';

export const test = baseTest.extend({
  page: async ({ page }, use) => {
    await page.goto('/');  // baseURL 基準。認証状態は config または test.use の storageState で適用済み
    await use(page);
  },
});
```

```ts
// tests/seed.spec.ts — ロールごとに 1 つの空テスト
import { test } from './fixtures';

test.describe('一般ユーザー', () => {
  // 既定ロール: config の storageState をそのまま使う
  test('seed', async ({ page }) => {});
});

test.describe('管理者', () => {
  test.use({ storageState: 'playwright/.auth/admin.json' });
  test('seed', async ({ page }) => {});
});

test.describe('未認証', () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test('seed', async ({ page }) => {});
});
```

- ロールが 1 つで認証機能もテストしないなら、describe を使わずに `test('seed', ...)` を 1 つだけ置く。認証が無いアプリも同じ
- seed に入れてよいのは、ナビゲーションと認証状態の適用だけ。シナリオ固有のデータ投入は各テストファイルに書く

## 7. 動作確認

```bash
PLAYWRIGHT_HTML_OPEN=never npx playwright test tests/seed.spec.ts
```

setup project が先に走って全ロールの storage-state ができ、全ロールの seed が green なら完了。続けて、下の手順で attach できることを確かめる。カバレッジ計測を使う場合は、[coverage.md](coverage.md) の「初回の動作確認」も行う。

### seed への attach 定型

探索(defining)と実演(generating)では、ブラウザを必ずこの手順で開く。素の `playwright-cli open` で開くブラウザには storageState も baseURL も適用されず、テストと同じ条件で観察できないので使わない。

1. 対象ロールを `-g` で指定し、バックグラウンドで起動する(ロールが 1 つなら `-g` は要らない):

   ```bash
   PLAYWRIGHT_HTML_OPEN=never npx playwright test tests/seed.spec.ts -g "<ロール名>" --debug=cli
   ```

2. 認証がある場合は、先に setup テスト(auth.setup.ts)がロールごとに順にポーズする。表示されたセッション名に attach して resume し、認証を終わらせる。`-g` でロールを絞っても setup は全ロール分走る
3. 次に seed テストが別のセッション名でポーズするので、そちらに attach し直す
4. ポーズ位置は fixture 適用前(about:blank)。step-over を 1 回行うと seed fixture が走り、出発点(そのロールで認証済み、トップページ表示)に着く
5. 作業が終わったら、バックグラウンドのテストを止める
