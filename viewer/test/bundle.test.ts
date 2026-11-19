// コミットされた build.mjs と THIRD-PARTY-LICENSES が古くないことを確かめる。今のソースとロックファイルから bundle.mts で一時ディレクトリに作り直し、バイト単位で比べる。
// ソースか依存を変えて `pnpm run bundle` を忘れると落ちる。
// あわせて、build.mjs の末尾のライセンスに、同梱した書体の OFL の全文があることと、
// index.html に埋め込む中身に <tr があれば bundle.mts が止まることを確かめる
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from 'vitest';
import { assertNoTableRowTag } from '../bundle.mts';

const BUNDLE_MTS = fileURLToPath(new URL('../bundle.mts', import.meta.url));
const BUILD_MJS = fileURLToPath(new URL('../../skills/e2e-testing/viewer/build.mjs', import.meta.url));
const THIRD_PARTY_LICENSES = fileURLToPath(new URL('../../THIRD-PARTY-LICENSES', import.meta.url));
/** esbuild でまとめるのに掛かる時間。手元では数秒だが、CI の遅いマシンでも収まる長さにする */
const BUNDLE_TIMEOUT_MS = 60_000;

test(
  'コミットされた build.mjs と THIRD-PARTY-LICENSES が、bundle.mts で作り直したものとバイト単位で一致する',
  () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'viewer-bundle-test-'));
    try {
      const outfile = path.join(dir, 'build.mjs');
      const noticesFile = path.join(dir, 'THIRD-PARTY-LICENSES');
      const result = spawnSync(process.execPath, [BUNDLE_MTS, outfile, noticesFile], { encoding: 'utf8' });
      expect(result.status, result.stderr).toBe(0);
      // 1 MB を超えるので、差分を出させずに一致だけを見る
      const same = fs.readFileSync(outfile).equals(fs.readFileSync(BUILD_MJS));
      expect(same, 'build.mjs が今のソースから作ったものと違う。viewer で `pnpm run bundle` を実行して作り直す').toBe(true);
      expect(
        fs.readFileSync(noticesFile, 'utf8'),
        'THIRD-PARTY-LICENSES が今の依存から作ったものと違う。viewer で `pnpm run bundle` を実行して作り直す',
      ).toBe(fs.readFileSync(THIRD_PARTY_LICENSES, 'utf8'));
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  },
  BUNDLE_TIMEOUT_MS,
);

test('build.mjs の末尾のライセンスに、同梱した書体の OFL の全文がある', () => {
  const text = fs.readFileSync(BUILD_MJS, 'utf8');
  const licenses = text.slice(text.indexOf('// このファイルに取り込んだパッケージのライセンス'));
  expect(licenses).toContain('// @fontsource-variable/atkinson-hyperlegible-next@5.3.0(OFL-1.1)');
  expect(licenses).toContain('// SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007');
});

test('THIRD-PARTY-LICENSES に、取り込んだ全パッケージの名前と版と、OFL の全文がある', () => {
  const text = fs.readFileSync(THIRD_PARTY_LICENSES, 'utf8');
  for (const entry of [
    '@cucumber/gherkin@42.0.1(MIT)',
    '@cucumber/messages@34.2.1(MIT)',
    '@fontsource-variable/atkinson-hyperlegible-next@5.3.0(OFL-1.1)',
    'react@19.3.1(MIT)',
    'react-dom@19.3.1(MIT)',
  ])
    expect(text).toContain(`\n${entry}\n`);
  expect(text).toContain('SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007');
});

test('埋め込む中身に <tr があると、名前を入れたエラーで止まる', () => {
  expect(() => assertNoTableRowTag('src/styles.css', 'td::before { content: "<tr>"; }')).toThrow(
    'src/styles.css に <tr がある。index.html の行ごとの改行が <style> か <script> の中に入る',
  );
});

test('埋め込む中身に <tr が無ければ止まらない', () => {
  expect(() => assertNoTableRowTag('src/styles.css', 'tr > td { padding: 0; }')).not.toThrow();
});
