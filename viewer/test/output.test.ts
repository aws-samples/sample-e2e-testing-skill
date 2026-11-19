// output.ts が features/viewer/ を新しい出力に入れ替え、作業場所を残さず、古い作業場所だけを片づけることを確かめる。
// 移せない・消せないときは、fs の renameSync と rmSync を特定の呼び出しでだけ失敗させて、前回の出力が残ることとエラーの中身を確かめる
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, expect, test, vi } from 'vitest';
import { replaceOutput } from '../src/output';

const tempDirs: string[] = [];
afterEach(() => {
  // 一時ディレクトリを本物の rmSync で消すため、先に戻す
  vi.restoreAllMocks();
  for (const dir of tempDirs.splice(0)) fs.rmSync(dir, { recursive: true, force: true });
});

/** features/ だけを持つプロジェクトのルート */
function projectRoot(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'viewer-output-'));
  tempDirs.push(root);
  fs.mkdirSync(path.join(root, 'features'));
  return root;
}

function workDirs(root: string): string[] {
  return fs
    .readdirSync(path.join(root, 'features'))
    .filter((name) => name.startsWith('.viewer-'))
    .sort();
}

/** features/ の直下のディレクトリ name(既定は viewer)の、ファイル名 → 中身 */
function readOutput(root: string, name = 'viewer'): Record<string, string> {
  const dir = path.join(root, 'features', name);
  return Object.fromEntries(
    fs
      .readdirSync(dir)
      .sort()
      .map((name) => [name, fs.readFileSync(path.join(dir, name), 'utf8')]),
  );
}

test('features/viewer/ に渡したファイルだけを書き、作業場所を残さない', () => {
  const root = projectRoot();
  replaceOutput(root, { 'index.html': 'a', 'review.csv': 'b' });
  expect(readOutput(root)).toEqual({ 'index.html': 'a', 'review.csv': 'b' });
  expect(workDirs(root)).toEqual([]);
});

test('もう一度書くと、前回の出力が新しいものに替わる', () => {
  const root = projectRoot();
  replaceOutput(root, { 'index.html': 'a', 'review.csv': 'b', 'old.txt': 'c' });
  replaceOutput(root, { 'index.html': 'A', 'review.csv': 'B' });
  expect(readOutput(root)).toEqual({ 'index.html': 'A', 'review.csv': 'B' });
  expect(workDirs(root)).toEqual([]);
});

test('1 時間より古い作業場所だけを消す', () => {
  const root = projectRoot();
  const stale = path.join(root, 'features', '.viewer-stale');
  const fresh = path.join(root, 'features', '.viewer-fresh');
  fs.mkdirSync(stale);
  fs.mkdirSync(fresh);
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
  fs.utimesSync(stale, twoHoursAgo, twoHoursAgo);
  replaceOutput(root, { 'index.html': 'a', 'review.csv': 'b' });
  expect(workDirs(root)).toEqual(['.viewer-fresh']);
});

/** 失敗させた移動が投げるエラー。Windows でほかのアプリが中のファイルを開いているときのもの */
const BUSY = 'EBUSY: resource busy or locked';
const OLD_PREFIX = '.viewer-old-';

/** fs.renameSync を、移し元と移し先の名前(features/ の直下の名前)が when を満たす呼び出しでだけ失敗させる */
function failRename(when: (from: string, to: string) => boolean): void {
  const rename = fs.renameSync;
  vi.spyOn(fs, 'renameSync').mockImplementation((from, to) => {
    if (when(path.basename(String(from)), path.basename(String(to)))) throw new Error(BUSY);
    rename(from, to);
  });
}

/** fn が投げたエラーの message */
function messageThrownBy(fn: () => void): string {
  try {
    fn();
  } catch (e) {
    return e instanceof Error ? e.message : String(e);
  }
  throw new Error('エラーを投げなかった');
}

test('前回の features/viewer/ を退避先へ移せないと、書いた作業場所を消し、閉じてからビルドし直すよう案内して止まる', () => {
  const root = projectRoot();
  replaceOutput(root, { 'index.html': 'a', 'review.csv': 'b' });
  failRename((from) => from === 'viewer');
  expect(messageThrownBy(() => replaceOutput(root, { 'index.html': 'A', 'review.csv': 'B' }))).toBe(
    `features/viewer/ を入れ替えられない(${BUSY})。features/viewer/ の中のファイルを開いているアプリを閉じてから、ビルドし直す`,
  );
  expect(readOutput(root)).toEqual({ 'index.html': 'a', 'review.csv': 'b' });
  expect(workDirs(root)).toEqual([]);
});

test('退避した後に新しい出力を features/viewer/ へ移せないと、退避したものを戻し、作業場所を消して止まる', () => {
  const root = projectRoot();
  replaceOutput(root, { 'index.html': 'a', 'review.csv': 'b' });
  failRename((from, to) => to === 'viewer' && !from.startsWith(OLD_PREFIX));
  expect(messageThrownBy(() => replaceOutput(root, { 'index.html': 'A', 'review.csv': 'B' }))).toBe(`features/viewer/ を書けない(${BUSY})`);
  expect(readOutput(root)).toEqual({ 'index.html': 'a', 'review.csv': 'b' });
  expect(workDirs(root)).toEqual([]);
});

test('退避したものを戻すことにも失敗すると、エラーに退避先と今回の作業場所の両方のパスを書く', () => {
  const root = projectRoot();
  replaceOutput(root, { 'index.html': 'a', 'review.csv': 'b' });
  failRename((_from, to) => to === 'viewer');
  const message = messageThrownBy(() => replaceOutput(root, { 'index.html': 'A', 'review.csv': 'B' }));
  const olds = workDirs(root).filter((name) => name.startsWith(OLD_PREFIX));
  const works = workDirs(root).filter((name) => !name.startsWith(OLD_PREFIX));
  expect([olds.length, works.length]).toEqual([1, 1]);
  const [old] = olds;
  const [work] = works;
  expect(message).toBe(`features/viewer/ を書けない(${BUSY})。前回の出力は features/${old}/、今回の出力は features/${work}/ に残っている`);
  expect(readOutput(root, old)).toEqual({ 'index.html': 'a', 'review.csv': 'b' });
  expect(readOutput(root, work)).toEqual({ 'index.html': 'A', 'review.csv': 'B' });
  expect(fs.existsSync(path.join(root, 'features', 'viewer'))).toBe(false);
});

test('最後に退避先を消せなくても成功として終え、標準エラーに 1 行出す', () => {
  const root = projectRoot();
  replaceOutput(root, { 'index.html': 'a', 'review.csv': 'b' });
  const rm = fs.rmSync;
  vi.spyOn(fs, 'rmSync').mockImplementation((target, options) => {
    if (path.basename(String(target)).startsWith(OLD_PREFIX)) throw new Error('EPERM: operation not permitted');
    rm(target, options);
  });
  const stderr = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
  replaceOutput(root, { 'index.html': 'A', 'review.csv': 'B' });
  expect(readOutput(root)).toEqual({ 'index.html': 'A', 'review.csv': 'B' });
  // 消せなかった退避先だけが残る
  expect(workDirs(root)).toEqual([expect.stringMatching(/^\.viewer-old-/)]);
  const [old] = workDirs(root);
  expect(readOutput(root, old)).toEqual({ 'index.html': 'a', 'review.csv': 'b' });
  expect(stderr.mock.calls).toEqual([[`features/${old}/ を消せなかった(EPERM: operation not permitted)\n`]]);
});
