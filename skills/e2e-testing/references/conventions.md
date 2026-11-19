# 規約(パス・命名・設定)

プロジェクトに既存の設定・規約があれば、そちらを優先する。本規約で上書きせず、推奨値との違いはユーザーに伝えるだけにし、ユーザーが明示的に求めたときだけ変える。ただし次の 5 つは、既存プロジェクトでも無ければ追加する: `baseURL`、json レポータ(`test-results/results.json`)、setup project と storageState(認証がある場合)、.gitignore 必須項目、.gitattributes 必須項目。既存の設定が無い新規セットアップでは、本規約の既定値を使う。

## ディレクトリレイアウト

```
<プロジェクトルート>/
├── features/
│   ├── feature-map.json          # 機能一覧と進捗状態
│   ├── last-run.json             # 最後の全体実行の結果の控え(照合ツールが書く。コミットする)
│   ├── <機能スラッグ>.feature     # 機能ごとの Gherkin
│   └── viewer/                   # 要件とシナリオの表とレビュー用 CSV(スキルの viewer/build.mjs が作る。コミットする)
│       ├── index.html            #   ブラウザで直接開く
│       └── review.csv            #   行ごとにコメント欄を持つ CSV(UTF-8、BOM 付き)
├── scripts/
│   └── e2e-trace.mts      # 照合ツール
├── tests/
│   ├── auth.setup.ts             # ロールごとの storage-state を作る setup テスト(認証がある場合)
│   ├── fixtures.ts               # seed fixture
│   ├── seed.spec.ts              # seed テスト(ロールごとに 1 test。探索・生成の起点。E2E テストの実行には含めない)
│   └── e2e/
│       └── <機能スラッグ>/
│           └── <シナリオ ID>-<シナリオスラッグ>.spec.ts   # 1 シナリオ 1 ファイル
├── playwright/
│   └── .auth/<ロール>.json       # ロール別 storage-state
├── evidence/
│   ├── <実行ID>/                 # 全体実行ごとの証跡
│   │   └── coverage/             # カバレッジ付き実行のレポート(HTML + 機械可読)
│   └── coverage-raw/             # カバレッジ計測の作業場所(実行のたびに空にする)
│       ├── data/                 #   生データ
│       └── report/               #   生成直後のレポート
└── playwright.config.ts          # 対象 URL(baseURL)・既定ロール・タイムアウト
```

## ロール(認証状態)の規約

- ロールごとの認証状態は `playwright/.auth/<ロール>.json` に置く。`tests/auth.setup.ts` が setup project として毎回作り直す
- 既定ロールを 1 つ決め、config の `use.storageState` に指定する。何も宣言しないテストは既定ロールで走る
- 既定以外のロールと未認証は、テストファイルの import の直後に `test.use` で宣言する
- .feature ではロールを最初の Given で表し、テスト側と 1 対 1 に対応させる:

| 最初の Given | テストファイルの宣言 |
|---|---|
| 管理者としてログインしている | `test.use({ storageState: 'playwright/.auth/admin.json' });` |
| ログインしていない | `test.use({ storageState: { cookies: [], origins: [] } });` |
| ロールの記述が無い | 何も書かない(既定ロール) |

## 命名規則

- 機能名とシナリオ名は日本語(.feature の中)。スラッグは英語 kebab-case にし、エージェントが付ける
- テストファイルの名前は、頭にシナリオ ID を付けて `<シナリオ ID>-<シナリオスラッグ>.spec.ts` にする。ID は照合ツールと同じ形のまま書く。例: シナリオ「REQ-001-1 正しい資格情報でログインできる」→ `REQ-001-1-login-with-valid-credentials.spec.ts`
- シナリオ ID を変えたら、テストファイルの名前も直す。テストコードの問題なので、ユーザーに確認せずに直してよい
- 照合ツールはファイル名を読まない。テストとシナリオを結ぶのは、test の名前と tag のシナリオ ID だけ
- 実行 ID は `YYYYMMDD-HHmmss`

## 要件 ID とシナリオ ID

