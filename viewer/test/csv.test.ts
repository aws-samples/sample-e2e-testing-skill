// csv.ts がデータから CSV の行を作ることと、行の配列から Excel でそのまま開ける CSV(BOM 付き、行の区切りは CRLF、セル内の改行は LF)を作ることを確かめる
import { fileURLToPath } from 'node:url';
import { expect, test } from 'vitest';
import { csvRows, toCsv } from '../src/csv';
import { loadViewerData, type Row } from '../src/rows';

const PROJECT = fileURLToPath(new URL('./fixtures/project', import.meta.url));

/** CSV の列の順のセル(コメントの列を除く) */
function cells(row: Row): string[] {
  return [row.kind, row.id, row.feature, row.status, row.body, row.steps, row.source];
}

test('CSV の行は、機能ごとに機能の行と要件・シナリオの行を並べ、その後ろに候補の行が続く', () => {
  const rows = csvRows(loadViewerData(PROJECT));
  expect(rows.map((row) => [row.kind, row.id])).toEqual([
    ['機能', 'login'],
    ['要件', 'REQ-001'],
    ['シナリオ', 'REQ-001-1'],
    ['シナリオ', 'REQ-001-2'],
    ['シナリオ', 'REQ-001-3'],
    ['要件', 'REQ-002'],
    ['シナリオ', 'REQ-002-1'],
    ['機能', 'product-search'],
    ['要件', 'REQ-003'],
    ['シナリオ', 'REQ-003-1'],
    ['シナリオ', 'REQ-003-2'],
    ['機能', 'news'],
    ['機能', 'media-files'],
    ['候補', 'social-login'],
  ]);
});

test('機能の行の本文は、値のある項目だけを見出し付きの行にし、配列の欄は 、 でつなぐ', () => {
  const [login] = csvRows(loadViewerData(PROJECT));
  expect(login.body).toBe(
    [
      '概要: 会員がメールアドレスとパスワードでサインインし、ダッシュボードを開く',
      '含む: ログイン画面、5 回失敗したときのロック、ロール: 一般/管理者, "引用" を含む',
      '含まない: パスワードの再設定(パスワード再設定の機能に入れた)',
      '根拠: docs/requirements.md 3.2、探索で /login の画面を確認',
      '確認したいこと: 資料にある「ソーシャルログイン」が画面に無い、ロックの解除の手順(探索では確かめられなかった)',
    ].join('\n'),
  );
});

test('候補の行は、ID が slug、機能が名前、本文が理由と根拠で、状態・手順・引用元は空', () => {
  const candidate = csvRows(loadViewerData(PROJECT)).at(-1);
  if (!candidate) throw new Error('CSV の行が無い');
  expect(cells(candidate)).toEqual([
    '候補',
    'social-login',
    'ソーシャルログイン',
    '',
    '理由: 資料にあるが画面に無い\n根拠: docs/requirements.md 3.4',
    '',
    '',
  ]);
});

const rows: Row[] = [
  {
    kind: '機能',
    id: 'login',
    feature: 'ログイン',
    status: 'テスト済み',
    body: 'メモ, "引用" を含む',
    steps: '',
    source: '',
    stepBlocks: [],
  },
  {
    kind: 'シナリオ',
    id: 'REQ-001-1',
    feature: 'ログイン',
    status: '',
    body: '送信できる',
    steps: 'Given 前提\nThen 結果',
    source: 'docs/a.md',
    stepBlocks: [
      { kind: 'line', keyword: 'Given ', text: '前提' },
      { kind: 'line', keyword: 'Then ', text: '結果' },
    ],
  },
  {
    kind: '候補',
    id: 'social-login',
    feature: 'ソーシャルログイン',
    status: '',
    body: '理由: 資料にあるが画面に無い\n根拠: docs/requirements.md 3.4',
    steps: '',
    source: '',
    stepBlocks: [],
  },
];
const EXPECTED_CSV =
  '\uFEFF種別,ID,機能,状態,本文,手順,引用元,コメント(修正の依頼)\r\n' +
  '機能,login,ログイン,テスト済み,"メモ, ""引用"" を含む",,,\r\n' +
  'シナリオ,REQ-001-1,ログイン,,送信できる,"Given 前提\nThen 結果",docs/a.md,\r\n' +
  '候補,social-login,ソーシャルログイン,,"理由: 資料にあるが画面に無い\n根拠: docs/requirements.md 3.4",,,\r\n';

test('BOM、見出し、CRLF の行区切り、セル内の LF、カンマと " の囲み方', () => {
  expect(toCsv(rows)).toBe(EXPECTED_CSV);
});

test('セル内の改行は LF のまま、CRLF は行の区切りにだけ現れる', () => {
  const csv = toCsv(rows);
  expect(csv.match(/\r\n/g)).toHaveLength(4);
  expect(csv).toContain('"Given 前提\nThen 結果"');
});

test('行が無くても BOM と見出しだけの CSV になる', () => {
  expect(toCsv([])).toBe('\uFEFF種別,ID,機能,状態,本文,手順,引用元,コメント(修正の依頼)\r\n');
});
