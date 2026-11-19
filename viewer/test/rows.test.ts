// rows.ts が、照合ツールの照合の結果と features/last-run.json から作るデータと、止める場合のエラーを確かめる
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, expect, test } from 'vitest';
import { loadViewerData, type SpecLink, type StepBlock, type ViewerData } from '../src/rows';

const PROJECT = fileURLToPath(new URL('./fixtures/project', import.meta.url));

/** 句だけの手順の塊。各文字列の最初の空白までをキーワード(空白を含む)、残りを本文にする */
function stepLines(...texts: string[]): StepBlock[] {
  return texts.map((text) => {
    const end = text.indexOf(' ') + 1;
    return { kind: 'line', keyword: text.slice(0, end), text: text.slice(end) };
  });
}

/** テストファイルへのリンク。href は features/viewer/index.html から見た相対パス */
function specLink(file: string): SpecLink {
  const specPath = `tests/e2e/${file}`;
  return { path: specPath, href: `../../${specPath}` };
}

const ZERO = { pass: 0, fail: 0, knownBug: 0, ungenerated: 0, notRun: 0 };

const EXPECTED: ViewerData = {
  app: '会員サイト',
  lastRun: { runId: '20261016-103000', startTime: '2026-10-16T01:30:00.000Z' },
  totals: { pass: 1, fail: 2, knownBug: 1, ungenerated: 1, notRun: 1 },
  notices: [
    {
      kind: '重複 ID',
      feature: 'ログイン',
      target: 'REQ-001-1: tests/e2e/login/REQ-001-1-valid-credentials-copy.spec.ts, tests/e2e/login/REQ-001-1-valid-credentials.spec.ts',
    },
    { kind: '状態と結果の食い違い', feature: 'ログイン', target: 'テスト済み なのに fail 2' },
  ],
  features: [
    {
      row: {
        kind: '機能',
        id: 'login',
        feature: 'ログイン',
        status: 'テスト済み',
        body: [
          '概要: 会員がメールアドレスとパスワードでサインインし、ダッシュボードを開く',
          '含む: ログイン画面、5 回失敗したときのロック、ロール: 一般/管理者, "引用" を含む',
          '含まない: パスワードの再設定(パスワード再設定の機能に入れた)',
          '根拠: docs/requirements.md 3.2、探索で /login の画面を確認',
          '確認したいこと: 資料にある「ソーシャルログイン」が画面に無い、ロックの解除の手順(探索では確かめられなかった)',
        ].join('\n'),
        steps: 'Given ログインページを表示している',
        source: 'docs/requirements.md > 3.2 認証',
        stepBlocks: stepLines('Given ログインページを表示している'),
      },
      summary: '会員がメールアドレスとパスワードでサインインし、ダッシュボードを開く',
      includes: ['ログイン画面', '5 回失敗したときのロック', 'ロール: 一般/管理者, "引用" を含む'],
      excludes: ['パスワードの再設定(パスワード再設定の機能に入れた)'],
      sources: ['docs/requirements.md 3.2', '探索で /login の画面を確認'],
      questions: ['資料にある「ソーシャルログイン」が画面に無い', 'ロックの解除の手順(探索では確かめられなかった)'],
      decided: '',
      counts: { pass: 1, fail: 2, knownBug: 1, ungenerated: 0, notRun: 0 },
      items: [
        {
          kind: '要件',
          id: 'REQ-001',
          feature: 'ログイン',
          status: '',
          body: 'WHEN 正しい資格情報を送信した, the 会員サイト SHALL ダッシュボードを表示する',
          steps: 'Given ログインしていない',
          source: 'docs/requirements.md > 3.2.1 送信',
          stepBlocks: stepLines('Given ログインしていない'),
          result: { kind: 'requirement', counts: { ...ZERO, pass: 1, fail: 1, knownBug: 1 }, untested: false },
        },
        {
          kind: 'シナリオ',
          id: 'REQ-001-1',
          feature: 'ログイン',
          status: '',
          body: '正しい資格情報でログインできる',
          steps: [
            'When 次の資格情報を入力して送信する',
            '| 項目 | 値 |',
            '| メールアドレス | user@example.com |',
            '| パスワード | pass\\|word |',
            'Then ダッシュボードに「ようこそ」と表示される',
          ].join('\n'),
          source: '',
          stepBlocks: [
            ...stepLines('When 次の資格情報を入力して送信する'),
            {
              kind: 'table',
              rows: [
                ['項目', '値'],
                ['メールアドレス', 'user@example.com'],
                ['パスワード', 'pass|word'],
              ],
            },
            ...stepLines('Then ダッシュボードに「ようこそ」と表示される'),
          ],
          result: {
            kind: 'scenario',
            outcome: 'pass',
            reason: null,
            specs: [specLink('login/REQ-001-1-valid-credentials-copy.spec.ts'), specLink('login/REQ-001-1-valid-credentials.spec.ts')],
          },
        },
        {
          kind: 'シナリオ',
          id: 'REQ-001-2',
          feature: 'ログイン',
          status: '',
          body: '必須項目が空のときはエラーが表示される',
          steps: [
            'When <項目> を空にして送信する',
            'Then 「<期待メッセージ>」と表示される',
            'Examples:',
            '| 項目 | 期待メッセージ |',
            '| メールアドレス | メールアドレスを入力してください |',
            '| パスワード | パスワードを入力してください |',
          ].join('\n'),
          source: 'docs/requirements.md > 3.2.2 エラー表示',
          stepBlocks: [
            ...stepLines('When <項目> を空にして送信する', 'Then 「<期待メッセージ>」と表示される'),
            { kind: 'line', keyword: '', text: 'Examples:' },
            {
              kind: 'table',
              rows: [
                ['項目', '期待メッセージ'],
                ['メールアドレス', 'メールアドレスを入力してください'],
                ['パスワード', 'パスワードを入力してください'],
              ],
            },
          ],
          result: {
            kind: 'scenario',
            outcome: '既知バグ',
            reason: '2026-10-01 ユーザー判断: パスワード空のエラーが出ない。#123',
            specs: [specLink('login/REQ-001-2-required-fields-empty.spec.ts')],
          },
        },
        {
          kind: 'シナリオ',
          id: 'REQ-001-3',
          feature: 'ログイン',
          status: '',
          body: 'メールアドレスの大文字小文字を区別せずにログインできる',
          steps: ['When メールアドレスを大文字で入力して送信する', 'Then ダッシュボードに「ようこそ」と表示される'].join('\n'),
          source: '',
          stepBlocks: stepLines('When メールアドレスを大文字で入力して送信する', 'Then ダッシュボードに「ようこそ」と表示される'),
          result: {
            kind: 'scenario',
            outcome: 'fail',
            reason: 'fail 指定だが通過',
            specs: [specLink('login/REQ-001-3-case-insensitive-email.spec.ts')],
          },
        },
        {
          kind: '要件',
          id: 'REQ-002',
          feature: 'ログイン',
          status: '',
          body: 'IF 5 回続けて誤ったパスワードを送信した, THEN the 会員サイト SHALL アカウントをロックする',
          steps: '',
          source: '',
          stepBlocks: [],
          result: { kind: 'requirement', counts: { ...ZERO, fail: 1 }, untested: false },
        },
        {
          kind: 'シナリオ',
          id: 'REQ-002-1',
          feature: 'ログイン',
          status: '',
          body: '5 回失敗するとロックされる',
          steps: [
            'When 誤ったパスワードで 5 回送信する',
            'Then 次の通知が表示される',
            '"""',
            'アカウントをロックしました。',
            '管理者に連絡してください。',
            '"""',
          ].join('\n'),
          source: '',
          stepBlocks: [
            ...stepLines('When 誤ったパスワードで 5 回送信する', 'Then 次の通知が表示される'),
            { kind: 'docString', text: '"""\nアカウントをロックしました。\n管理者に連絡してください。\n"""' },
          ],
          result: {
            kind: 'scenario',
            outcome: 'fail',
            reason: null,
            specs: [specLink('login/REQ-002-1-lock-after-five-failures.spec.ts')],
          },
        },
      ],
    },
    {
      row: {
        kind: '機能',
        id: 'product-search',
        feature: '商品検索',
        status: '定義済み',
        body: [
          '概要: キーワードで商品を探し、名前が前方一致する商品を一覧に出す',
          '含む: 商品一覧の検索欄',
          '決めたこと: 2026-09-30 ユーザー判断(全文検索は対象外)',
        ].join('\n'),
        steps: '',
        source: '',
        stepBlocks: [],
      },
      summary: 'キーワードで商品を探し、名前が前方一致する商品を一覧に出す',
      includes: ['商品一覧の検索欄'],
      excludes: [],
      sources: [],
      questions: [],
      decided: '2026-09-30 ユーザー判断(全文検索は対象外)',
      counts: { ...ZERO, ungenerated: 1, notRun: 1 },
      items: [
        {
          kind: '要件',
          id: 'REQ-003',
          feature: '商品検索',
          status: '',
          body: 'WHEN キーワードを入力して検索した, the 会員サイト SHALL 名前が前方一致する商品を表示する',
          steps: '',
          source: '',
          stepBlocks: [],
          result: { kind: 'requirement', counts: { ...ZERO, ungenerated: 1, notRun: 1 }, untested: false },
        },
        {
          kind: 'シナリオ',
          id: 'REQ-003-1',
          feature: '商品検索',
          status: '',
          body: 'キーワードで商品を検索できる',
          steps: [
            'Given ログインしている',
            'And 商品一覧を表示している',
            'When 「りんご」で検索する',
            'Then 「りんごジュース」が表示される',
            'But 「みかん」は表示されない',
          ].join('\n'),
          source: '',
          stepBlocks: stepLines(
            'Given ログインしている',
            'And 商品一覧を表示している',
            'When 「りんご」で検索する',
            'Then 「りんごジュース」が表示される',
            'But 「みかん」は表示されない',
          ),
          result: {
            kind: 'scenario',
            outcome: '未実行',
            reason: null,
            specs: [specLink('product-search/REQ-003-1-search-by-keyword.spec.ts')],
          },
        },
        {
          kind: 'シナリオ',
          id: 'REQ-003-2',
          feature: '商品検索',
          status: '',
          body: '一致する商品が無いときはメッセージが表示される',
          steps: ['Given ログインしている', 'When 「存在しない商品」で検索する', 'Then 「該当する商品はありません」と表示される'].join(
            '\n',
          ),
          source: '',
          stepBlocks: stepLines(
            'Given ログインしている',
            'When 「存在しない商品」で検索する',
            'Then 「該当する商品はありません」と表示される',
          ),
          result: { kind: 'scenario', outcome: '未生成', reason: null, specs: [] },
        },
      ],
    },
    {
      row: {
        kind: '機能',
        id: 'news',
        feature: 'お知らせ',
        status: '未着手',
        body: '概要: 会員がお知らせの一覧と本文を読む\n含む: お知らせ一覧、お知らせの本文',
        steps: '',
        source: '',
        stepBlocks: [],
      },
      summary: '会員がお知らせの一覧と本文を読む',
      includes: ['お知らせ一覧', 'お知らせの本文'],
      excludes: [],
      sources: [],
      questions: [],
      decided: '',
      counts: null,
      items: [],
    },
    {
      row: {
        kind: '機能',
        id: 'media-files',
        feature: 'メディア・ファイル',
        status: '対象外',
        body: '概要: 画像やファイルをアップロードして記事に添付する\n含む: アップロード画面\n決めたこと: 2026-08-31 ユーザー判断(アップロード無効のため)',
        steps: '',
        source: '',
        stepBlocks: [],
      },
      summary: '画像やファイルをアップロードして記事に添付する',
      includes: ['アップロード画面'],
      excludes: [],
      sources: [],
      questions: [],
      decided: '2026-08-31 ユーザー判断(アップロード無効のため)',
      counts: null,
      items: [],
    },
  ],
  candidates: [
    {
      row: {
        kind: '候補',
        id: 'social-login',
        feature: 'ソーシャルログイン',
        status: '',
        body: '理由: 資料にあるが画面に無い\n根拠: docs/requirements.md 3.4',
        steps: '',
        source: '',
        stepBlocks: [],
      },
      reason: '資料にあるが画面に無い',
      sources: ['docs/requirements.md 3.4'],
    },
  ],
};

