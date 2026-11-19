// 表のページ(ViewerPage)のストーリー。vitest の storybook プロジェクトが、どのストーリーも描画とアクセシビリティを検査し、play 関数があればそれも実行する。
// データは rows.ts の ViewerData の形で直接書く。rows.ts は node:fs と照合ツールを読むのでブラウザでは呼ばず、型だけを使う
import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useLayoutEffect, useRef } from 'react';
import { expect, userEvent } from 'storybook/test';
import { enableColumnResize } from '../src/column-resize';
import type { ItemRow, Outcome, ResultCounts, Row, SpecLink, StepBlock, ViewerData } from '../src/rows';
import { ViewerPage } from '../src/ViewerPage';

/** 描いた表に、build.mjs の HTML の <script> と同じ enableColumnResize で列の幅を変えるつまみを付ける */
function WithColumnResize({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (ref.current) enableColumnResize(ref.current);
  }, []);
  return <div ref={ref}>{children}</div>;
}

const meta = {
  title: 'ViewerPage',
  component: ViewerPage,
  decorators: [
    (Story) => (
      <WithColumnResize>
        <Story />
      </WithColumnResize>
    ),
  ],
} satisfies Meta<typeof ViewerPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 句だけの手順の塊。各文字列の最初の空白までをキーワード(空白を含む)、残りを本文にする(rows.test.ts と同じ) */
function stepLines(...texts: string[]): StepBlock[] {
  return texts.map((text) => {
    const end = text.indexOf(' ') + 1;
    return { kind: 'line', keyword: text.slice(0, end), text: text.slice(end) };
  });
}

/** テストファイルへのリンク。href は features/viewer/index.html から見た相対パス(rows.test.ts と同じ) */
function specLink(file: string): SpecLink {
  const specPath = `tests/e2e/${file}`;
  return { path: specPath, href: `../../${specPath}` };
}

const ZERO = { pass: 0, fail: 0, knownBug: 0, ungenerated: 0, notRun: 0 };

