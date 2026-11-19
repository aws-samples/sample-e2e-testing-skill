// コミットされた skills/e2e-testing/viewer/build.mjs を、fixture のプロジェクトのコピーで実行し、終了コードと出力を確かめる
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { csvRows, toCsv } from '../src/csv';
import { loadViewerData } from '../src/rows';

const BUILD_MJS = fileURLToPath(new URL('../../skills/e2e-testing/viewer/build.mjs', import.meta.url));
const TRACE_TOOL = fileURLToPath(new URL('../../skills/e2e-testing/scripts/e2e-trace.mts', import.meta.url));
const PROJECT = fileURLToPath(new URL('./fixtures/project', import.meta.url));
const STYLES = fs.readFileSync(fileURLToPath(new URL('../src/styles.css', import.meta.url)), 'utf8');
const FONT_FILE = fileURLToPath(
  new URL(
    '../node_modules/@fontsource-variable/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-normal.woff2',
    import.meta.url,
  ),
);
const SUCCESS_LINE = 'features/viewer/ を更新した(機能 4、要件 3、シナリオ 6)\n';

type Run = { projectDir: string; status: number | null; stdout: string; stderr: string };

/** 一時ディレクトリにプロジェクトを作り、prepare で中身を置いてから、そこをカレントディレクトリにして script を実行する */
function run(prepare: (projectDir: string) => void, script = BUILD_MJS, args: readonly string[] = []): Run {
  const projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'viewer-build-test-'));
  prepare(projectDir);
  const result = spawnSync(process.execPath, [script, ...args], { cwd: projectDir, encoding: 'utf8' });
  return { projectDir, status: result.status, stdout: result.stdout, stderr: result.stderr };
}

/** fixture のプロジェクトをコピーする */
function copyProject(projectDir: string): void {
  fs.cpSync(PROJECT, projectDir, { recursive: true });
}

function removeLastRun(projectDir: string): void {
  fs.rmSync(path.join(projectDir, 'features', 'last-run.json'));
}

/** features/ の直下に残った作業場所 */
function workDirs(projectDir: string): string[] {
  return fs.readdirSync(path.join(projectDir, 'features')).filter((name) => name.startsWith('.viewer-'));
}

