// E2E テスト仕様のビューアをビルドする。bundle.mts が照合ツールと依存ごと 1 ファイルにまとめ、スキルの viewer/build.mjs になる。
// プロジェクトのルートで `node <スキル>/viewer/build.mjs` として実行する。引数は取らない。
//   入力: 照合ツールが照合に読むもの(features/feature-map.json、features/*.feature、tests/e2e/**/*.spec.ts)と features/last-run.json
//   出力: features/viewer/(index.html と review.csv)。書き終えてから前回の出力と入れ替える
// 終了コード: 0 = 成功 / 1 = 失敗(投げたエラーの message だけを標準エラーに出す)
import process from 'node:process';
import { csvRows, toCsv } from './csv';
import { renderHtml } from './document';
import { replaceOutput } from './output';
import { loadViewerData, type RowKind } from './rows';

function main(): number {
  try {
    const root = process.cwd();
    const data = loadViewerData(root);
    replaceOutput(root, { 'index.html': renderHtml(data), 'review.csv': toCsv(csvRows(data)) });
    const items = data.features.flatMap((feature) => feature.items);
    const count = (kind: RowKind) => items.filter((item) => item.kind === kind).length;
    console.log(`features/viewer/ を更新した(機能 ${data.features.length}、要件 ${count('要件')}、シナリオ ${count('シナリオ')})`);
    return 0;
  } catch (e) {
    process.stderr.write(`${e instanceof Error ? e.message : String(e)}\n`);
    return 1;
  }
}

process.exitCode = main();