| 種類 | 形式 | 例 |
|---|---|---|
| 要件 ID | `REQ-<番号>`。番号は 3 桁ゼロ埋め(1000 件以上で桁を増やす) | `REQ-001`、`REQ-1000` |
| シナリオ ID | `REQ-<番号>-<枝番>`。番号は所属する Rule の要件番号、枝番は同じ要件の中の連番(ゼロ埋めなし) | `REQ-014-1`、`REQ-014-12` |
| タグ | `@` + シナリオ ID。.feature の Scenario 直前の行と、テストの `tag` に書く | `@REQ-014-1` |

- 要件 ID は全 .feature を通して一意にする。機能ごとに番号帯を分けない
- 1 つの要件(Rule)に N 個のシナリオが属し、1 つのシナリオは 1 つの Rule にだけ属する
- 新しい要件番号は、全 .feature の要件番号の最大値 + 1(確かめ方は [defining.md](defining.md) の「2.2 採番」)

## Gherkin 規約

- キーワードは英語、本文は日本語。`# language` は書かない
- 使うキーワードは `Feature` `Rule` `Background` `Scenario` `Scenario Outline` `Examples` `Given` `When` `Then` `And` `But` だけ
- DocString の中では、行頭(インデントの後)に `Feature:`、`Rule:`、`Scenario:`、`Scenario Outline:` を書かない。照合ツールは .feature を行単位で読むので、DocString の中のこれらの行を構造として読んでしまう
- タグはシナリオ ID(`@REQ-<番号>-<枝番>`)にだけ使う
- 要件は `Rule: REQ-<番号> <要件文>` と書く。要件文は EARS の次のどれか 1 文にする:
  - 常時: `The <アプリ名> SHALL <応答>`
  - 事象駆動: `WHEN <トリガー>, the <アプリ名> SHALL <応答>`(THEN は付けない)
  - 状態駆動: `WHILE <状態>, the <アプリ名> SHALL <応答>`
  - 任意機能: `WHERE <機能>, the <アプリ名> SHALL <応答>`
  - 望ましくない挙動: `IF <トリガー>, THEN the <アプリ名> SHALL <応答>`
  - 複合: `WHILE <状態>, WHEN <トリガー>, the <アプリ名> SHALL <応答>`
- 要件文のキーワード(WHEN / WHILE / WHERE / IF / THEN / SHALL)は英語大文字、本文は日本語にし、条件節の後に `,` を置く。`<アプリ名>` には feature-map の `app` の値を書く(the system とは書かない)。回数・文言・ロールなどの具体値は要件文に書かず、Scenario に書く
- Scenario は、それが検証する要件の `Rule:` の配下に置く。Rule の外に置いた Scenario は ID 未付与になる
- Scenario 名の先頭にシナリオ ID を書き、直前の行に同じ ID のタグを 1 つだけ置く。Scenario Outline も ID は 1 つで、Examples の全行で共有する
- 各シナリオは seed の状態から単独で実行できるように書き、他のシナリオの結果に依存させない
- Then と検証の And には、観測できる結果を 1 つずつ書く。1 句がテストの 1 アサーションになる
- 引用元があるときだけ、`# 引用元: <出典>` を `Feature:` / `Rule:` / `Scenario:` の直前の行に書く(Scenario ではタグ行の上)。Scenario の引用元は、Scenario → Rule → Feature の順で最初に見つかったものになる

```gherkin
# 引用元: docs/requirements.md > 3.2 認証
Feature: ログイン

  Rule: REQ-001 WHEN 正しい資格情報を送信した, the 会員サイト SHALL ダッシュボードを表示する

    @REQ-001-1
    Scenario: REQ-001-1 正しい資格情報でログインできる
      Given ログインしていない
      And ログインページを表示している
      When 正しいメールアドレスとパスワードを入力して送信する
      Then ダッシュボードに「ようこそ」と表示される

    # 引用元: docs/requirements.md > 3.2.1 エラー表示
    @REQ-001-2
    Scenario: REQ-001-2 誤ったパスワードではエラーが表示される
      Given ログインしていない
      And ログインページを表示している
      When 正しいメールアドレスと誤ったパスワードを入力して送信する
      Then 「メールアドレスまたはパスワードが違います」と表示される
```

