// ビューアのデータから、Excel でそのまま開けるレビュー用の CSV を作る。テストの結果は入れない
import type { Row, ViewerData } from './rows';

const HEADER = ['種別', 'ID', '機能', '状態', '本文', '手順', '引用元', 'コメント(修正の依頼)'];
/** Excel が UTF-8 と判定するための BOM。無いと日本語が化ける */
const BOM = '\uFEFF';
/** 行の区切り。セルの中の改行は LF なので、CRLF で分けたものがそのままレコードになる */
const RECORD_SEPARATOR = '\r\n';

/** カンマ、改行、`"` を含むセルは `"` で囲み、中の `"` は `""` にする */
function cell(value: string): string {
  return /[",\r\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

/** CSV の行。機能ごとに機能の行と要件・シナリオの行、その後ろに全部の候補の行 */
export function csvRows(data: ViewerData): Row[] {
  return [...data.features.flatMap((feature) => [feature.row, ...feature.items]), ...data.candidates.map((candidate) => candidate.row)];
}

/** 行の配列を CSV にする。先頭に BOM、行の区切りは CRLF(最後の行の後にも付ける)、セルの中の改行は LF のまま */
export function toCsv(rows: readonly Row[]): string {
  const records = [HEADER, ...rows.map((r) => [r.kind, r.id, r.feature, r.status, r.body, r.steps, r.source, ''])];
  return `${BOM}${records.map((record) => record.map(cell).join(',')).join(RECORD_SEPARATOR)}${RECORD_SEPARATOR}`;
}