const tempDirs: string[] = [];
afterEach(() => {
  for (const dir of tempDirs.splice(0)) fs.rmSync(dir, { recursive: true, force: true });
});

/** fixture のプロジェクトを一時ディレクトリにコピーし、change で 1 か所だけ変えてから、そのルートを返す */
function changedProject(change: (root: string) => void): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'viewer-rows-'));
  tempDirs.push(root);
  fs.cpSync(PROJECT, root, { recursive: true });
  change(root);
  return root;
}

function read(root: string, file: string): string {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function write(root: string, file: string, text: string): void {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
  fs.writeFileSync(path.join(root, file), text);
}

/** file の中身を edit で書き換える */
function edit(root: string, file: string, change: (text: string) => string): void {
  write(root, file, change(read(root, file)));
}

/** file の中で text を含む行の行番号(1 始まり) */
function lineOf(root: string, file: string, text: string): number {
  const index = read(root, file)
    .split('\n')
    .findIndex((line) => line.includes(text));
  if (index === -1) throw new Error(`${file} に「${text}」の行が無い`);
  return index + 1;
}

function editMap(
  root: string,
  change: (map: { features: Record<string, unknown>[]; candidates: Record<string, unknown>[] }) => void,
): void {
  edit(root, 'features/feature-map.json', (text) => {
    const map = JSON.parse(text);
    change(map);
    return JSON.stringify(map, null, 2);
  });
}

const LOGIN = 'features/login.feature';
const SEARCH = 'features/product-search.feature';

test('fixture のプロジェクトから、feature-map の順の機能、Rule の順の要件とシナリオ、結果、不整合の節の行、候補ができる', () => {
  expect(loadViewerData(PROJECT)).toEqual(EXPECTED);
});

test('ID 未付与で止まる', () => {
  const root = changedProject((dir) => edit(dir, LOGIN, (text) => text.replace('    @REQ-002-1\n', '')));
  const line = lineOf(root, LOGIN, 'Scenario: REQ-002-1');
  expect(() => loadViewerData(root)).toThrow(
    `ID 未付与: ログイン: features/login.feature L${line} Scenario「REQ-002-1 5 回失敗するとロックされる」(タグ無し)`,
  );
});

test('.feature 側の重複 ID で止まる', () => {
  const root = changedProject((dir) => edit(dir, SEARCH, (text) => text.replaceAll('REQ-003-2', 'REQ-003-1')));
  expect(() => loadViewerData(root)).toThrow('重複 ID: 商品検索: REQ-003-1: features/product-search.feature L');
});

test('feature-map の形式で止まる', () => {
  const root = changedProject((dir) => write(dir, 'features/feature-map.json', '{'));
  expect(() => loadViewerData(root)).toThrow('feature-map の形式: —: features/feature-map.json を JSON として読めない(');
});

test('feature-map に無い .feature で止まる', () => {
  const root = changedProject((dir) => write(dir, 'features/extra.feature', 'Feature: 余分\n'));
  expect(() => loadViewerData(root)).toThrow(
    'feature-map に無い .feature: 余分: features/extra.feature(feature-map に slug が extra の機能が無い)',
  );
});

test('.feature の無い機能で止まる', () => {
  const root = changedProject((dir) =>
    editMap(dir, (map) => {
      map.features[2].status = '定義済み';
    }),
  );
  expect(() => loadViewerData(root)).toThrow('.feature の無い機能: お知らせ: features/news.feature が無い(状態が 定義済み)');
});

test('slug の重なりで止まる', () => {
  const root = changedProject((dir) =>
    editMap(dir, (map) => {
      map.candidates[0].slug = 'login';
    }),
  );
  expect(() => loadViewerData(root)).toThrow('slug の重なり: ログイン / ソーシャルログイン: login: features[0], candidates[0]');
});

test('feature-map も .feature も無ければ、features/feature-map.json が無い で止まる', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'viewer-rows-empty-'));
  tempDirs.push(root);
  expect(() => loadViewerData(root)).toThrow(/^features\/feature-map\.json が無い$/);
});