## テストファイル

### ヘッダと句のコメント

- ファイルの先頭に次のヘッダを書く。`// scenario:` には Scenario 名を ID 付きのまま写す。`// 引用元:` は出典があるときだけ書く:

  ```ts
  // feature: features/login.feature
  // scenario: REQ-001-1 正しい資格情報でログインできる
  // 引用元: docs/requirements.md > 3.2 認証
  ```

- Gherkin の各句を `// Given:` `// When:` `// Then:` などのコメントにして、対応する操作の直前に書く

### テストの名前と tag

- test 名の先頭にシナリオ ID を書き、同じ ID を第 2 引数の `{ tag: '@REQ-<番号>-<枝番>' }` に書く。両方必須。名前では `REQ-…`、tag では `@REQ-…` と書く
- 名前の中に `@` を書かない(Playwright は名前の中の `@` で始まる語も tag とみなす)
- tag はシナリオ ID だけに使う(`@smoke` などを付けない)
- 第 2 引数では `tag` を `annotation` より前に書く(照合ツールは最初の `}` までしか読まない)
- 名前は文字列リテラルで書く(テンプレートリテラルなら ID を `${` より前に置く)。tag は文字列でも配列でもよく、引数ごとに改行してよい。`test` は別名を付けずに import する。照合ツールはこの形しか読めず、読めない test は無いものとして扱われてシナリオが `未生成` になる
- Scenario Outline は 1 アウトライン = 1 ファイル。Examples の各行をファイル内の複数の `test()` に展開し、全 test の名前の先頭と tag に同じシナリオ ID を付ける。名前の末尾に Examples の値を添えてよい
- test の宣言には `test(` と、既知バグ用の `test.fail(`(次節)だけを使う。`test.skip` / `test.fixme` / `test.only` は使わない。skip と fixme は結果が skipped になり、既知バグか未着手かを区別できず理由も残らない。only はコミットに残ると他のテストが走らない

### 既知バグ

- ユーザーがアプリのバグと確定したシナリオだけ、`test.fail(title, details, body)` で宣言し、`details` に `annotation: { type: 'issue', description: '<判断日> ユーザー判断: <根拠・チケット>' }` を付ける。ユーザーの判断より前には付けない
- 本文の Given / When / Then はそのまま残し、バグを避ける内容に書き換えない
- description は、ビューアの要件とシナリオの表の結果の列に、`既知バグ` の理由として載る
- バグが直って通過すると run が失敗し、ビューアの結果の列に `fail` と `fail 指定だが通過` と出る。そうなったら `test.fail` を `test` に戻し、annotation を外す。テストコードの問題なので、ユーザーに確認せずに直してよい

### 例

```ts
// feature: features/login.feature
// scenario: REQ-001-1 正しい資格情報でログインできる
// 引用元: docs/requirements.md > 3.2 認証
import { test, expect } from '../../fixtures';

// Given: ログインしていない
test.use({ storageState: { cookies: [], origins: [] } });

test('REQ-001-1 正しい資格情報でログインできる', { tag: '@REQ-001-1' }, async ({ page }) => {
  // And: ログインページを表示している
  await page.goto('/login');
  // When: 正しいメールアドレスとパスワードを入力して送信する
  await page.getByLabel('メールアドレス').fill('user@example.com');
  await page.getByLabel('パスワード').fill('correct-password');
  await page.getByRole('button', { name: 'ログイン' }).click();
  // Then: ダッシュボードに「ようこそ」と表示される
  await expect(page.getByRole('heading', { name: 'ようこそ' })).toBeVisible();
});
```

既知バグと Scenario Outline の宣言部(ヘッダと import は上と同じ形。それぞれ別ファイル):