/** HTML からタグを除いた文字列。要素で区切られた文(件数の中の fail など)を、続いた文として探すため */
function textOf(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/** 標準エラーの空でない行。Windows の改行でも同じ行にする */
function lines(text: string): string[] {
  return text.split(/\r?\n/).filter((line) => line !== '');
}

describe('fixture のプロジェクト', () => {
  let build: Run;
  let out: string;
  let html: string;

  beforeAll(() => {
    build = run(copyProject);
    out = path.join(build.projectDir, 'features', 'viewer');
    html = fs.readFileSync(path.join(out, 'index.html'), 'utf8');
  });
  afterAll(() => fs.rmSync(build.projectDir, { recursive: true, force: true }));

  test('終了コード 0 で、出力先と件数の 1 行だけを標準出力に出す', () => {
    expect(build.status, build.stderr).toBe(0);
    expect(build.stdout).toBe(SUCCESS_LINE);
    expect(build.stderr).toBe('');
  });

  test('features/viewer/ の中身は index.html と review.csv の 2 つだけで、作業場所が残らない', () => {
    expect(fs.readdirSync(out).sort()).toEqual(['index.html', 'review.csv']);
    expect(workDirs(build.projectDir)).toEqual([]);
  });

  test('review.csv が csv.ts の結果とバイト単位で一致する', () => {
    const expected = Buffer.from(toCsv(csvRows(loadViewerData(build.projectDir))), 'utf8');
    expect(fs.readFileSync(path.join(out, 'review.csv')).equals(expected)).toBe(true);
  });

  test('index.html は doctype で始まり、スクリプトは直接書いたモジュールでないもの 1 つだけで、外部のファイルへの参照が無い', () => {
    expect(html.startsWith('<!doctype html><html lang="ja">')).toBe(true);
    expect(html.match(/<!doctype/gi)).toHaveLength(1);
    expect(html.match(/<script/g)).toHaveLength(1);
    expect(html).toContain('<script>');
    expect(html).not.toContain('type="module"');
    expect(html).not.toContain('<link');
    expect(html).not.toContain('src=');
  });

  test('styles.css をそのまま <style> に埋め込む', () => {
    expect(html).toContain(`<style>${STYLES}</style>`);
  });

  test('ページの先頭に、機能・要件・シナリオの件数の 1 文がある', () => {
    expect(html).toContain('E2E テストの仕様。機能 4、要件 3、シナリオ 6。');
  });

  test('ページに、テストの結果の 1 文と、照合ツールの不整合の節と、候補の表がある', () => {
    const text = textOf(html);
    expect(text).toContain('最後の全体実行: 20261016-103000(2026-10-16T01:30:00.000Z)。pass 1、fail 2、既知バグ 1、未生成 1、未実行 1。');
    expect(text).toContain('照合ツールの不整合');
    expect(text).toContain('機能にするか決まっていないもの');
  });

  test('表の行ごとに改行する。<tr の開始タグはどれも改行の直後にある', () => {
    const rows = html.match(/<tr[\s>]/g) ?? [];
    expect(rows.length).toBeGreaterThan(0);
    expect(html.match(/\n<tr[\s>]/g)).toHaveLength(rows.length);
  });

  test('ページの外へのリンクは review.csv とテストファイルだけで、テストファイルへのリンクはコピーの中のファイルを指す', () => {
    const hrefs = [...html.matchAll(/href="([^"]*)"/g)].map((match) => match[1]).filter((href) => !href.startsWith('#'));
    const specs = hrefs.filter((href) => href !== 'review.csv');
    expect(hrefs).toContain('review.csv');
    expect(specs.length).toBeGreaterThan(0);
    for (const href of specs) {
      expect(href.startsWith('../../tests/e2e/'), href).toBe(true);
      expect(fs.existsSync(path.resolve(out, href)), `${href} のファイルが無い`).toBe(true);
    }
    expect(html).toContain('href="../../tests/e2e/login/REQ-001-1-valid-credentials.spec.ts"');
    expect(html).toContain('title="tests/e2e/login/REQ-001-1-valid-credentials.spec.ts"');
  });

  test('英字と数字の書体を、data: URL の @font-face として 1 つだけ埋め込む', () => {
    expect(html.match(/@font-face/g)).toHaveLength(1);
    // CSS の url() は書体の data: URL だけで、外のファイルを参照しない
    expect([...html.matchAll(/url\(\s*(["']?)([^"')]*)/g)].map((match) => match[2].slice(0, 5))).toEqual(['data:']);
    expect(html).toContain(`url("data:font/woff2;base64,${fs.readFileSync(FONT_FILE).toString('base64')}")`);
    expect(html).toContain('font-family: "Atkinson Hyperlegible Next";');
    // Biome が長い font-family を折り返すことがあるので、空白は正規表現で受ける
    expect(STYLES).toMatch(/font-family:\s*"Atkinson Hyperlegible Next",/);
  });

  test('@font-face の直前に、書体の名前・著作権・ライセンスのコメントがある', () => {
    expect(html).toMatch(
      /\/\*[^*]*Atkinson Hyperlegible Next[^*]*Copyright[^*]*SIL Open Font License 1\.1 https:\/\/openfontlicense\.org \*\/\n@font-face/,
    );
  });
});

describe('止める不整合', () => {
  let build: Run;

  beforeAll(() => {
    build = run((dir) => {
      copyProject(dir);
      const login = path.join(dir, 'features', 'login.feature');
      fs.writeFileSync(login, fs.readFileSync(login, 'utf8').replace('    @REQ-002-1\n', ''));
      fs.mkdirSync(path.join(dir, 'features', 'viewer'));
      fs.writeFileSync(path.join(dir, 'features', 'viewer', 'index.html'), '前回の出力');
    });
  });
  afterAll(() => fs.rmSync(build.projectDir, { recursive: true, force: true }));

  test('終了コード 1 で、標準出力は空、標準エラーに不整合の行を出す', () => {
    expect(build.status, build.stderr).toBe(1);
    expect(build.stdout).toBe('');
    expect(build.stderr).toContain('ID 未付与');
  });

  test('前回の出力を残し、作業場所を残さない', () => {
    expect(fs.readFileSync(path.join(build.projectDir, 'features', 'viewer', 'index.html'), 'utf8')).toBe('前回の出力');
    expect(workDirs(build.projectDir)).toEqual([]);
  });
});

describe('features/ を読めない', () => {
  let build: Run;

  beforeAll(() => {
    // features をディレクトリでなくファイルにすると、中の一覧を読むところで ENOTDIR になる
    build = run((dir) => fs.writeFileSync(path.join(dir, 'features'), ''));
  });
  afterAll(() => fs.rmSync(build.projectDir, { recursive: true, force: true }));

  test('終了コード 1 で、標準エラーに 1 行だけを出し、出力を作らない', () => {
    expect(build.status, build.stderr).toBe(1);
    expect(build.stdout).toBe('');
    expect(lines(build.stderr)).toHaveLength(1);
    expect(fs.existsSync(path.join(build.projectDir, 'features', 'viewer'))).toBe(false);
  });
});

describe('features/last-run.json との関わり', () => {
  const projectDirs: string[] = [];
  afterAll(() => {
    for (const dir of projectDirs) fs.rmSync(dir, { recursive: true, force: true });
  });
  /** run と同じで、終わった後に一時ディレクトリを消す */
  function runOnce(prepare: (projectDir: string) => void, script = BUILD_MJS, args: readonly string[] = []): Run {
    const result = run(prepare, script, args);
    projectDirs.push(result.projectDir);
    return result;
  }

  test('build.mjs に --run-id を付けても照合ツールの CLI は動かず、features/last-run.json を書かない', () => {
    const build = runOnce(
      (dir) => {
        copyProject(dir);
        removeLastRun(dir);
      },
      BUILD_MJS,
      ['--run-id', 'X'],
    );
    expect(build.status, build.stderr).toBe(0);
    expect(build.stdout).toBe(SUCCESS_LINE);
    expect(fs.existsSync(path.join(build.projectDir, 'features', 'last-run.json'))).toBe(false);
  });

  test('照合ツールが fixture の test-results/results.json から、fixture と同じ features/last-run.json を書く', () => {
    const trace = runOnce(
      (dir) => {
        copyProject(dir);
        removeLastRun(dir);
      },
      TRACE_TOOL,
      ['--run-id', '20261016-103000'],
    );
    const written = fs.readFileSync(path.join(trace.projectDir, 'features', 'last-run.json'));
    expect(written.equals(fs.readFileSync(path.join(PROJECT, 'features', 'last-run.json')))).toBe(true);
  });

  test('features/last-run.json が無ければ、テストの結果の 1 文に結果がまだ無いことを出す', () => {
    const build = runOnce((dir) => {
      copyProject(dir);
      removeLastRun(dir);
    });
    expect(build.status, build.stderr).toBe(0);
    const html = fs.readFileSync(path.join(build.projectDir, 'features', 'viewer', 'index.html'), 'utf8');
    expect(textOf(html)).toContain('全体実行の結果はまだありません。');
    expect(textOf(html)).not.toContain('最後の全体実行');
  });

  test('review.csv にテストの結果は入らない。features/last-run.json が無くても同じバイト列になる', () => {
    const withResults = runOnce(copyProject);
    const withoutResults = runOnce((dir) => {
      copyProject(dir);
      removeLastRun(dir);
    });
    expect(withResults.status, withResults.stderr).toBe(0);
    expect(withoutResults.status, withoutResults.stderr).toBe(0);
    const csvOf = ({ projectDir }: Run) => fs.readFileSync(path.join(projectDir, 'features', 'viewer', 'review.csv'));
    expect(csvOf(withResults).equals(csvOf(withoutResults))).toBe(true);
  });
});