test('構文エラーは、パーサーのエラーに .feature のパスを付けて止まる', () => {
  const root = changedProject((dir) => edit(dir, SEARCH, (text) => `${text}    これは手順ではない\n`));
  const line = lineOf(root, SEARCH, 'これは手順ではない');
  expect(() => loadViewerData(root)).toThrow(`features/product-search.feature: (${line}:5): expected:`);
});

test('Gherkin のパーサーだけが読んだ Scenario で止まる', () => {
  const root = changedProject((dir) =>
    edit(dir, LOGIN, (text) => `${text}\n    @REQ-002-2\n    Example: REQ-002-2 ロックの通知を閉じられる\n      Then 通知が閉じる\n`),
  );
  const line = lineOf(root, LOGIN, 'Example: REQ-002-2');
  expect(() => loadViewerData(root)).toThrow(
    `features/login.feature:${line}: 照合ツールと Gherkin の読み取りが食い違う(Gherkin のパーサーだけが読んだ行。Example: などの規約に無いキーワードが原因になりうる)`,
  );
});

test('照合ツールだけが読んだ Rule で止まる', () => {
  const root = changedProject((dir) =>
    edit(dir, SEARCH, (text) =>
      text.replace(
        '      Then 「該当する商品はありません」と表示される\n',
        '      Then 次のメッセージが表示される\n        """\n        Rule: REQ-009 この行は文書の一部\n        """\n',
      ),
    ),
  );
  const line = lineOf(root, SEARCH, 'Rule: REQ-009');
  expect(() => loadViewerData(root)).toThrow(
    `features/product-search.feature:${line}: 照合ツールと Gherkin の読み取りが食い違う(照合ツールだけが読んだ行。DocString の中の行頭の Scenario: か Rule: が原因になりうる)`,
  );
});