```ts
// 既知バグ(ユーザーの判断の後だけ。tag は annotation より前)
test.fail(
  'REQ-001-2 誤ったパスワードではエラーが表示される',
  { tag: '@REQ-001-2', annotation: { type: 'issue', description: '2026-09-01 ユーザー判断: エラーが表示されない。#123' } },
  async ({ page }) => {
    // Given / When / Then はそのまま
  },
);

// Scenario Outline(Examples の各行を test に展開。全 test に同じ ID)
for (const { 項目, 期待メッセージ } of [
  { 項目: 'メールアドレス', 期待メッセージ: 'メールアドレスを入力してください' },
  { 項目: 'パスワード', 期待メッセージ: 'パスワードを入力してください' },
]) {
  test(`REQ-001-3 必須項目が空のときはエラーが表示される: ${項目}`, { tag: '@REQ-001-3' }, async ({ page }) => {
    // …
  });
}
```

## playwright.config 推奨値(新規セットアップ時)

新規セットアップでは、`npm init playwright@latest` が生成した config をこの内容で丸ごと置き換える。値だけ差し替えると、生成物にある 3 ブラウザ分の projects が残って全テストが 3 回走る。既存の config がある場合は冒頭の優先関係に従う。

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: false,
  retries: 0,   // エージェントは増やさない
  workers: 1,   // エージェントは増やさない
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],  // 照合ツールが読む
  ],
  use: {
    baseURL: 'http://localhost:3000',  // 対象 URL はここにだけ書く
    actionTimeout: 5_000,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',  // 既定ロール
      },
      dependencies: ['setup'],  // ファイルを絞って実行しても setup が先に走る
    },
  ],
});
```

認証が無いアプリでは `setup` project、`storageState`、`dependencies` を削り、`chromium` project だけにする。

## feature-map.json の形式

```json
{
  "app": "会員サイト",
  "roles": ["一般ユーザー(既定)", "管理者"],
  "baseline_data": "会員 2 名(一般 1、管理者 1)。商品 20 件。\nテスト単位のデータは API で投入・削除する",
  "features": [
    {
      "name": "ログイン",
      "slug": "login",
      "status": "テスト済み",
      "summary": "会員がメールアドレスとパスワードでサインインし、ダッシュボードを開く",
      "includes": ["ログイン画面", "ログアウト", "5 回失敗したときのロック", "ロール: 一般、管理者"],
      "excludes": ["パスワードの再設定(パスワード再設定の機能に入れた)"],
      "sources": ["docs/requirements.md 3.2", "探索で /login の画面を確認"],
      "questions": ["資料にある「ソーシャルログイン」が画面に無い"]
    },
    {
      "name": "メディア・ファイル",
      "slug": "media-files",
      "status": "対象外",
      "summary": "画像やファイルをアップロードして記事に添付する",
      "includes": ["アップロード画面"],
      "decided": "2026-08-31 ユーザー判断(アップロード無効のため)"
    }
  ],
  "candidates": [
    {
      "name": "ソーシャルログイン",
      "slug": "social-login",
      "reason": "資料にあるが画面に無い",
      "sources": ["docs/requirements.md 3.4"]
    }
  ]
}
```

| 欄 | 中身 | 必須か |
|---|---|---|
| `app` | 要件文のシステム名に使うアプリ名。文字列 | 必須 |
| `roles` | ロールの一覧。文字列の配列 | 任意 |
| `baseline_data` | `e2e:reset-data` が戻すベースライン状態(アカウント、代表データ、テスト単位のデータ投入・削除の手段など)。文字列。複数行は `\n` で書く | 任意 |
| `coverage` | [coverage.md](coverage.md) を使うときの計測の設定。オブジェクト。中の欄は coverage.md の「coverage ブロック」の欄と同じ名前と意味。複数行の値は `\n` で書く | 任意 |
| `features` | 機能の配列。並びが着手順 | 必須(空の配列でよい) |
| `features[].name` | 機能名。文字列 | 必須 |
| `features[].slug` | 機能スラッグ。`features/<slug>.feature` と `tests/e2e/<slug>/` の名前になる。文字列 | 必須 |
| `features[].status` | 状態。`未着手` `定義済み` `テスト済み` `対象外` のどれか | 必須 |
| `features[].summary` | 概要。利用者から見て何ができる機能か。1〜2 文の文字列 | 必須 |
| `features[].includes` | 含む画面、操作、ロール。文字列の配列 | 必須(1 つ以上) |
| `features[].excludes` | 含まないもの。隣の機能に入れたものは、その機能の名前も書く。文字列の配列 | 任意 |
| `features[].sources` | 根拠。参考資料の箇所、探索で確かめた画面。文字列の配列 | 任意 |
| `features[].questions` | 確認したいこと。ユーザーに判断してほしい点。文字列の配列 | 任意 |
| `features[].decided` | ユーザーが決めたこと。日付と理由を付ける。文字列 | 任意 |
| `candidates` | 機能にするか決まっていない候補の配列 | 任意 |
| `candidates[].name`、`slug`、`reason` | 候補の名前、機能にするときの slug の案、まだ機能にしていない理由。文字列 | 必須 |
| `candidates[].sources` | 根拠。文字列の配列 | 任意 |

- インデント 2 で書く。必須の文字列の欄は空にしない。表に無い欄は、照合ツールもビューアも読まない
- `app` のアプリ名(例: `会員サイト`)を、Rule の要件文のシステム名(`the 会員サイト SHALL …`)にそのまま使う。要件と ID は .feature にだけ書き、feature-map に欄を足さない
- 状態は `未着手` → `定義済み`(.feature 確定)→ `テスト済み`(全シナリオ green、かつ照合ツールで対象機能の不整合 0)と進む。仕様変更で再定義するときは `定義済み` に戻す。ユーザーがテスト対象から外した機能は `対象外` にし、`decided` に日付と理由を書く
- `summary`、`includes`、`excludes` は、技術に詳しくない意思決定者が読む前提で、画面と操作の言葉で書く。コードの名前で書かない
- ユーザーが `questions` の項目に答えたら、その項目を消し、決まったことを `decided` に書く
- 候補は、ユーザーが決めたら `candidates` から外す。機能にするなら `features` に `未着手` で移す。テストしないなら `features` に `対象外` で移し、`decided` に理由を書く。`candidates` に残るのは、決まっていないものだけ
- 対象 URL は書かない(`playwright.config` の `baseURL` に書く)

## 照合ツール(e2e-trace)

要件・シナリオ・テスト・実行結果を ID の完全一致で突き合わせ、feature-map も検査して、機能ごとの集計と不整合の一覧を標準出力に出すスクリプト。

- 配置: `scripts/e2e-trace.mts`(原本はスキルの `scripts/e2e-trace.mts`。導入は [setup.md](setup.md) の「4. 照合ツールの配置」)
- 版: ファイルの中の `export const TRACE_TOOL_VERSION = <整数>;` の行。中身が変わるたびに増える。作業の最初に、SKILL.md の「照合ツールの版の確認」で原本と比べる
- 実行環境: Node.js 22.18 以上の型ストリップで直接動く。依存は Node 標準モジュールだけなので、導入先にパッケージを足さない。カレントディレクトリをプロジェクトルートとして扱う(npm script 経由ならそうなる)
- コマンド:
  - `npm run e2e:trace` — 検査だけをして、何も書かない(setup の動作確認、defining の採番、generating の締め)
  - `npm run e2e:trace -- --run-id <実行ID>` — 検査に加えて、`features/last-run.json` を全体置き換えで書く。running の全体実行の後にだけ使う。`test-results/results.json` が無ければ書かずに終了コード `2`。不整合があっても書き、終了コード `1` で終える
- 入力: `features/feature-map.json`、`features/*.feature`(直下だけ)、`tests/e2e/**/*.spec.ts`、`test-results/results.json`(無ければ、テストのあるシナリオはすべて `未実行`)。結果は `test-results/results.json` から数え、`features/last-run.json` は読まない。`features/feature-map.json` も `.feature` も無ければ、不整合なしで終了コード `0`
- 終了コード: `0` 不整合なし / `1` 不整合が 1 件以上 / `2` 実行不能(知らない引数を含む)。テストの fail と、状態と結果の食い違いは終了コードに影響しない

### 標準出力

同じ入力からは同じ出力になる。例:

```
実行ID: — / 結果: 2026-10-16T01:30:00.000Z