/** test/fixtures/project から rows.ts が作るデータ(test/rows.test.ts の期待値と同じ) */
const FIXTURE_DATA: ViewerData = {
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

/** FIXTURE_DATA のテストの結果の 1 文 */
const FIXTURE_RESULTS = '最後の全体実行: 20261016-103000(2026-10-16T01:30:00.000Z)。pass 1、fail 2、既知バグ 1、未生成 1、未実行 1。';

const OUTCOME_KEYS: Readonly<Record<Outcome, keyof ResultCounts>> = {
  pass: 'pass',
  fail: 'fail',
  既知バグ: 'knownBug',
  未生成: 'ungenerated',
  未実行: 'notRun',
};

function countsOf(outcomes: readonly Outcome[]): ResultCounts {
  const counts = { ...ZERO };
  for (const outcome of outcomes) counts[OUTCOME_KEYS[outcome]]++;
  return counts;
}

/** 全体実行の結果が無いときの、行のシナリオの結果。テストファイルがあれば未実行、無ければ未生成。要件の行は空 */
function outcomesWithoutRun(item: ItemRow): Outcome[] {
  if (item.result.kind !== 'scenario') return [];
  return [item.result.specs.length > 0 ? '未実行' : '未生成'];
}

/** data から features/last-run.json の結果を除いたもの。結果を未実行と未生成にして件数を数え直し、不整合と候補も除く */
function withoutRun(data: ViewerData): ViewerData {
  const features = data.features.map((feature) => ({
    ...feature,
    counts: feature.counts && countsOf(feature.items.flatMap(outcomesWithoutRun)),
    items: feature.items.map((item): ItemRow => {
      if (item.result.kind === 'scenario') {
        return { ...item, result: { ...item.result, outcome: outcomesWithoutRun(item)[0], reason: null } };
      }
      const outcomes = feature.items.filter((other) => other.id.startsWith(`${item.id}-`)).flatMap(outcomesWithoutRun);
      return { ...item, result: { kind: 'requirement', counts: countsOf(outcomes), untested: outcomes.every((o) => o === '未生成') } };
    }),
  }));
  const totals = countsOf(data.features.flatMap((feature) => feature.items.flatMap(outcomesWithoutRun)));
  return { ...data, lastRun: null, totals, notices: [], candidates: [], features };
}

/** 長い要件文・桁の多い ID・長いシナリオ名の機能 */
const LONG_DATA: ViewerData = {
  app: '会員サイト',
  lastRun: null,
  totals: { ...ZERO, notRun: 1 },
  notices: [],
  features: [
    {
      row: {
        kind: '機能',
        id: 'advanced-search',
        feature: '詳細検索',
        status: 'テスト済み',
        body: '概要: 複数の条件を組み合わせて商品を探す\n含む: 詳細検索の画面',
        steps: '',
        source: '',
        stepBlocks: [],
      },
      summary: '複数の条件を組み合わせて商品を探す',
      includes: ['詳細検索の画面'],
      excludes: [],
      sources: [],
      questions: [],
      decided: '',
      counts: { ...ZERO, notRun: 1 },
      items: [
        {
          kind: '要件',
          id: 'REQ-123',
          feature: '詳細検索',
          status: '',
          body:
            'WHEN 会員が商品カテゴリ、価格帯、在庫の有無、配送予定日、販売店の所在地をすべて指定して検索した, ' +
            'the 会員サイト SHALL 指定したすべての条件に一致する商品だけを関連度の高い順に 1 ページ 50 件ずつ表示し、' +
            '該当する商品が無いときはその旨と条件を緩めるための案内を表示する',
          steps: 'Given ログインしている',
          source: 'docs/requirements/search/advanced-search.md > 4.3.2 複合条件での検索',
          stepBlocks: stepLines('Given ログインしている'),
          result: { kind: 'requirement', counts: { ...ZERO, notRun: 1 }, untested: false },
        },
        {
          kind: 'シナリオ',
          id: 'REQ-123-45',
          feature: '詳細検索',
          status: '',
          body: 'すべての検索条件を指定して検索すると、条件に一致する商品だけが関連度の高い順に 50 件ずつ表示され、該当が無いときは条件を緩める案内が表示される',
          steps: [
            'Given 詳細検索の画面を表示している',
            'When すべての条件を指定して検索する',
            'Then 条件に一致する商品だけが表示される',
          ].join('\n'),
          source: '',
          stepBlocks: stepLines(
            'Given 詳細検索の画面を表示している',
            'When すべての条件を指定して検索する',
            'Then 条件に一致する商品だけが表示される',
          ),
          result: {
            kind: 'scenario',
            outcome: '未実行',
            reason: null,
            specs: [specLink('advanced-search/REQ-123-45-search-with-all-conditions.spec.ts')],
          },
        },
      ],
    },
  ],
  candidates: [],
};

/** ページのデータの機能・要件・シナリオの行。CSV の行から候補の行を除いたもの */
function rowsOf(data: ViewerData): Row[] {
  return data.features.flatMap((feature) => [feature.row, ...feature.items]);
}

/** 機能の節の表の行と、その ID の Row の組 */
type SectionRow = { row: Row; cells: HTMLTableCellElement[] };

/** 機能の節の表(ID・本文・手順・引用元)の行を、ID のセルの文字列で Row と組にする */
function sectionRows(canvasElement: HTMLElement, rows: readonly Row[]): SectionRow[] {
  const byId = new Map(rows.filter((row) => row.kind !== '機能').map((row) => [row.id, row]));
  // 手順のセルの中の表の行は含めない
  return [...canvasElement.querySelectorAll<HTMLTableRowElement>('section > .table-scroll > table > tbody > tr')].map((tr) => {
    const cells = [...tr.cells];
    const row = byId.get(cells[0].textContent ?? '');
    if (!row) throw new Error(`表に Row の無い行がある: ${cells[0].textContent}`);
    return { row, cells };
  });
}

/** 要素の文字列の start から end までを描いた矩形。行をまたぐと行ごとに 1 つずつできる */
function textRects(element: HTMLElement, start: number, end: number): DOMRect[] {
  const text = element.firstChild;
  if (!(text instanceof Text)) throw new Error(`要素の中身が文字列でない: ${element.outerHTML}`);
  const range = document.createRange();
  range.setStart(text, start);
  range.setEnd(text, end);
  return [...range.getClientRects()];
}

/** 要素の文字列全体を描いた矩形。中身が空なら空配列 */
function allTextRects(element: HTMLElement): DOMRect[] {
  const length = element.textContent?.length ?? 0;
  return length === 0 ? [] : textRects(element, 0, length);
}

/** キーワードと本文の 1 行(.keyword-line)の .keyword と .keyword-text */
function keywordParts(line: HTMLElement): { keyword: HTMLElement; text: HTMLElement } {
  const keyword = line.querySelector<HTMLElement>(':scope > .keyword');
  const text = line.querySelector<HTMLElement>(':scope > .keyword-text');
  if (!keyword || !text) throw new Error(`キーワードと本文の行に .keyword か .keyword-text が無い: ${line.outerHTML}`);
  return { keyword, text };
}

/** キーワードと本文の 1 行を描いた矩形。本文があれば本文の、無ければキーワードの文字列の矩形 */
function lineTextRects(line: HTMLElement): DOMRect[] {
  const { keyword, text } = keywordParts(line);
  return text.textContent === '' ? allTextRects(keyword) : allTextRects(text);
}

/**
 * 文字列の矩形を行ごとにまとめた、各行の左端。1 行の中でも英字と日本語の境目などで矩形が分かれるので、
 * 上端の差が矩形の高さの半分より小さいものを同じ行とみなし、その中で最も左のものを取る
 */
function lineStarts(rects: readonly DOMRect[]): number[] {
  const lines: { top: number; height: number; left: number }[] = [];
  for (const rect of rects) {
    const line = lines.find((l) => Math.abs(l.top - rect.top) < Math.max(l.height, rect.height) / 2);
    if (line) line.left = Math.min(line.left, rect.left);
    else lines.push({ top: rect.top, height: rect.height, left: rect.left });
  }
  return lines.map((line) => line.left);
}

/** 座標がそろっている(小数の座標の丸めの分、1px を許す) */
function expectAligned(values: readonly number[], message: string): void {
  if (values.length === 0) return;
  const spread = Math.max(...values) - Math.min(...values);
  expect(spread, `${message}: ${values.join(', ')}`).toBeLessThanOrEqual(1);
}

/**
 * container の中のキーワードのグリッドごとに、キーワードが右寄せで右端がそろい、キーワードの列の幅が最長のキーワードの幅で、
 * 本文(折り返した行を含む)・手順の表・DocString の左端が 1 本の線にそろい、その線がキーワードより右にある
 */
function expectKeywordColumns(container: HTMLElement, label: string): void {
  const grids = [...container.querySelectorAll<HTMLElement>('.keyword-grid')];
  expect(grids.length, `${label} にキーワードのグリッドが無い`).toBeGreaterThan(0);
  for (const grid of grids) {
    const keywords = [...grid.querySelectorAll<HTMLElement>(':scope > .keyword-line > .keyword')];
    const keywordRects = keywords.flatMap((keyword) => allTextRects(keyword));
    expect(keywordRects.length, `${label} にキーワードが無い`).toBeGreaterThan(0);
    const keywordRights = keywordRects.map((rect) => rect.right);
    expectAligned(keywordRights, `${label} のキーワードの右端がそろっていない`);
    const longest = Math.max(...keywordRects.map((rect) => rect.width));
    for (const keyword of keywords)
      expectWidth(keyword.getBoundingClientRect().width, longest, `${label} のキーワードの列の幅が最長のキーワードの幅でない`);

    const bodies = [
      ...grid.querySelectorAll<HTMLElement>(':scope > .keyword-line > .keyword-text'),
      ...grid.querySelectorAll<HTMLElement>(':scope > .step-table, :scope > .doc-string'),
    ];
    const gutter = bodies.map((body) => body.getBoundingClientRect().left);
    expectAligned(gutter, `${label} の本文・表・DocString の左端がそろっていない`);
    expect(Math.min(...gutter), `${label} の本文の左端がキーワードより右にない`).toBeGreaterThan(Math.max(...keywordRights));
    const textLefts = [...grid.querySelectorAll<HTMLElement>(':scope > .keyword-line > .keyword-text')].flatMap((text) =>
      lineStarts(allTextRects(text)),
    );
    expectAligned([...textLefts, gutter[0]], `${label} の本文の行(折り返した行を含む)の左端が本文の線にない`);
  }
}

/** container の中のキーワードと本文の行ごとの、キーワードと本文の文字列が pairs に等しい */
function expectKeywordPairs(container: HTMLElement, pairs: readonly (readonly [string, string])[]): void {
  const actual = [...container.querySelectorAll<HTMLElement>('.keyword-line')].map((line) => {
    const { keyword, text } = keywordParts(line);
    return [keyword.textContent, text.textContent];
  });
  expect(actual).toEqual(pairs);
}

/** キーワードは 14px の太字で、青鉛筆の色 */
function expectKeywordStyle(canvasElement: HTMLElement): void {
  const keywords = [...canvasElement.querySelectorAll<HTMLElement>('.keyword')].filter((keyword) => keyword.textContent !== '');
  expect(keywords.length).toBeGreaterThan(0);
  for (const keyword of keywords) {
    const style = getComputedStyle(keyword);
    expect(style.fontSize, `「${keyword.textContent}」の大きさ`).toBe('14px');
    expect(style.fontWeight, `「${keyword.textContent}」の太さ`).toBe('700');
    expect(style.color, `「${keyword.textContent}」の色`).toBe('rgb(36, 87, 166)');
  }
}

/** 空白の連続を 1 つの空白にし、前後の空白を除く */
function collapseSpaces(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

/** element を選んでコピーしたときの文字列と textContent が、空白をつぶすと expected と同じ。語がつながらず、元の順に取れる */
function expectCopiedText(element: HTMLElement, expected: string, label: string): void {
  const selection = getSelection();
  if (!selection) throw new Error('選択を取れない');
  selection.selectAllChildren(element);
  const copied = selection.toString();
  selection.removeAllRanges();
  expect(collapseSpaces(copied), `${label} をコピーした文字列`).toBe(collapseSpaces(expected));
  expect(collapseSpaces(element.textContent ?? ''), `${label} の textContent`).toBe(collapseSpaces(expected));
}

/** id の行のセル(column は 0 始まり) */
function sectionCell(canvasElement: HTMLElement, rows: readonly Row[], id: string, column: number): HTMLTableCellElement {
  const found = sectionRows(canvasElement, rows).find(({ row }) => row.id === id);
  if (!found) throw new Error(`表に ${id} の行が無い`);
  return found.cells[column];
}

/** id の機能の節の、名前が term の項目の値 */
function detailValue(canvasElement: HTMLElement, id: string, term: string): HTMLElement {
  const dt = [...canvasElement.querySelectorAll<HTMLElement>(`section#${id} dl dt`)].find((element) => element.textContent === term);
  const dd = dt?.nextElementSibling;
  if (!(dd instanceof HTMLElement) || dd.tagName !== 'DD') throw new Error(`${id} の節に ${term} の値が無い`);
  return dd;
}

/** ID のセルの文字列が 1 行に描かれ(折り返していない)、セルの右の padding より内側に収まる */
function expectIdsOnOneLine(canvasElement: HTMLElement, rows: readonly Row[]): void {
  for (const { row, cells } of sectionRows(canvasElement, rows)) {
    const rects = textRects(cells[0], 0, row.id.length);
    expect(rects, `${row.id} の ID が折り返している`).toHaveLength(1);
    const contentRight = cells[0].getBoundingClientRect().right - Number.parseFloat(getComputedStyle(cells[0]).paddingRight);
    // 罫線の半分と小数の座標の丸めの分、1px を許す
    expect(rects[0].right, `${row.id} の ID がセルからはみ出している`).toBeLessThanOrEqual(contentRight + 1);
  }
}

/** 表の見出しの行のセル */
function headersOf(table: HTMLTableElement): HTMLTableCellElement[] {
  return [...(table.tHead?.rows[0]?.cells ?? [])];
}

/** id の機能の節の、要件とシナリオの表 */
function sectionTable(canvasElement: HTMLElement, id: string): HTMLTableElement {
  const table = canvasElement.querySelector<HTMLTableElement>(`section#${id} > .table-scroll > table`);
  if (!table) throw new Error(`${id} の節に要件とシナリオの表が無い`);
  return table;
}

/** 本文・手順・引用元・結果の列の幅の比 */
const COLUMN_RATIOS = [0.3, 0.4, 0.15, 0.15];

/**
 * ids の機能の節の表が外枠の幅いっぱいで、ID を除いた列を本文・手順・引用元・結果で 30:40:15:15 に分け、どの節の表も列の幅が同じ。
 * 機能の一覧表は外枠からはみ出さない(横にスクロールしない)
 */
function expectTableWidths(canvasElement: HTMLElement, ids: readonly string[]): void {
  const columnWidths = ids.map((id) => {
    const table = sectionTable(canvasElement, id);
    const outer = table.parentElement?.getBoundingClientRect().width ?? 0;
    expectWidth(table.getBoundingClientRect().width, outer, `${id} の節の表が外枠の幅いっぱいでない`);
    const widths = widthsOf(headersOf(table));
    const rest = widths.slice(1);
    const total = rest.reduce((sum, width) => sum + width, 0);
    for (const [index, ratio] of COLUMN_RATIOS.entries()) {
      expect(Math.abs(rest[index] / total - ratio), `${id} の節の表の列の比が 30:40:15:15 でない: ${rest.join(', ')}`).toBeLessThanOrEqual(
        0.01,
      );
    }
    return widths;
  });
  const [first, ...others] = columnWidths;
  for (const [index, widths] of others.entries()) {
    for (const [column, width] of widths.entries())
      expectWidth(width, first[column], `${ids[index + 1]} の節の表の ${column + 1} 列目の幅が ${ids[0]} と違う`);
  }
  const summary = canvasElement.querySelector<HTMLTableElement>('main > .table-scroll > table');
  if (!summary) throw new Error('機能の一覧表が無い');
  expect(summary.getBoundingClientRect().width, '機能の一覧表が外枠からはみ出す').toBeLessThanOrEqual(
    (summary.parentElement?.getBoundingClientRect().width ?? 0) + 1,
  );
}

/** 要件の行の背景色が、シナリオの行と違う */
function expectRequirementRowsStandOut(canvasElement: HTMLElement, rows: readonly Row[]): void {
  const list = sectionRows(canvasElement, rows);
  const backgrounds = (kind: Row['kind']) =>
    new Set(
      list.filter(({ row }) => row.kind === kind).flatMap(({ cells }) => cells.map((cell) => getComputedStyle(cell).backgroundColor)),
    );
  const requirement = backgrounds('要件');
  const scenario = backgrounds('シナリオ');
  expect(requirement.size).toBeGreaterThan(0);
  expect(scenario.size).toBeGreaterThan(0);
  for (const color of requirement) expect(scenario.has(color), `要件の行とシナリオの行の背景が同じ ${color}`).toBe(false);
}

/**
 * 手順のセルで、句ごとに行が分かれている。表と DocString を除いた句と Examples の行を、塊の line の順に数え、
 * 各行の最初の矩形が、前の行の最後の矩形より下から始まることで見る
 */
function expectOneClausePerLine(canvasElement: HTMLElement, rows: readonly Row[]): void {
  for (const { row, cells } of sectionRows(canvasElement, rows)) {
    const clauses = row.stepBlocks.flatMap((block) => (block.kind === 'line' ? [`${block.keyword}${block.text}`] : []));
    const elements = [...cells[2].querySelectorAll<HTMLElement>('.step-line')];
    expect(elements.map((element) => element.textContent)).toEqual(clauses);
    let previousBottom = Number.NEGATIVE_INFINITY;
    for (const element of elements) {
      const rects = lineTextRects(element);
      // 小数の座標の丸めで、隣り合う行の上端と下端が 1px 未満ずれることがある
      expect(rects[0].top, `${row.id} の「${element.textContent}」が前の句と同じ行にある`).toBeGreaterThan(previousBottom - 1);
      previousBottom = Math.max(...rects.map((rect) => rect.bottom));
    }
  }
}

/** id の行の手順のセルに表がちょうど 1 つあり、見出しが headers で、cell の値のセルがある */
function expectStepTable(canvasElement: HTMLElement, rows: readonly Row[], id: string, headers: readonly string[], cell: string): void {
  const found = sectionRows(canvasElement, rows).find(({ row }) => row.id === id);
  if (!found) throw new Error(`表に ${id} の行が無い`);
  const tables = [...found.cells[2].querySelectorAll('table')];
  expect(tables, `${id} の手順に表が 1 つでない`).toHaveLength(1);
  const [table] = tables;
  const headerCells = [...table.querySelectorAll('thead th')];
  expect(headerCells.map((th) => th.textContent)).toEqual(headers);
  for (const th of headerCells) expect(th.getAttribute('scope')).toBe('col');
  expect([...table.querySelectorAll('tbody td')].map((td) => td.textContent)).toContain(cell);
}

/** id の行の手順のセルに DocString がちょうど 1 つあり、区切り行を含む text を持ち、周りと同じ文字で、改行ごとに行を分けて描く */
function expectDocString(canvasElement: HTMLElement, rows: readonly Row[], id: string, text: string): void {
  const found = sectionRows(canvasElement, rows).find(({ row }) => row.id === id);
  if (!found) throw new Error(`表に ${id} の行が無い`);
  const blocks = [...found.cells[2].querySelectorAll<HTMLElement>('pre.doc-string')];
  expect(blocks, `${id} の手順に DocString が 1 つでない`).toHaveLength(1);
  const [pre] = blocks;
  expect(pre.textContent).toBe(text);
  expect(getComputedStyle(pre).fontFamily, `${id} の DocString の文字が周りと違う`).toBe(getComputedStyle(found.cells[2]).fontFamily);
  let start = 0;
  let previousBottom = Number.NEGATIVE_INFINITY;
  for (const line of text.split('\n')) {
    const rects = textRects(pre, start, start + line.length);
    expect(rects[0].top, `${id} の DocString の「${line}」が前の行と同じ行にある`).toBeGreaterThan(previousBottom - 1);
    previousBottom = Math.max(...rects.map((rect) => rect.bottom));
    start += line.length + 1;
  }
}

/**
 * id の要件の本文が、lines の行に分かれて描かれている。要素が 1 行に 1 つあり、どの要素も折り返さず(キーワードと本文の文字列の矩形がどちらも 1 つで、
 * 同じ行にある)、前の要素より下に描かれる
 */
function expectRequirementLines(canvasElement: HTMLElement, rows: readonly Row[], id: string, lines: readonly string[]): void {
  const found = sectionRows(canvasElement, rows).find(({ row }) => row.id === id);
  if (!found) throw new Error(`表に ${id} の行が無い`);
  const elements = [...found.cells[1].querySelectorAll<HTMLElement>('.ears-line')];
  expect(elements.map((element) => element.textContent)).toEqual(lines);
  let previousBottom = Number.NEGATIVE_INFINITY;
  for (const element of elements) {
    const { keyword, text } = keywordParts(element);
    const keywordRects = allTextRects(keyword);
    const textRectsOfLine = allTextRects(text);
    expect(lineStarts(keywordRects), `${id} の「${element.textContent}」のキーワードが折り返している`).toHaveLength(1);
    expect(lineStarts(textRectsOfLine), `${id} の「${element.textContent}」が折り返している`).toHaveLength(1);
    expect(
      Math.abs(keywordRects[0].top - textRectsOfLine[0].top),
      `${id} の「${element.textContent}」のキーワードと本文が別の行にある`,
    ).toBeLessThan(textRectsOfLine[0].height);
    const rects = lineTextRects(element);
    expect(rects[0].top, `${id} の「${element.textContent}」が前の行と同じ行にある`).toBeGreaterThan(previousBottom - 1);
    previousBottom = rects[0].bottom;
  }
}

/** ページの先頭が、アプリ名・行から数えた件数の 1 文・テストの結果の 1 文 results・CSV へのリンク・保存のしかたの順に並ぶ */
function expectPageTop(canvasElement: HTMLElement, app: string, rows: readonly Row[], results: string): void {
  expect(canvasElement.querySelector('h1')?.textContent).toBe(app);
  const count = (kind: Row['kind']) => rows.filter((row) => row.kind === kind).length;
  const paragraphs = [...canvasElement.querySelectorAll<HTMLElement>('main > p')];
  expect(paragraphs[0]?.textContent).toBe(
    `E2E テストの仕様。機能 ${count('機能')}、要件 ${count('要件')}、シナリオ ${count('シナリオ')}。`,
  );
  expect(paragraphs[1]?.textContent).toBe(results);
  const link = canvasElement.querySelector('a[href="review.csv"]');
  expect(link?.textContent).toBe('review.csv');
  expect(link?.parentElement?.textContent).toBe('レビュー用の CSV: review.csv');
  expect(link?.parentElement).toBe(paragraphs[2]);
  expect(canvasElement.querySelector('main > p.note')?.textContent).toBe(
    'コメントの列に修正の依頼を書き、Excel では「CSV UTF-8」を選んで features/viewer/ の外に保存する',
  );
}

/** 要素の計算値。要素が無ければ失敗する */
function styleOf(canvasElement: HTMLElement, selector: string): CSSStyleDeclaration {
  const element = canvasElement.querySelector(selector);
  if (!element) throw new Error(`${selector} が無い`);
  return getComputedStyle(element);
}

/** 文字の大きさ。アプリ名 36px、節の見出し 21px、表の本文 16px(行間 1.7)、メモと補足 14px */
function expectTypeScale(canvasElement: HTMLElement): void {
  const h1 = styleOf(canvasElement, 'h1');
  expect([h1.fontSize, h1.fontWeight]).toEqual(['36px', '700']);
  expect(styleOf(canvasElement, 'section h2').fontSize).toBe('21px');
  const td = styleOf(canvasElement, 'section > .table-scroll > table > tbody > tr > td');
  expect([td.fontSize, td.lineHeight]).toEqual(['16px', '27.2px']);
  expect(styleOf(canvasElement, 'p.note').fontSize).toBe('14px');
  expect(styleOf(canvasElement, '.details dt').fontSize).toBe('14px');
}

/** 同梱の書体が読み込まれ、表のセルの英字と数字に使われ、数字の幅がそろう */
function expectFont(canvasElement: HTMLElement): void {
  expect(document.fonts.check('16px "Atkinson Hyperlegible Next"'), '同梱の書体が使えない').toBe(true);
  const loaded = [...document.fonts].filter((face) => face.family.replace(/^"|"$/g, '') === 'Atkinson Hyperlegible Next');
  expect(
    loaded.map((face) => face.status),
    '同梱の書体が読み込まれていない',
  ).toContain('loaded');
  const idCell = styleOf(canvasElement, 'section > .table-scroll > table > tbody > tr > td:first-child');
  expect(idCell.fontFamily.startsWith('"Atkinson Hyperlegible Next"'), `ID のセルの書体: ${idCell.fontFamily}`).toBe(true);
  expect(idCell.fontVariantNumeric).toBe('tabular-nums');
}

const STATUS_MARKS: Record<string, string> = { 未着手: '○', 定義済み: '◐', テスト済み: '●', 対象外: '✕' };

/** status の要素が、読み上げない記号 mark と、見える文字のラベル label を持つ */
function expectStatus(status: Element | null, label: string, where: string): void {
  if (!(status instanceof HTMLElement)) throw new Error(`${where} に状態が無い`);
  const mark = status.querySelector('.status-mark');
  expect(mark?.textContent, `${where} の記号`).toBe(STATUS_MARKS[label]);
  expect(mark?.getAttribute('aria-hidden'), `${where} の記号を読み上げる`).toBe('true');
  expect(status.textContent, `${where} の状態`).toBe(`${STATUS_MARKS[label]}${label}`);
  // ラベルは記号の外の文字で、隠さずに描く
  const labelText = [...status.childNodes].filter((node) => node instanceof Text).map((node) => node.textContent);
  expect(labelText, `${where} のラベルが見える文字でない`).toEqual([label]);
  expect(status.getAttribute('aria-hidden'), `${where} のラベルを読み上げない`).toBeNull();
  expect(status.getBoundingClientRect().width, `${where} の状態が描かれていない`).toBeGreaterThan(0);
}

/** 機能の一覧表の状態のセルと、各節の見出しの状態が、状態ごとの記号と文字のラベルを持つ */
function expectStatusMarks(canvasElement: HTMLElement, rows: readonly Row[]): void {
  const features = rows.filter((row) => row.kind === '機能');
  const summaryRows = [...canvasElement.querySelectorAll<HTMLTableRowElement>('main > .table-scroll > table > tbody > tr')];
  expect(summaryRows).toHaveLength(features.length);
  for (const [index, feature] of features.entries()) {
    expectStatus(summaryRows[index].cells[1].querySelector('.status'), feature.status, `一覧表の ${feature.id}`);
    expectStatus(canvasElement.querySelector(`section#${feature.id} > h2 .status`), feature.status, `${feature.id} の節の見出し`);
  }
}

/**
 * id の機能の節の項目の名前が terms で、layout が side なら値が名前の右の同じ行に、
 * stacked なら値が名前の下に、名前と同じ左端で並ぶ
 */
function expectDetails(canvasElement: HTMLElement, id: string, terms: readonly string[], layout: 'side' | 'stacked'): void {
  const dts = [...canvasElement.querySelectorAll<HTMLElement>(`section#${id} .details dt`)];
  expect(dts.map((dt) => dt.textContent)).toEqual(terms);
  for (const dt of dts) {
    const dd = detailValue(canvasElement, id, dt.textContent ?? '');
    const term = dt.getBoundingClientRect();
    const value = dd.getBoundingClientRect();
    if (layout === 'side') {
      expect(value.left, `${id} の ${dt.textContent} の値が名前の右にない`).toBeGreaterThan(term.right);
      expect(value.top, `${id} の ${dt.textContent} の値が名前と同じ行にない`).toBeLessThan(term.bottom);
    } else {
      expect(value.top, `${id} の ${dt.textContent} の値が名前の下にない`).toBeGreaterThanOrEqual(term.bottom - 1);
      expectWidth(value.left, term.left, `${id} の ${dt.textContent} の値の左端が名前と違う`);
    }
  }
}

/** login の機能の節の項目の名前。決めたことは値が無いので出ない */
const LOGIN_TERMS = ['概要', '含む', '含まない', '根拠', '確認したいこと', 'Background', '引用元'];

/** .feature の無い節には状態に合った一言があり、表のある節には無い */
function expectEmptyNotes(canvasElement: HTMLElement): void {
  expect(canvasElement.querySelector('section#news > p.note')?.textContent).toBe('要件とシナリオはまだありません。');
  expect(canvasElement.querySelector('section#media-files > p.note')?.textContent).toBe('テストの対象から外しています。');
  for (const section of canvasElement.querySelectorAll('section')) {
    if (section.querySelector(':scope > .table-scroll'))
      expect(section.querySelector('p.note'), `${section.id} の節に一言がある`).toBeNull();
  }
}

/** WCAG の相対輝度から求める 2 つの色のコントラスト比。色は getComputedStyle の rgb() か rgba() */
function contrastRatio(rgbA: string, rgbB: string): number {
  const luminance = (rgb: string): number => {
    const channels = rgb
      .match(/[\d.]+/g)
      ?.slice(0, 3)
      .map(Number);
    if (channels?.length !== 3) throw new Error(`色を読めない: ${rgb}`);
    const [r, g, b] = channels.map((value) => {
      const c = value / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [light, dark] = [luminance(rgbA), luminance(rgbB)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

/** フォーカス枠が 2px 以上の実線で、紙の色に対して 3:1 以上 */
function expectFocusRing(element: HTMLElement, label: string): void {
  const style = getComputedStyle(element);
  expect(style.outlineStyle, `${label} のフォーカス枠`).toBe('solid');
  expect(Number.parseFloat(style.outlineWidth), `${label} のフォーカス枠の太さ`).toBeGreaterThanOrEqual(2);
  expect(contrastRatio(style.outlineColor, 'rgb(255, 255, 255)'), `${label} のフォーカス枠のコントラスト`).toBeGreaterThanOrEqual(3);
}

/** 表の本文の行ごとの、セルの文字列 */
function bodyTexts(table: HTMLTableElement): (string | null)[][] {
  return [...table.tBodies[0].rows].map((tr) => [...tr.cells].map((cell) => cell.textContent));
}

function tableOf(canvasElement: HTMLElement, selector: string): HTMLTableElement {
  const table = canvasElement.querySelector<HTMLTableElement>(selector);
  if (!table) throw new Error(`${selector} が無い`);
  return table;
}

/** fail の語か件数の要素が、朱の太字 */
function expectFail(element: Element | null, text: string, label: string): void {
  if (!(element instanceof HTMLElement)) throw new Error(`${label} に fail の要素が無い`);
  expect(element.textContent, label).toBe(text);
  const style = getComputedStyle(element);
  expect(style.color, `${label} の色が朱でない`).toBe('rgb(179, 38, 30)');
  expect(style.fontWeight, `${label} が太字でない`).toBe('700');
}

/** 一覧表の列と、機能ごとの slug・説明・結果・確認したいこと。行は data.features の順 */
function expectSummaryColumns(canvasElement: HTMLElement, data: ViewerData): void {
  const table = tableOf(canvasElement, 'main > .table-scroll > table');
  expect(headersOf(table).map((th) => th.textContent)).toEqual([
    '機能名',
    '状態',
    '説明',
    '要件数',
    'シナリオ数',
    '結果',
    '確認したいこと',
  ]);
  const rows = [...table.tBodies[0].rows];
  const cellsOf = (id: string) => [...rows[data.features.findIndex((feature) => feature.row.id === id)].cells];
  const login = cellsOf('login');
  expect(login[0].querySelector('.slug')?.textContent).toBe('login');
  expect(login[2].textContent).toBe(data.features[0].summary);
  expect(login[5].textContent).toBe('pass 1、fail 2、既知バグ 1');
  expectFail(login[5].querySelector('.fail'), 'fail 2', '一覧表の login の fail');
  expect(login[6].textContent).toBe('2 件');
  expect(login[6].querySelector('a')?.getAttribute('href')).toBe('#login');
  expect([cellsOf('product-search')[5].textContent, cellsOf('product-search')[6].textContent]).toEqual(['未生成 1、未実行 1', '']);
  for (const id of ['news', 'media-files']) {
    expect([cellsOf(id)[5].textContent, cellsOf(id)[6].textContent], `一覧表の ${id} の結果と確認したいことが空でない`).toEqual(['', '']);
  }
}

/** id のシナリオの行に結ばれたテストファイル */
function specsOf(data: ViewerData, id: string): SpecLink[] {
  const item = data.features.flatMap((feature) => feature.items).find((row) => row.id === id);
  if (item?.result.kind !== 'scenario') throw new Error(`${id} のシナリオの行が無い`);
  return item.result.specs;
}

/** 機能の節の表の結果の列。シナリオは結果の語・理由・テストファイルへのリンク、要件は配下の件数 */
function expectResultColumn(canvasElement: HTMLElement, data: ViewerData): void {
  const rows = rowsOf(data);
  expect(headersOf(sectionTable(canvasElement, 'login')).map((th) => th.textContent)).toEqual(['ID', '本文', '手順', '引用元', '結果']);
  const cell = (id: string) => sectionCell(canvasElement, rows, id, 4);
  const links = (id: string) =>
    [...cell(id).querySelectorAll<HTMLElement>('a.spec-link')].map((a) => [a.textContent, a.getAttribute('href'), a.getAttribute('title')]);
  const expectedLinks = (id: string) => specsOf(data, id).map((spec) => [spec.path, spec.href, spec.path]);

  expect(cell('REQ-001-1').textContent?.startsWith('pass'), 'REQ-001-1 の結果').toBe(true);
  expect(links('REQ-001-1')).toEqual(expectedLinks('REQ-001-1'));
  expect(links('REQ-001-1')).toHaveLength(2);
  expect(links('REQ-001-1')[0][0]).toContain('-copy');
  expect(cell('REQ-001-2').textContent?.startsWith('既知バグ'), 'REQ-001-2 の結果').toBe(true);
  expect(cell('REQ-001-2').querySelector('.reason')?.textContent).toBe('2026-10-01 ユーザー判断: パスワード空のエラーが出ない。#123');
  expectFail(cell('REQ-001-3').querySelector('strong.fail'), 'fail', 'REQ-001-3 の結果');
  expect(cell('REQ-001-3').querySelector('.reason')?.textContent).toBe('fail 指定だが通過');
  expect(cell('REQ-003-1').textContent?.startsWith('未実行'), 'REQ-003-1 の結果').toBe(true);
  expect(links('REQ-003-1')).toEqual(expectedLinks('REQ-003-1'));
  expect(links('REQ-003-1')).toHaveLength(1);
  expect(cell('REQ-003-2').textContent).toBe('未生成');
  expect(links('REQ-003-2')).toEqual([]);
  expect(cell('REQ-001').textContent).toBe('pass 1、fail 1、既知バグ 1');
  expect(cell('REQ-003').textContent).toBe('未生成 1、未実行 1');
  for (const element of [cell('REQ-001-2').querySelector('.reason'), cell('REQ-001-1').querySelector('.spec-link')]) {
    if (!element) throw new Error('理由かリンクが無い');
    expect(getComputedStyle(element).fontSize, `${element.textContent} の大きさ`).toBe('14px');
  }
}

/** login の確認したいことが、地の色の付いた 2 つの箇条書き */
function expectQuestions(canvasElement: HTMLElement): void {
  const questions = detailValue(canvasElement, 'login', '確認したいこと');
  expect(getComputedStyle(questions).backgroundColor, '確認したいことの地の色').toBe('rgb(255, 244, 214)');
  expect(questions.querySelectorAll('li')).toHaveLength(2);
}

/** 照合ツールの不整合の節と、機能にするか決まっていないものの表 */
function expectNoticesAndCandidates(canvasElement: HTMLElement, data: ViewerData): void {
  expect(canvasElement.querySelector('main > .notices > h2')?.textContent).toBe('照合ツールの不整合');
  const notices = tableOf(canvasElement, 'main > .notices > .table-scroll > table');
  expect(headersOf(notices).map((th) => th.textContent)).toEqual(['種別', '機能', '対象']);
  expect(data.notices[0].target.startsWith('REQ-001-1: ')).toBe(true);
  expect(bodyTexts(notices)).toEqual([
    ['重複 ID', 'ログイン', data.notices[0].target],
    ['状態と結果の食い違い', 'ログイン', 'テスト済み なのに fail 2'],
  ]);
  expect(canvasElement.querySelector('main > .candidates > h2')?.textContent).toBe('機能にするか決まっていないもの');
  const candidates = tableOf(canvasElement, 'main > .candidates > .table-scroll > table');
  expect(headersOf(candidates).map((th) => th.textContent)).toEqual(['名前', '理由', '根拠']);
  expect(bodyTexts(candidates)).toEqual([['ソーシャルログイン social-login', '資料にあるが画面に無い', 'docs/requirements.md 3.4']]);
  expect(candidates.querySelector('.slug')?.textContent).toBe('social-login');
}

export const Fixture: Story = {
  name: '規約どおりの fixture',
  args: FIXTURE_DATA,
  play: async ({ canvasElement, args }) => {
    const rows = rowsOf(args);
    expectPageTop(canvasElement, args.app, rows, FIXTURE_RESULTS);
    expectTypeScale(canvasElement);
    expectFont(canvasElement);
    expectStatusMarks(canvasElement, rows);
    expect(new Set(Object.values(STATUS_MARKS)).size, '状態の記号が状態ごとに違わない').toBe(4);
    expect(new Set(rows.filter((row) => row.kind === '機能').map((row) => row.status))).toEqual(new Set(Object.keys(STATUS_MARKS)));
    expectDetails(canvasElement, 'login', LOGIN_TERMS, 'side');
    expectEmptyNotes(canvasElement);
    expectSummaryColumns(canvasElement, args);
    expectResultColumn(canvasElement, args);
    expectQuestions(canvasElement);
    expectNoticesAndCandidates(canvasElement, args);
    expectIdsOnOneLine(canvasElement, rows);
    expectTableWidths(canvasElement, ['login', 'product-search']);
    expectRequirementRowsStandOut(canvasElement, rows);
    expectOneClausePerLine(canvasElement, rows);
    expectRequirementLines(canvasElement, rows, 'REQ-001', [
      'WHEN 正しい資格情報を送信した,',
      'the 会員サイト',
      'SHALL ダッシュボードを表示する',
    ]);
    expectStepTable(canvasElement, rows, 'REQ-001-1', ['項目', '値'], 'pass|word');
    expectStepTable(canvasElement, rows, 'REQ-001-2', ['項目', '期待メッセージ'], 'パスワードを入力してください');
    expectDocString(canvasElement, rows, 'REQ-002-1', '"""\nアカウントをロックしました。\n管理者に連絡してください。\n"""');

    for (const id of ['REQ-001', 'REQ-002']) expectKeywordColumns(sectionCell(canvasElement, rows, id, 1), `${id} の本文`);
    for (const id of ['REQ-001-1', 'REQ-001-2', 'REQ-002-1', 'REQ-003-1']) {
      expectKeywordColumns(sectionCell(canvasElement, rows, id, 2), `${id} の手順`);
    }
    const background = detailValue(canvasElement, 'login', 'Background');
    expectKeywordColumns(background, 'login の Background');
    expectKeywordPairs(sectionCell(canvasElement, rows, 'REQ-002', 1), [
      ['IF', '5 回続けて誤ったパスワードを送信した,'],
      ['THEN the', '会員サイト'],
      ['SHALL', 'アカウントをロックする'],
    ]);
    expectKeywordPairs(sectionCell(canvasElement, rows, 'REQ-003-1', 2), [
      ['Given', 'ログインしている'],
      ['And', '商品一覧を表示している'],
      ['When', '「りんご」で検索する'],
      ['Then', '「りんごジュース」が表示される'],
      ['But', '「みかん」は表示されない'],
    ]);
    expectKeywordPairs(sectionCell(canvasElement, rows, 'REQ-001-2', 2), [
      ['When', '<項目> を空にして送信する'],
      ['Then', '「<期待メッセージ>」と表示される'],
      ['', 'Examples:'],
    ]);
    expectKeywordStyle(canvasElement);
    for (const id of ['REQ-001', 'REQ-002']) {
      const row = rows.find((r) => r.id === id);
      if (!row) throw new Error(`${id} の行が無い`);
      expectCopiedText(sectionCell(canvasElement, rows, id, 1), row.body, `${id} の本文`);
    }
    const searchRow = rows.find((r) => r.id === 'REQ-003-1');
    if (!searchRow) throw new Error('REQ-003-1 の行が無い');
    expectCopiedText(sectionCell(canvasElement, rows, 'REQ-003-1', 2), searchRow.steps, 'REQ-003-1 の手順');
    expectCopiedText(background, 'Given ログインページを表示している', 'login の Background');
  },
};

export const NoRunYet: Story = {
  name: '全体実行の結果が無い',
  args: withoutRun(FIXTURE_DATA),
  play: async ({ canvasElement, args }) => {
    const rows = rowsOf(args);
    expectPageTop(canvasElement, args.app, rows, '全体実行の結果はまだありません。');
    expect(canvasElement.querySelector('div.notices'), '不整合の節がある').toBeNull();
    expect(canvasElement.querySelector('div.candidates'), '候補の表がある').toBeNull();
    expectStatusMarks(canvasElement, rows);
    expect(sectionCell(canvasElement, rows, 'REQ-001', 4).textContent).toBe('未実行 3');
    expect(sectionCell(canvasElement, rows, 'REQ-003-2', 4).textContent).toBe('未生成');
  },
};

export const LongTexts: Story = {
  name: '長い要件文・ID・シナリオ名',
  args: LONG_DATA,
  play: async ({ canvasElement, args }) => {
    const rows = rowsOf(args);
    expectIdsOnOneLine(canvasElement, rows);
    expectRequirementRowsStandOut(canvasElement, rows);
    expectOneClausePerLine(canvasElement, rows);
    // 長い要件文の折り返した行も、本文の線にそろう
    expectKeywordColumns(sectionCell(canvasElement, rows, 'REQ-123', 1), 'REQ-123 の本文');
  },
};

export const LongTextsNarrow: Story = {
  name: '長い要件文・ID・シナリオ名(幅 800px)',
  args: LongTexts.args,
  decorators: [
    (Story) => (
      <div style={{ width: 800 }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, args }) => {
    expectIdsOnOneLine(canvasElement, rowsOf(args));
  },
};

export const FeaturesWithoutFeatureFile: Story = {
  name: '.feature の無い機能だけ',
  args: {
    ...FIXTURE_DATA,
    features: FIXTURE_DATA.features.filter(({ row }) => row.status === '未着手' || row.status === '対象外'),
  },
  play: async ({ canvasElement, args }) => {
    expectEmptyNotes(canvasElement);
    expectStatusMarks(canvasElement, rowsOf(args));
  },
};

/**
 * 狭い画面の表。機能の一覧表は中身の幅のまま状態を 1 行に描き、説明は 24em(384px)より広げない。
 * 機能の節の表は画面に縮めず外枠で横にスクロールする
 */
function expectNarrowTables(canvasElement: HTMLElement): void {
  const summaries = [...canvasElement.querySelectorAll<HTMLElement>('main > .table-scroll > table .summary')];
  expect(summaries.length).toBeGreaterThan(0);
  for (const summary of summaries) {
    expect(summary.getBoundingClientRect().width, `一覧表の説明「${summary.textContent}」が広すぎる`).toBeLessThanOrEqual(384 + 1);
  }
  for (const status of canvasElement.querySelectorAll<HTMLElement>('main > .table-scroll > table .status')) {
    const range = document.createRange();
    range.selectNodeContents(status);
    expect(lineStarts([...range.getClientRects()]), `一覧表の「${status.textContent}」が折り返している`).toHaveLength(1);
  }
  for (const scroll of canvasElement.querySelectorAll<HTMLElement>('section > .table-scroll')) {
    expect(scroll.scrollWidth, '狭い画面で機能の節の表を外枠で横にスクロールできない').toBeGreaterThan(scroll.clientWidth);
  }
}

export const NarrowScreen: Story = {
  name: '狭い画面(幅 414px)',
  args: FIXTURE_DATA,
  globals: { viewport: { value: 'mobile2', isRotated: false } },
  play: async ({ canvasElement, args }) => {
    expect(window.innerWidth, '画面の幅が 640px 未満でない').toBeLessThan(640);
    expectDetails(canvasElement, 'login', LOGIN_TERMS, 'stacked');
    expectIdsOnOneLine(canvasElement, rowsOf(args));
    expectNarrowTables(canvasElement);
  },
};

export const FocusRings: Story = {
  name: 'つまみとリンクのフォーカス枠',
  args: FIXTURE_DATA,
  play: async ({ canvasElement }) => {
    const headers = sectionHeaders(canvasElement);
    const handle = headers.find((th) => th.textContent === '本文')?.querySelector<HTMLElement>('.col-resize');
    if (!handle) throw new Error('「本文」の見出しにつまみが無い');
    expect(getComputedStyle(handle, '::after').backgroundColor, '普段のつまみの線が罫の色でない').toBe('rgb(201, 211, 227)');
    handle.focus();
    expect(handle.matches(':focus-visible'), 'つまみにフォーカス枠が出ていない').toBe(true);
    expect(getComputedStyle(handle, '::after').backgroundColor, 'フォーカスしたつまみの線が青鉛筆の色でない').toBe('rgb(36, 87, 166)');
    expectFocusRing(handle, 'つまみ');
    const link = canvasElement.querySelector<HTMLElement>('a[href="review.csv"]');
    if (!link) throw new Error('review.csv へのリンクが無い');
    link.focus();
    expect(link.matches(':focus-visible'), 'リンクにフォーカス枠が出ていない').toBe(true);
    expectFocusRing(link, 'review.csv へのリンク');
  },
};

/** 最初の機能の節の、要件とシナリオの表の見出しのセル */
function sectionHeaders(canvasElement: HTMLElement): HTMLTableCellElement[] {
  const table = canvasElement.querySelector<HTMLTableElement>('section table.resizable');
  if (!table) throw new Error('機能の節に要件とシナリオの表が無い');
  return headersOf(table);
}

function widthsOf(cells: readonly HTMLTableCellElement[]): number[] {
  return cells.map((cell) => cell.getBoundingClientRect().width);
}

/** 小数の座標の丸めで、幅が 1px 未満ずれることがある */
function expectWidth(actual: number, expected: number, message: string): void {
  expect(Math.abs(actual - expected), `${message}: ${actual} が ${expected} でない`).toBeLessThanOrEqual(1);
}

export const ResizeColumns: Story = {
  name: '列の幅をつまみで変える',
  args: FIXTURE_DATA,
  play: async ({ canvasElement }) => {
    const headers = sectionHeaders(canvasElement);
    const column = headers.findIndex((th) => th.textContent === '本文');
    const handle = headers[column].querySelector<HTMLElement>('.col-resize');
    if (!handle) throw new Error('「本文」の見出しにつまみが無い');
    expect(handle.getAttribute('aria-label')).toBe('「本文」の列の幅');
    // 見出しの名前を中身から計算させると、つまみの値が混ざる
    for (const th of headers) expect(th.getAttribute('aria-label'), `「${th.textContent}」の見出しに名前が無い`).toBe(th.textContent);

    const before = widthsOf(headers);
    const box = handle.getBoundingClientRect();
    const start = { clientX: box.left + box.width / 2, clientY: box.top + box.height / 2 };
    const distance = 80;
    await userEvent.pointer([
      { keys: '[MouseLeft>]', target: handle, coords: start },
      { coords: { ...start, clientX: start.clientX + distance } },
      { keys: '[/MouseLeft]' },
    ]);
    const dragged = widthsOf(headers);
    for (const [index, width] of dragged.entries()) {
      if (index === column) expectWidth(width, before[index] + distance, '「本文」の列がドラッグした分だけ広がっていない');
      else expectWidth(width, before[index], `「${headers[index].textContent}」の列の幅が変わった`);
    }
    // ページの幅いっぱいの表を広げたので、外枠で横にスクロールする
    const scroll = handle.closest('.table-scroll');
    if (!scroll) throw new Error('表の外枠が無い');
    expect(scroll.scrollWidth, '広げた表を外枠で横にスクロールできない').toBeGreaterThan(scroll.clientWidth);

    handle.focus();
    await userEvent.keyboard('{ArrowRight}');
    const widened = widthsOf(headers)[column];
    expect(widened, '右矢印キーで「本文」の列が広がっていない').toBeGreaterThan(dragged[column]);

    // つまみの値が今の幅を表し、上限で頭打ちにならない
    const value = Number(handle.getAttribute('aria-valuenow'));
    expectWidth(value, widened, 'つまみの値が「本文」の列の幅でない');
    expect(value).toBeLessThanOrEqual(Number(handle.getAttribute('aria-valuemax')));
    expect(handle.getAttribute('aria-valuetext')).toBe(`${value}px`);
  },
};