test('features/last-run.json が JSON として読めなければ止まる', () => {
  const root = changedProject((dir) => write(dir, 'features/last-run.json', '{'));
  expect(() => loadViewerData(root)).toThrow('features/last-run.json を読めない: JSON として読めない(');
});

test('features/last-run.json の scenarios がオブジェクトでなければ止まる', () => {
  const root = changedProject((dir) => write(dir, 'features/last-run.json', '{"runId":"x","scenarios":[]}'));
  expect(() => loadViewerData(root)).toThrow('features/last-run.json を読めない: scenarios がオブジェクトでない');
});

test('孤立テストでは止まらず、照合ツールの不整合の節の行が増える', () => {
  const file = 'tests/e2e/login/smoke.spec.ts';
  const root = changedProject((dir) => write(dir, file, "test('ログイン画面が開く', async () => {});\n"));
  const data = loadViewerData(root);
  expect(data.notices).toEqual([
    { kind: '孤立テスト', feature: 'ログイン', target: `${file} L1 test「ログイン画面が開く」` },
    ...EXPECTED.notices,
  ]);
});

test('features/last-run.json が無ければ、lastRun は null で、テストファイルのあるシナリオは未実行', () => {
  const root = changedProject((dir) => fs.rmSync(path.join(dir, 'features', 'last-run.json')));
  const data = loadViewerData(root);
  expect(data.lastRun).toBeNull();
  expect(data.totals).toEqual({ ...ZERO, ungenerated: 1, notRun: 5 });
  expect(data.notices).toEqual([EXPECTED.notices[0]]);
});

test('features/last-run.json の、今の .feature に無い ID と、result が決まりに無い項目は無視する', () => {
  const root = changedProject((dir) =>
    edit(dir, 'features/last-run.json', (text) => {
      const lastRun = JSON.parse(text);
      lastRun.scenarios['REQ-999-1'] = { result: 'fail' };
      lastRun.scenarios['REQ-003-1'] = { result: 'skip' };
      return JSON.stringify(lastRun, null, 2);
    }),
  );
  expect(loadViewerData(root)).toEqual(EXPECTED);
});

test('CRLF の改行と先頭の BOM を持つ feature-map.json、last-run.json、.feature から、元と同じデータができる', () => {
  const root = changedProject((dir) => {
    for (const file of ['features/feature-map.json', 'features/last-run.json', LOGIN, SEARCH]) {
      edit(dir, file, (text) => `\uFEFF${text.replaceAll('\r\n', '\n').replaceAll('\n', '\r\n')}`);
    }
  });
  expect(loadViewerData(root)).toEqual(EXPECTED);
});