## 集計

| 機能 | 状態 | 要件数 | テストがある要件数 | シナリオ数 | ✅ pass | ❌ fail | 🐞 既知バグ | 未生成 | 未実行 |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| ログイン | テスト済み | 2 | 2 | 4 | 1 | 2 | 1 | 0 | 0 |
| 商品検索 | 定義済み | 1 | 1 | 2 | 0 | 0 | 0 | 1 | 1 |
| お知らせ | 未着手 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| メディア・ファイル | 対象外 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 合計 | — | 3 | 3 | 6 | 1 | 2 | 1 | 1 | 1 |

要件番号の最大値: REQ-003

状態と結果の食い違い:
- ログイン: テスト済み なのに fail 2

## 不整合

| 種別 | 機能 | 対象 |
|---|---|---|
| 未生成 | 商品検索 | REQ-003-2 一致する商品が無いときはメッセージが表示される |
| 重複 ID | ログイン | REQ-001-1: tests/e2e/login/REQ-001-1-valid-credentials-copy.spec.ts, tests/e2e/login/REQ-001-1-valid-credentials.spec.ts |

書き出しなし
```

- 1 行目: `実行ID: <--run-id の値か —> / 結果: <test-results/results.json の stats.startTime か —>`
- `## 集計` の行の並び: feature-map の機能の順(`未着手` と `対象外` も出し、`.feature` の無い機能は件数 0)、続けて feature-map に無い `.feature` をファイル名の順。feature-map に形式の誤りがあるときは `.feature` のパスの順。最後に `合計` の行
- 機能の列は feature-map の `name`。feature-map に無い `.feature` と、feature-map に形式の誤りがあるときは、その `.feature` の `Feature:` の名前。`## 不整合` の機能の列も同じ決まり。状態の列は feature-map の `status` で、ほかの行は `—`
- `要件番号の最大値: <要件 ID か なし>` は採番に使う
- 状態と結果の食い違い: 無ければ `状態と結果の食い違い: なし`。あれば `状態と結果の食い違い:` の行に続けて、1 機能 1 行で `- <機能名>: テスト済み なのに fail N、未生成 N`(0 の結果は書かない)。何を指すかは「不整合の種類」の表の後
- `## 不整合`: 種別、機能、対象の表。無ければ表の代わりに `なし`
- 最終行: `--run-id` で書いたときは `書き出し: features/last-run.json`、引数なしなら `書き出しなし`

