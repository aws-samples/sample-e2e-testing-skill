# テストコード規律(test-code-rules)

E2E テストのコードを書く・直す・レビューするときは、局面(generating、失敗の修復、ユーザーからの直接の依頼)を問わずこの規則に従う。ID・tag・既知バグの書き方は [conventions.md](conventions.md) の「テストファイル」。

## 1. テストは 1 ファイルで完結させる

操作、アサーション、シナリオ固有のデータ投入と削除は、各テストファイルの中に直接書く。似たコードが複数のファイルに重複してよい。ファイルの外に置いて複数のテストで使うのは、次の 3 つだけ:

1. seed fixture(`tests/fixtures.ts`。中身はナビゲーションと認証状態の適用だけ)。fixture はこれ以外に作らない
2. Playwright 設定と storage-state(`playwright.config.ts`、`playwright/.auth/`)
3. データ初期化の npm script(`e2e:reset-data`)

ヘルパーやユーティリティのファイル(`helpers.ts`、`utils.ts`)、Page Object Model、独自の待機ラッパー・リトライ・アサーション関数・レポータ・ランナーは作らない。

- ファイル先頭の `test.use({ storageState })` によるロール宣言は使ってよい。`test.use` はロール宣言にだけ使い、timeout や viewport の上書きには使わない
- 照合ツール `scripts/e2e-trace.mts` はリポジトリ側のツールで、この制限の対象外。テストから import したり、テスト用ヘルパーに転用したりしない

## 2. 待機とタイムアウト

- 待機は Playwright の auto-waiting と web-first assertion(`await expect(locator).toBeVisible()` など)に任せる。`page.waitForTimeout()` と `waitForLoadState('networkidle')` は書かない
- タイムアウトは config の値を使う。`test.setTimeout()` や `{ timeout: ... }` で上書きしない
- タイムアウトが出たら、値を伸ばさずに attach して実際の状態を観察し(playwright-cli スキルの test-generation リファレンス「3. Heal」)、原因を確かめてから直す

## 3. ロケータ

ロケータは playwright-cli の実演で出力されたものを使う。CSS セレクタや XPath(`page.locator('#id')`、`page.locator('div > span')`)を自分で書かない。

## 4. 実行とデータ

- `retries` と `workers` をエージェントは増やさない(新規セットアップの既定は retries 0 / workers 1。既存プロジェクトに設定があればそれに従う)。flaky なテストや失敗したテストを、retry や再実行の繰り返しで通そうとしない
- シナリオ固有のデータは同じファイルの `beforeEach` で投入し、`afterEach` で削除する。他のテストが作ったデータに依存しない
- URL は `baseURL` 基準の相対パスで書く(`page.goto('/products')`、`request.post('/api/...')`)。絶対 URL を書かない

## 違反に気づいたら

この規則に反するコードを書いた、または書こうとしていると気づいたら、その変更を捨て、playwright-cli スキルの「3. Heal」の観察(attach → snapshot / console / requests)からやり直す。