### 不整合の種類

| 種別 | 意味 |
|---|---|
| 未生成 | 配下のどのシナリオにもテストが無い要件(Rule)、またはテストファイルが結ばれていないシナリオ |
| 孤立テスト | 名前の先頭にも tag にもシナリオ ID が無い test |
| 不明 ID 参照 | 名前と tag の ID は一致するが、その ID がどの .feature の Scenario にも無い |
| ID 不一致 | 1 つの test の中で、名前先頭の ID と tag の ID が違う(一方にだけある、tag の ID が 2 つ以上、を含む) |
| 重複 ID | 同じシナリオ ID の Scenario が 2 つ以上、同じ要件 ID の Rule が 2 つ以上、または同じシナリオ ID に結ばれたテストファイルが 2 つ以上 |
| ID 未付与 | Scenario に有効なシナリオ ID を 1 つに決められない(タグ無し / 名前先頭に ID 無し / タグと名前の ID が違う / タグの ID が複数 / Rule 外 / Rule に要件 ID 無し / 要件番号が Rule と違う)。または、Rule の名前の先頭に要件 ID が無い(配下にシナリオが無くても) |
| feature-map の形式 | `features/feature-map.json` が無い(`.feature` が 1 つ以上あるとき)、JSON として読めない、中身がオブジェクトでない、必須の欄が無いか空、欄の型が違う、`includes` が空、`status` の値が 4 つのどれでもない。候補の欄も同じ。1 つでもあると、下の 3 種を検査しない(直すと出る) |
| feature-map に無い .feature | `features/*.feature` のファイル名(拡張子を除く)が、どの機能の `slug` とも一致しない |
| .feature の無い機能 | `status` が `定義済み` か `テスト済み` なのに、`features/<slug>.feature` が無い |
| slug の重なり | `slug` が、機能と候補を合わせた全体で 2 つ以上ある |

状態と結果の食い違いは、状態が `テスト済み` なのに、配下に結果が `fail` か `未生成` のシナリオがある機能を指す。`未実行` は数えない。これは不整合ではなく、終了コードに影響しない。照合ツールの標準出力の `## 集計` と、ビューアのページの「照合ツールの不整合」の節に出る。

## features/last-run.json

照合ツールが `--run-id` を付けたときだけ書く、最後の全体実行の結果の控え。ビューアは結果をここから読む。手で編集せず、コミットする。要件を指定した部分実行では書かない(`--run-id` を付けない)。

```json
{
  "runId": "20261016-103000",
  "startTime": "2026-10-16T01:30:00.000Z",
  "scenarios": {
    "REQ-001-1": {
      "result": "pass"
    },
    "REQ-001-2": {
      "result": "known-bug",
      "reason": "2026-10-01 ユーザー判断: パスワード空のエラーが出ない。#123"
    },
    "REQ-001-3": {
      "result": "fail",
      "reason": "fail 指定だが通過"
    },
    "REQ-002-1": {
      "result": "fail"
    }
  }
}
```

- `startTime` は `test-results/results.json` の `stats.startTime` の文字列をそのまま写す。取れなければ欄ごと省く
- `result` は `pass`、`fail`、`known-bug` のどれか。1 つのシナリオ ID に test が複数あれば(Scenario Outline など)、fail、既知バグ、未実行(skipped)、pass の順に優先して 1 つにまとめる
- `reason` は、既知バグの理由(`issue` アノテーションの description。無ければ `理由なし`)か `fail 指定だが通過`。既知バグの理由が複数あれば、重なりを除いて ` / ` でつなぐ
- 全体実行で実行されなかったシナリオ(`test-results/results.json` に無いか、まとめた結果が未実行のもの)は書かない。`test-results/results.json` の test の名前と tag にある ID は、.feature に無いものも書く。ビューアは .feature に無い ID を無視する
- `scenarios` のキーは ID の文字コード順に並べる。インデント 2。同じ入力からは同じ中身になる

ビューアの要件とシナリオの表の「結果」の列は、シナリオごとに次の値を出す。照合ツールの `## 集計` の結果の列も同じ意味で、`test-results/results.json` から数える。

| 値 | 意味 |
|---|---|
| `pass` | 結ばれた全 test が通過 |
| `fail` | 1 つ以上が失敗。`fail 指定だが通過` が添えられていれば、`test.fail` のテストが通過した(バグが直った合図。「既知バグ」の節の手順で `test` に戻す) |
| `既知バグ` | `test.fail` のテストが期待どおり失敗。理由を添える |
| `未生成` | シナリオに結ばれたテストファイルが無い(ID 未付与を含む) |
| `未実行` | テストファイルはあるが、`features/last-run.json` に結果が無い(控えが無い場合を含む) |

## 要件カバレッジとコードカバレッジ

要件カバレッジ(要件ごとにテストがあるか)は、照合ツールの標準出力の `## 集計`(`要件数`、`テストがある要件数`、`未生成`)とビューアで、件数として見る。率にはしない。コードカバレッジ(アプリ側で実行された行・分岐)は [coverage.md](coverage.md) で未検証箇所を探す手がかりにだけ使い、率を目標にも合否基準にもしない。

## .gitignore 必須項目

```gitignore
# 認証状態(セッション情報を含む)
playwright/.auth/
# テスト用資格情報
.env
# 実行成果物(trace はネットワークペイロード全文を含む)
test-results/
playwright-report/
evidence/
# ビューアの作業用の一時ディレクトリ
features/.viewer-*/
```

## .gitattributes 必須項目

```gitattributes
features/viewer/review.csv -text
```

`review.csv` の行の区切りは CRLF なので、git の改行の変換で中身が変わらないようにする。
