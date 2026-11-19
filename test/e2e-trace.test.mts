// 照合ツール e2e-trace のテスト
//
// フィクスチャ(test/fixtures/<ケース>/)を一時ディレクトリにコピーし、ツールを CLI 越しに実行して
// 標準出力・標準エラー・終了コード・features/last-run.json を検査する。CLI 越しの検査に加え、export する関数を import して検査する。

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { after, test } from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  deriveResults,
  inspect,
  resultsFromPlaywright,
  type ScenarioOutcome,
  TRACE_TOOL_VERSION,
} from '../skills/e2e-testing/scripts/e2e-trace.mts';

// ---- 共通手順 ----

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const TOOL_PATH = path.resolve(TEST_DIR, '../skills/e2e-testing/scripts/e2e-trace.mts');
const FIXTURES_DIR = path.join(TEST_DIR, 'fixtures');

interface RunResult {
  /** フィクスチャをコピーした一時ディレクトリ(ツールのカレントディレクトリ) */
  dir: string;
  stdout: string;
  stderr: string;
  status: number | null;
}

const tempDirs: string[] = [];

after(() => {
  for (const dir of tempDirs) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

/** フィクスチャを一時ディレクトリへ再帰コピーして、そのパスを返す */
function copyFixture(name: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'e2e-trace-'));
  tempDirs.push(dir);
  fs.cpSync(path.join(FIXTURES_DIR, name), dir, { recursive: true });
  return dir;
}

/** 既存のディレクトリをカレントディレクトリにしてツールを実行する(同じコピー上で繰り返し実行する性質テスト向け) */
function runToolIn(dir: string, args: readonly string[] = []): RunResult {
  const result = spawnSync(process.execPath, [TOOL_PATH, ...args], { cwd: dir, encoding: 'utf8' });
  if (result.error) throw result.error;
  return { dir, stdout: result.stdout, stderr: result.stderr, status: result.status };
}

/** フィクスチャのコピー上でツールを実行する */
function runTool(fixture: string, args: readonly string[] = []): RunResult {
  return runToolIn(copyFixture(fixture), args);
}

/** コピー上のファイル(POSIX 相対パス)を書き換える。書き換えが実際に内容を変えたことも確かめる */
function editFile(dir: string, relPosixPath: string, edit: (text: string) => string): void {
  const file = path.join(dir, ...relPosixPath.split('/'));
  const original = fs.readFileSync(file, 'utf8');
  const edited = edit(original);
  assert.notEqual(edited, original, `${relPosixPath} の書き換えが内容を変えていない`);
  fs.writeFileSync(file, edited, 'utf8');
}

/** results.json の中でテストが書き換える欄。Playwright の JSON reporter の形のうち、ツールが読む箇所に限る */
interface ResultsTest {
  expectedStatus: string;
  status: string;
  annotations: { type: string; description?: string }[];
}
interface ResultsSpec {
  title: string;
  tags: string[];
  tests: ResultsTest[];
}
interface ResultsSuite {
  specs?: ResultsSpec[];
  suites?: ResultsSuite[];
}
interface ResultsJson {
  stats?: Record<string, unknown>;
  suites: ResultsSuite[];
}

/** 実行ディレクトリからの results.json の相対パス */
const RESULTS_PATH = path.join('test-results', 'results.json');

/** コピー上の results.json を読み、加工して書き戻す */
function editResults(dir: string, edit: (results: ResultsJson) => void): void {
  editFile(dir, 'test-results/results.json', (text) => {
    const results = JSON.parse(text) as ResultsJson;
    edit(results);
    return JSON.stringify(results, null, 2);
  });
}

/** results.json の全 spec(suites を再帰的に辿る。出現順) */
function allSpecs(results: ResultsJson): ResultsSpec[] {
  const out: ResultsSpec[] = [];
  const walk = (suites: readonly ResultsSuite[]): void => {
    for (const suite of suites) {
      out.push(...(suite.specs ?? []));
      walk(suite.suites ?? []);
    }
  };
  walk(results.suites);
  return out;
}

/** title が完全一致する spec(ちょうど 1 つ) */
function specTitled(results: ResultsJson, title: string): ResultsSpec {
  const found = allSpecs(results).filter((spec) => spec.title === title);
  assert.equal(found.length, 1, `title「${title}」の spec がちょうど 1 つでない(${found.length} 件)`);
  return found[0];
}

/** spec の全 test を「期待どおり失敗した既知バグ」にする。description が null なら issue アノテーション無し */
function markKnownBug(spec: ResultsSpec, description: string | null): void {
  for (const test of spec.tests) {
    test.expectedStatus = 'failed';
    test.status = 'expected';
    test.annotations = description === null ? [{ type: 'fail' }] : [{ type: 'fail' }, { type: 'issue', description }];
  }
}

/**
 * 性質テスト(Property 1〜12)の対象フィクスチャ(design Testing Strategy)。
 * `broken-results` は終了コード 2 で中断し出力の契約が無いので含めない
 */
const PROPERTY_FIXTURES: readonly string[] = ['consistent', 'inconsistent', 'no-results', 'empty'];

/** フィクスチャが test-results/results.json を持つか。--run-id は results.json が無いと終了コード 2 になる */
function hasResults(fixture: string): boolean {
  return fs.existsSync(path.join(FIXTURES_DIR, fixture, RESULTS_PATH));
}

// ---- フィクスチャの期待値(人が書いた基準。ツールの正規表現を再実装せずに出力を検査する) ----

interface Location {
  path: string;
  line: number;
}
interface ExpectedMissingId extends Location {
  reason: string;
  feature: string;
  name: string;
}
/** テストファイル内の 1 つの test 宣言と、その分類 */
interface ExpectedTest extends Location {
  name: string;
  /** 機能欄に出るべき値(slug と同名の .feature の Feature 名。無ければ slug。`tests/e2e/` 直下のファイルで slug が無ければ `—`) */
  feature: string;
  nameId: string | null;
  tagIds: string[];
  classification: 'bound' | 'orphan' | 'mismatch' | 'unknown';
  /** 結合先のシナリオ ID(bound のときだけ) */
  boundTo?: string;
}
interface ExpectedDuplicateId {
  id: string;
  source: 'scenario' | 'rule' | 'spec';
  feature: string;
  /** 対象欄に並ぶ場所(`<パス> L<行>` または `<パス>`)。出力順 */
  places: string[];
}
interface ExpectedUngenerated {
  requirements: (Location & { id: string; feature: string })[];
  scenarios: (Location & { id: string; name: string; feature: string })[];
}
/** 名前の先頭に要件 ID が無い Rule(ID 未付与) */
interface ExpectedMissingRuleId extends Location {
  name: string;
  feature: string;
}
interface Expected {
  missingIds: ExpectedMissingId[];
  /** ID 未付与の Rule。無ければ 0 件 */
  missingRuleIds?: ExpectedMissingRuleId[];
  /** feature-map に頼る 3 種(feature-map に無い .feature、.feature の無い機能、slug の重なり)の行。出力順 */
  featureMapRows?: InconsistencyRow[];
  tests: ExpectedTest[];
  duplicateIds: ExpectedDuplicateId[];
  ungenerated: ExpectedUngenerated;
  /** results.json の `stats.startTime`。results.json を持たないフィクスチャは null(results.json を扱うフィクスチャだけが持つ) */
  resultsStartTime?: string | null;
  /** 有効なシナリオ ID → scenarioTable の最新結果の表示(results.json を扱うフィクスチャだけが持つ) */
  latestResults?: Record<string, string>;
}

function readExpected(fixture: string): Expected {
  return JSON.parse(fs.readFileSync(path.join(FIXTURES_DIR, fixture, 'expected.json'), 'utf8')) as Expected;
}

/** パス → 行番号の順(design 1.7 の同種別内の並び順) */
function compareLocation(a: Location, b: Location): number {
  return a.path === b.path ? a.line - b.line : a.path < b.path ? -1 : 1;
}

// ---- 出力の読み取り ----

/** 標準出力の 1 行目 `実行ID: <値> / 結果: <値>` */
const HEADER_RE = /^実行ID: (.+) \/ 結果: (.+)$/;
/** 標準出力の最終行 */
const STDOUT_FINAL_LINE_RE = /^(?:書き出し: features\/last-run\.json|書き出しなし)$/;

/** 標準出力の 1 行目を実行 ID と結果に分ける */
function headerOf(stdout: string): { runId: string; startTime: string } {
  const m = HEADER_RE.exec(stdout.split('\n')[0]);
  assert.ok(m, `1 行目が「実行ID: … / 結果: …」の形でない:\n${stdout}`);
  return { runId: m[1], startTime: m[2] };
}

/**
 * 標準出力から `## <見出し>` 節の行(見出し行の次から、次の `## ` 見出しまたは標準出力の最終行の直前まで)を取り出す。
 * 節の前後の空行も含めるので、同じ節を 2 つの実行の標準出力から切り出して文字列比較できる
 */
function sectionLines(text: string, heading: string): string[] {
  const lines = text.split('\n');
  const start = lines.indexOf(`## ${heading}`);
  assert.notEqual(start, -1, `節「## ${heading}」が見つからない:\n${text}`);
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((line) => line.startsWith('## ') || STDOUT_FINAL_LINE_RE.test(line));
  return end === -1 ? rest : rest.slice(0, end);
}

/** 標準出力の最終行(末尾の改行を除いた最後の行) */
function finalLine(stdout: string): string {
  return stdout.trimEnd().split('\n').at(-1) ?? '';
}

/** 標準出力から最終行(書き出しの有無を示す行)を除いたもの。書き出しに失敗した実行の標準出力と比べるときに使う */
function withoutFinalLine(stdout: string): string {
  const lines = stdout.trimEnd().split('\n');
  assert.match(lines.at(-1) ?? '', STDOUT_FINAL_LINE_RE, `最終行が書き出しの有無を示す行でない:\n${stdout}`);
  return lines.slice(0, -1).join('\n');
}

/** 標準出力から 1 行目と最終行を除いたもの。引数なしと --run-id の実行を比べるときに使う */
function withoutHeaderAndFinalLine(stdout: string): string {
  headerOf(stdout);
  return withoutFinalLine(stdout).split('\n').slice(1).join('\n');
}

/** Markdown 表の本体行(ヘッダ行と区切り行を除く)をセルの配列に分解する。表が無ければ空配列 */
function tableRows(lines: readonly string[]): string[][] {
  return lines
    .filter((line) => line.startsWith('|'))
    .slice(2)
    .map((line) =>
      line
        .slice(1, -1)
        .split('|')
        .map((cell) => cell.trim()),
    );
}

/** `## 集計` の表の本体行(合計の行を含む)のセル */
function summaryRows(stdout: string): string[][] {
  return tableRows(sectionLines(stdout, '集計'));
}

/** `状態と結果の食い違い:` の後の `- ` で始まる行の中身。`状態と結果の食い違い: なし` なら空 */
function mismatchLines(stdout: string): string[] {
  const lines = sectionLines(stdout, '集計');
  if (lines.includes('状態と結果の食い違い: なし')) return [];
  const start = lines.indexOf('状態と結果の食い違い:');
  assert.notEqual(start, -1, `状態と結果の食い違いの行が無い:\n${stdout}`);
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((line) => !line.startsWith('- '));
  return (end === -1 ? rest : rest.slice(0, end)).map((line) => line.slice(2));
}

/** 書き出される features/last-run.json のパス(実行ディレクトリからの相対) */
const LAST_RUN_PATH = path.join('features', 'last-run.json');

/** features/last-run.json の形(テストが読む欄) */
interface LastRun {
  runId: string;
  startTime?: string;
  scenarios: Record<string, { result: string; reason?: string }>;
}

function lastRunExists(dir: string): boolean {
  return fs.existsSync(path.join(dir, LAST_RUN_PATH));
}

/** 書き出された features/last-run.json のバイト列 */
function lastRunBytes(dir: string): Buffer {
  return fs.readFileSync(path.join(dir, LAST_RUN_PATH));
}

function readLastRun(dir: string): LastRun {
  return JSON.parse(lastRunBytes(dir).toString('utf8')) as LastRun;
}

/** 実行前に features/last-run.json を置く(`features/` が無ければ作る)。ツールが全体置き換えすること、引数なしで変えないことの検証に使う */
function writeLastRun(dir: string, text: string): void {
  fs.mkdirSync(path.join(dir, 'features'), { recursive: true });
  fs.writeFileSync(path.join(dir, LAST_RUN_PATH), text, 'utf8');
}

/** 2 つのバイト列が同じこと。違えば両方を文字列で示す */
function assertSameBytes(actual: Buffer, expected: Buffer, message: string): void {
  assert.ok(actual.equals(expected), `${message}\n--- 実際\n${actual.toString('utf8')}\n--- 期待\n${expected.toString('utf8')}`);
}

/** 1 シナリオ 1 行の表。ツールの関数で、コピーの中の入力から作る */
interface ScenarioRow {
  /** シナリオ ID。ID 未付与なら `—` */
  id: string;
  name: string;
  /** テストファイル。複数なら ` / ` 区切り、無ければ `—` */
  specFiles: string;
  latestResult: string;
}

function scenarioTable(dir: string): ScenarioRow[] {
  const inspection = inspect(dir);
  const file = path.join(dir, RESULTS_PATH);
  const results = fs.existsSync(file) ? resultsFromPlaywright(JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''))) : {};
  const derived = deriveResults(inspection, results);
  return inspection.features.flatMap((feature) =>
    feature.scenarios.map((scenario) => {
      const id = scenario.idJudgment.kind === 'valid' ? scenario.idJudgment.id : '—';
      const paths = id === '—' ? [] : (inspection.boundSpecPaths.get(id) ?? []);
      const outcome = derived.scenarios.get(scenario);
      assert.ok(outcome, `最新結果の無いシナリオ: ${feature.path} L${scenario.line}`);
      return {
        id,
        name: scenario.displayName,
        specFiles: paths.length > 0 ? paths.join(' / ') : '—',
        latestResult: formatOutcome(outcome),
      };
    }),
  );
}

/** 最新結果の表示: pass / fail / fail(<理由>) / 既知バグ(<理由。無ければ 理由なし>) / 未生成 / 未実行 */
function formatOutcome({ outcome, reason }: ScenarioOutcome): string {
  if (outcome === 'fail') return reason === null ? 'fail' : `fail(${reason})`;
  if (outcome === '既知バグ') return `既知バグ(${reason ?? '理由なし'})`;
  return outcome;
}

/** scenarioTable からシナリオ ID の行を取る(ちょうど 1 行あること) */
function scenarioRow(dir: string, id: string): ScenarioRow {
  const rows = scenarioTable(dir);
  const found = rows.filter((row) => row.id === id);
  assert.equal(found.length, 1, `${id} の行がちょうど 1 行でない(${found.length} 行):\n${JSON.stringify(rows, null, 2)}`);
  return found[0];
}

/** 要件 ID を持つ Rule ごとの、配下の ScenarioRow。同じ要件 ID の Rule が 2 つあれば 2 要素 */
function ruleTable(dir: string): { id: string; rows: ScenarioRow[] }[] {
  const rows = scenarioTable(dir);
  let index = 0;
  const result: { id: string; rows: ScenarioRow[] }[] = [];
  for (const feature of inspect(dir).features) {
    // scenarioTable と同じ順(.feature のパス順 → 行順)なので、Scenario ごとに 1 つずつ進めて対応させる
    const byScenario = new Map(feature.scenarios.map((scenario) => [scenario, rows[index++]]));
    for (const rule of feature.rules) {
      if (rule.requirementId === null) continue;
      const under = feature.scenarios.filter((s) => s.rule === rule).map((s) => byScenario.get(s));
      result.push({ id: rule.requirementId, rows: under.filter((row): row is ScenarioRow => row !== undefined) });
    }
  }
  return result;
}

/** 不整合の種別(design 1.7 の表の順の後ろに feature-map の検査の 4 種。不整合節の並び順でもある) */
const INCONSISTENCY_KINDS: readonly string[] = [
  '未生成',
  '孤立テスト',
  '不明 ID 参照',
  'ID 不一致',
  '重複 ID',
  'ID 未付与',
  'feature-map の形式',
  'feature-map に無い .feature',
  '.feature の無い機能',
  'slug の重なり',
];
/** feature-map に頼る 3 種。feature-map の形式に誤りがあるときは出ない */
const FEATURE_MAP_DEPENDENT_KINDS: readonly string[] = ['feature-map に無い .feature', '.feature の無い機能', 'slug の重なり'];

/** 不整合節の 1 行 */
interface InconsistencyRow {
  kind: string;
  feature: string;
  target: string;
}

function inconsistencyRows(stdout: string): InconsistencyRow[] {
  return tableRows(sectionLines(stdout, '不整合')).map((cells) => {
    assert.equal(cells.length, 3, `列数が違う: ${JSON.stringify(cells)}`);
    const [kind, feature, target] = cells;
    return { kind, feature, target };
  });
}

/** 対象欄の書式(design 1.7) */
const UNGENERATED_REQUIREMENT_TARGET_RE = /^(REQ-\d+)\(配下のシナリオにテストが無い\)$/;
const UNGENERATED_SCENARIO_TARGET_RE = /^(REQ-\d+-\d+) (.+)$/;
const ORPHAN_TARGET_RE = /^tests\/e2e\/\S+\.spec\.ts L\d+ test「.+」$/;
const UNKNOWN_ID_TARGET_RE = /^tests\/e2e\/\S+\.spec\.ts L\d+ REQ-\d+-\d+$/;
const MISMATCH_TARGET_RE = /^tests\/e2e\/\S+\.spec\.ts L\d+ 名前: (REQ-\d+-\d+|—) \/ tag: ((?:REQ-\d+-\d+)(?:, REQ-\d+-\d+)*|—)$/;
const DUPLICATE_TARGET_RE = /^(REQ-\d+(?:-\d+)?): (.+, .+)$/;
const MISSING_ID_TARGET_RE =
  /^(features\/[a-z-]+\.feature) L(\d+) Scenario「(.+)」\((タグ無し|名前先頭に ID 無し|タグと名前の ID が異なる|タグの ID が複数|Rule 外|Rule に要件 ID 無し|要件番号が Rule と異なる)\)$/;
const MISSING_RULE_ID_TARGET_RE = /^(features\/[a-z-]+\.feature) L(\d+) Rule「(.*)」\(名前先頭に要件 ID 無し\)$/;

/** 対象欄に最初に現れるパスと、その直後の行番号(無ければ 0)。パスを含まない対象欄(未生成)なら null */
const TARGET_LOCATION_RE = /(features\/\S+\.feature|tests\/e2e\/\S+\.spec\.ts)(?: L(\d+))?/;
function locationOf(target: string): Location | null {
  const m = TARGET_LOCATION_RE.exec(target);
  return m ? { path: m[1], line: m[2] === undefined ? 0 : Number(m[2]) } : null;
}

// ---- 引数 ----

test('引数: --check は未知の引数 → 終了コード 2 と標準エラーに使い方', () => {
  const r = runTool('empty', ['--check']);
  assert.equal(r.status, 2);
  assert.match(r.stderr, /使い方/);
});

test('引数: 未知の引数 → 終了コード 2 と標準エラーに使い方', () => {
  const r = runTool('empty', ['--bogus']);
  assert.equal(r.status, 2);
  assert.match(r.stderr, /使い方/);
});

test('引数: --run-id の値無し → 終了コード 2', () => {
  const r = runTool('empty', ['--run-id']);
  assert.equal(r.status, 2);
  assert.match(r.stderr, /使い方/);
});

// ---- consistent ----

test('consistent: 不整合節が なし、終了コード 0', () => {
  const r = runTool('consistent');
  assert.equal(r.status, 0, r.stderr);
  const lines = sectionLines(r.stdout, '不整合');
  assert.ok(lines.includes('なし'), r.stdout);
  assert.equal(tableRows(lines).length, 0);

  // 期待値側も不整合 0 件で、全 test 宣言が結合済み
  const expected = readExpected('consistent');
  assert.deepEqual(expected.missingIds, []);
  assert.deepEqual(expected.duplicateIds, []);
  assert.deepEqual(expected.ungenerated, { requirements: [], scenarios: [] });
  assert.ok(expected.tests.length > 0);
  assert.ok(expected.tests.every((t) => t.classification === 'bound' && t.boundTo === t.nameId));
});

test('consistent: 引数なしは検査だけ。1 行目は 実行ID: — と結果の開始日時、最終行は 書き出しなし、features/last-run.json を作らない', () => {
  const r = runTool('consistent');
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stdout.split('\n')[0], `実行ID: — / 結果: ${readExpected('consistent').resultsStartTime}`);
  assert.equal(finalLine(r.stdout), '書き出しなし');
  assert.equal(lastRunExists(r.dir), false, '引数なしなのに features/last-run.json が作られた');
});

test('consistent: --run-id で書いた features/last-run.json が expected-last-run.json とバイト単位で一致し、1 行目に実行 ID、最終行が 書き出し:、ほかは引数なしと同じ', () => {
  const runId = '20260927-201200';
  const r = runTool('consistent', ['--run-id', runId]);
  assert.equal(r.status, 0, r.stderr);
  assert.ok(lastRunExists(r.dir), 'features/last-run.json が書かれていない');
  assertSameBytes(
    lastRunBytes(r.dir),
    fs.readFileSync(path.join(FIXTURES_DIR, 'consistent', 'expected-last-run.json')),
    'features/last-run.json が expected-last-run.json と違う',
  );

  assert.equal(r.stdout.split('\n')[0], `実行ID: ${runId} / 結果: ${readExpected('consistent').resultsStartTime}`);
  assert.ok(sectionLines(r.stdout, '不整合').includes('なし'), r.stdout);
  assert.equal(finalLine(r.stdout), '書き出し: features/last-run.json');

  const plain = runTool('consistent');
  assert.equal(withoutHeaderAndFinalLine(r.stdout), withoutHeaderAndFinalLine(plain.stdout));
});

test('consistent: 集計の表は feature-map の機能の順で状態の列があり、.feature の無い 未着手 と 対象外 の機能は件数 0 の行', () => {
  const r = runTool('consistent');
  assert.equal(r.status, 0, r.stderr);
  const rows = summaryRows(r.stdout);
  assert.deepEqual(
    rows.map((cells) => cells.slice(0, 2)),
    [
      ['商品検索', '定義済み'],
      ['ログイン', 'テスト済み'],
      ['お知らせ', '未着手'],
      ['メディア・ファイル', '対象外'],
      ['合計', '—'],
    ],
  );
  for (const cells of rows.slice(2, 4)) assert.deepEqual(cells.slice(2), Array(8).fill('0'), `${cells[0]} の件数が 0 でない`);
});

test('consistent: 状態と結果の食い違いは テスト済み の機能の fail を書き(未実行と 0 の 未生成 は書かない)、終了コードに影響しない', () => {
  const r = runTool('consistent');
  assert.equal(r.status, 0, r.stderr);
  assert.deepEqual(mismatchLines(r.stdout), ['ログイン: テスト済み なのに fail 1']);
});

// ---- inconsistent ----

test('inconsistent: feature-map の形式 を除く 9 種すべての行があり、種別順 → パス → 行番号に並び、終了コード 1', () => {
  const r = runTool('inconsistent');
  assert.equal(r.status, 1, r.stderr);
  const rows = inconsistencyRows(r.stdout);
  assert.deepEqual(
    new Set(rows.map((row) => row.kind)),
    new Set(INCONSISTENCY_KINDS.filter((kind) => kind !== 'feature-map の形式')),
    r.stdout,
  );

  for (let i = 1; i < rows.length; i++) {
    const prev = rows[i - 1];
    const cur = rows[i];
    const kindDiff = INCONSISTENCY_KINDS.indexOf(cur.kind) - INCONSISTENCY_KINDS.indexOf(prev.kind);
    assert.ok(kindDiff >= 0, `種別の順が違う: ${prev.kind} の次に ${cur.kind}`);
    if (kindDiff !== 0) continue;
    // 同種別内はパス → 行番号(対象欄にパスを含まない未生成は、未生成のテストで期待値の順と比較する)
    const a = locationOf(prev.target);
    const b = locationOf(cur.target);
    if (a && b) assert.ok(compareLocation(a, b) <= 0, `同種別内の並び順が違う: ${prev.target} の次に ${cur.target}`);
  }
});

test('inconsistent: 未生成 の行が期待する要件・シナリオと一致し(パス → 行番号順)、対象欄の書式が design 1.7 のとおり', () => {
  const r = runTool('inconsistent');
  const rows = inconsistencyRows(r.stdout).filter((row) => row.kind === '未生成');

  type UngeneratedRow = { id: string; feature: string; name?: string };
  const actual: UngeneratedRow[] = rows.map(({ feature, target }) => {
    const req = UNGENERATED_REQUIREMENT_TARGET_RE.exec(target);
    if (req) return { id: req[1], feature };
    const sc = UNGENERATED_SCENARIO_TARGET_RE.exec(target);
    assert.ok(sc, `対象欄の書式が違う: ${target}`);
    return { id: sc[1], feature, name: sc[2] };
  });

  const expected = readExpected('inconsistent').ungenerated;
  const expectedRows: UngeneratedRow[] = [
    ...expected.requirements.map((e) => ({ location: e, row: { id: e.id, feature: e.feature } })),
    ...expected.scenarios.map((e) => ({ location: e, row: { id: e.id, feature: e.feature, name: e.name } })),
  ]
    .sort((a, b) => compareLocation(a.location, b.location))
    .map((e) => e.row);
  assert.deepEqual(actual, expectedRows);
  // 要件(配下 0 件の Rule と、配下にテストが無い Rule)とシナリオの両方が含まれる
  assert.ok(expected.requirements.length > 0 && expected.scenarios.length > 0);
});

test('inconsistent: 孤立テスト / 不明 ID 参照 / ID 不一致 の行が期待する test 宣言と 1 対 1 に対応し、対象欄の書式が design 1.7 のとおり', () => {
  const r = runTool('inconsistent');
  const formats: Record<string, RegExp> = {
    孤立テスト: ORPHAN_TARGET_RE,
    '不明 ID 参照': UNKNOWN_ID_TARGET_RE,
    'ID 不一致': MISMATCH_TARGET_RE,
  };
  const rows = inconsistencyRows(r.stdout).filter((row) => row.kind in formats);
  for (const { kind, target } of rows) {
    assert.match(target, formats[kind], `${kind} の対象欄の書式が違う`);
  }

  // 期待値の test 宣言(結合済み以外)から design 1.7 の書式で行を組み立て、集合として一致することを確認する
  const expectedRows: InconsistencyRow[] = [];
  for (const t of readExpected('inconsistent').tests) {
    const where = `${t.path} L${t.line}`;
    switch (t.classification) {
      case 'bound':
        break;
      case 'orphan':
        expectedRows.push({ kind: '孤立テスト', feature: t.feature, target: `${where} test「${t.name}」` });
        break;
      case 'unknown':
        expectedRows.push({ kind: '不明 ID 参照', feature: t.feature, target: `${where} ${t.nameId}` });
        break;
      case 'mismatch': {
        const tag = t.tagIds.length > 0 ? t.tagIds.join(', ') : '—';
        expectedRows.push({ kind: 'ID 不一致', feature: t.feature, target: `${where} 名前: ${t.nameId ?? '—'} / tag: ${tag}` });
        break;
      }
    }
  }
  const byTarget = (a: InconsistencyRow, b: InconsistencyRow) => (a.target < b.target ? -1 : a.target > b.target ? 1 : 0);
  assert.deepEqual([...rows].sort(byTarget), expectedRows.sort(byTarget));

  // ID 不一致の 4 パターン(名前のみ / tag のみ / 両方あるが異なる / tag が 2 つ)がそれぞれある
  const mismatchTails = rows.filter((row) => row.kind === 'ID 不一致').map((row) => row.target.replace(/^.* L\d+ /, ''));
  assert.deepEqual(
    new Set(mismatchTails),
    new Set([
      '名前: REQ-001-2 / tag: —',
      '名前: — / tag: REQ-001-2',
      '名前: REQ-001-2 / tag: REQ-001-3',
      '名前: REQ-001-2 / tag: REQ-001-2, REQ-001-3',
    ]),
  );

  // 対応する .feature が無い slug(cart)のテストは、機能欄に slug がそのまま出る
  const cartRows = rows.filter((row) => row.target.startsWith('tests/e2e/cart/'));
  assert.equal(cartRows.length, 1);
  assert.equal(cartRows[0].kind, '孤立テスト');
  assert.equal(cartRows[0].feature, 'cart');

  // tests/e2e/ 直下のテスト(slug 無し)は、機能欄が —
  const strayRows = rows.filter((row) => row.target.startsWith('tests/e2e/stray.spec.ts '));
  assert.equal(strayRows.length, 1);
  assert.equal(strayRows[0].kind, '孤立テスト');
  assert.equal(strayRows[0].feature, '—');
});

test('inconsistent: 重複 ID の 3 つの出どころ(Scenario / Rule / テストファイル)が期待と一致し、対象欄の書式が design 1.7 のとおり', () => {
  const r = runTool('inconsistent');
  const rows = inconsistencyRows(r.stdout).filter((row) => row.kind === '重複 ID');
  const actual = rows.map(({ feature, target }) => {
    const m = DUPLICATE_TARGET_RE.exec(target);
    assert.ok(m, `対象欄の書式が違う: ${target}`);
    return { id: m[1], feature, places: m[2].split(', ') };
  });

  const expected = readExpected('inconsistent').duplicateIds;
  assert.deepEqual(new Set(expected.map((d) => d.source)), new Set(['scenario', 'rule', 'spec']));
  const byId = (a: { id: string }, b: { id: string }) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  assert.deepEqual([...actual].sort(byId), expected.map(({ id, feature, places }) => ({ id, feature, places })).sort(byId));
});

test('inconsistent: ID 未付与は Scenario の 7 理由がそれぞれ 1 行と Rule が 1 行、対象欄の書式、パス → 行番号順', () => {
  const r = runTool('inconsistent');
  const rows = inconsistencyRows(r.stdout).filter((row) => row.kind === 'ID 未付与');
  assert.equal(rows.length, 8, r.stdout);

  const scenarios: ExpectedMissingId[] = [];
  const rules: ExpectedMissingRuleId[] = [];
  const locations: Location[] = [];
  for (const { feature, target } of rows) {
    const rule = MISSING_RULE_ID_TARGET_RE.exec(target);
    if (rule) {
      rules.push({ path: rule[1], line: Number(rule[2]), name: rule[3], feature });
      locations.push({ path: rule[1], line: Number(rule[2]) });
      continue;
    }
    const m = MISSING_ID_TARGET_RE.exec(target);
    assert.ok(m, `対象欄の書式が違う: ${target}`);
    scenarios.push({ path: m[1], line: Number(m[2]), name: m[3], reason: m[4], feature });
    locations.push({ path: m[1], line: Number(m[2]) });
  }

  // expected.json と集合として一致する(並び順に依存しない比較)
  const expected = readExpected('inconsistent');
  assert.deepEqual([...scenarios].sort(compareLocation), [...expected.missingIds].sort(compareLocation));
  assert.deepEqual([...rules].sort(compareLocation), [...(expected.missingRuleIds ?? [])].sort(compareLocation));
  assert.equal(rules.length, 1);

  // 並び順は .feature のパス → 行番号(Rule の行と Scenario の行が混ざって並ぶ)
  for (let i = 1; i < locations.length; i++) {
    assert.ok(
      compareLocation(locations[i - 1], locations[i]) < 0,
      `並び順が違う: ${locations[i - 1].path} L${locations[i - 1].line} の次に ${locations[i].path} L${locations[i].line}`,
    );
  }

  // Scenario の 7 理由がそれぞれちょうど 1 回
  assert.equal(new Set(scenarios.map((row) => row.reason)).size, 7);
});

test('inconsistent: feature-map に頼る 3 種の行が expected.json の featureMapRows のとおり', () => {
  const r = runTool('inconsistent');
  assert.equal(r.status, 1, r.stderr);
  const rows = inconsistencyRows(r.stdout).filter((row) => FEATURE_MAP_DEPENDENT_KINDS.includes(row.kind));
  assert.deepEqual(rows, readExpected('inconsistent').featureMapRows);
});

test('inconsistent: シナリオごとの最新結果が expected.json のとおり。REQ-001-2 は結合済みの 2 ファイルが pass で pass(同じ ID を名乗る ID 不一致の test の fail は混ざらない)、1 行目に結果の開始日時', () => {
  const r = runTool('inconsistent');
  assert.equal(r.status, 1, r.stderr);
  const expected = readExpected('inconsistent');
  assert.ok(expected.latestResults && expected.resultsStartTime);
  assert.equal(r.stdout.split('\n')[0], `実行ID: — / 結果: ${expected.resultsStartTime}`);

  const rows = scenarioTable(r.dir);
  for (const row of rows) {
    // ID 未付与の行は必ず 未生成。有効な ID の行は expected.json(重複 ID の REQ-003-1 は 2 行とも同じ値)
    assert.equal(row.latestResult, row.id === '—' ? '未生成' : expected.latestResults[row.id], `${row.id} ${row.name} の最新結果が違う`);
  }
  assert.deepEqual(
    new Set(rows.filter((row) => row.id !== '—').map((row) => row.id)),
    new Set(Object.keys(expected.latestResults)),
    '有効な ID の集合が expected.json と違う',
  );
  assert.equal(scenarioRow(r.dir, 'REQ-001-2').latestResult, 'pass');
});

test('inconsistent: 集計の表は feature-map の機能の順の後ろに feature-map に無い .feature、状態と結果の食い違いは 未生成 だけを書く', () => {
  const r = runTool('inconsistent');
  assert.equal(r.status, 1, r.stderr);
  const rows = summaryRows(r.stdout);
  assert.deepEqual(
    rows.map((cells) => cells.slice(0, 2)),
    [
      ['ログイン', 'テスト済み'],
      ['商品検索', '定義済み'],
      ['お知らせ', 'テスト済み'],
      ['お気に入り', '—'],
      ['合計', '—'],
    ],
  );
  for (const cells of rows.slice(2, 4)) assert.deepEqual(cells.slice(2), Array(8).fill('0'), `${cells[0]} の件数が 0 でない`);
  assert.deepEqual(mismatchLines(r.stdout), ['ログイン: テスト済み なのに 未生成 6']);
});

test('inconsistent: --run-id は不整合があっても features/last-run.json を書いて終了コード 1、scenarios は結び付きで絞らない', () => {
  const r = runTool('inconsistent', ['--run-id', 'X']);
  assert.equal(r.status, 1, r.stderr);
  assert.equal(finalLine(r.stdout), '書き出し: features/last-run.json');
  // REQ-009-1 は不明 ID 参照の test の ID
  assert.deepEqual(Object.keys(readLastRun(r.dir).scenarios), ['REQ-001-2', 'REQ-009-1']);
});

// ---- 最新結果(results.json)と features/last-run.json ----

/** 最新結果の表示(formatOutcome)。既知バグは理由付き */
const LATEST_RESULT_RE = /^(pass|fail|fail\(fail 指定だが通過\)|既知バグ\(.+\)|未生成|未実行)$/;

test('consistent: シナリオごとの最新結果が expected.json のとおり(5 つの結果すべてと Outline の集約を含む)', () => {
  const dir = copyFixture('consistent');
  const expected = readExpected('consistent');
  assert.ok(expected.latestResults);
  const rows = scenarioTable(dir);
  for (const [id, latestResult] of Object.entries(expected.latestResults)) {
    const matched = rows.filter((row) => row.id === id);
    assert.equal(matched.length, 1, `${id} の行がちょうど 1 行でない`);
    assert.equal(matched[0].latestResult, latestResult, `${id} の最新結果が違う`);
  }
  for (const row of rows) assert.match(row.latestResult, LATEST_RESULT_RE, `想定外の最新結果: ${row.latestResult}`);

  // results.json の 7 ケースが結果の各形をすべてカバーしている(フィクスチャ自体の確認)
  const values = Object.values(expected.latestResults);
  assert.ok(values.includes('pass'));
  assert.ok(values.includes('fail'));
  assert.ok(values.includes('fail(fail 指定だが通過)'));
  assert.ok(values.includes('既知バグ(理由なし)'));
  assert.ok(
    values.some((v) => /^既知バグ\(\d{4}-\d{2}-\d{2} ユーザー判断: .+\)$/.test(v)),
    'description 付きの既知バグが無い',
  );
  assert.ok(values.includes('未実行'), 'skipped による 未実行 が無い');

  // Outline 展開(REQ-001-3: pass と既知バグの混在)は 1 行に集約され、テストファイル列は 1 パス。集約の優先順は 既知バグ > pass
  const outline = rows.find((row) => row.id === 'REQ-001-3');
  assert.ok(outline);
  assert.equal(outline.specFiles, 'tests/e2e/login/required-fields-empty.spec.ts');
  assert.equal(expected.tests.filter((t) => t.boundTo === 'REQ-001-3').length, 2, 'REQ-001-3 は 2 test に展開されている前提');
  assert.match(outline.latestResult, /^既知バグ\(/);
});

test('no-results: 引数なしは終了コード 0、1 行目の結果は —、全シナリオが 未実行 で、テスト済み の機能でも状態と結果の食い違いにならない', () => {
  const r = runTool('no-results');
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stdout.split('\n')[0], '実行ID: — / 結果: —');
  assert.deepEqual(mismatchLines(r.stdout), []);
  const rows = scenarioTable(r.dir);
  const expected = readExpected('no-results');
  assert.ok(expected.latestResults);
  assert.equal(rows.length, Object.keys(expected.latestResults).length);
  for (const row of rows) {
    assert.ok(row.latestResult === '未生成' || row.latestResult === '未実行', `${row.id}: ${row.latestResult}`);
    assert.equal(row.latestResult, expected.latestResults[row.id], `${row.id} の最新結果が違う`);
  }
});

test('no-results: --run-id は test-results/results.json が無いので終了コード 2、features/last-run.json を作らない', () => {
  const r = runTool('no-results', ['--run-id', 'X']);
  assert.equal(r.status, 2);
  assert.match(r.stderr, /test-results\/results\.json/);
  assert.equal(lastRunExists(r.dir), false);
});

test('broken-results: results.json が 不正 JSON / suites が配列でない / suites が無い → 引数なしでも --run-id でも終了コード 2、features/last-run.json を作らず、標準エラーにファイル名、標準出力に 書き出し は出ない', () => {
  // フィクスチャの results.json は不正 JSON。残り 2 つは有効な JSON だが構造が違う(壊れた入力から「すべて未実行」の表を作らない)
  const variants: { label: string; json?: string }[] = [
    { label: '不正 JSON' },
    { label: 'suites が配列でない', json: '{ "suites": {} }' },
    { label: 'suites が無い', json: '{ "stats": { "startTime": "2026-09-27T11:12:00.000Z" } }' },
  ];
  for (const args of [[], ['--run-id', 'X']]) {
    for (const { label, json } of variants) {
      const what = `${label}(${args.join(' ') || '引数なし'})`;
      const dir = copyFixture('broken-results');
      if (json !== undefined) fs.writeFileSync(path.join(dir, RESULTS_PATH), json, 'utf8');
      const r = runToolIn(dir, args);
      assert.equal(r.status, 2, `${what}: 終了コードが 2 でない(${r.status}):\n${r.stderr}`);
      assert.equal(lastRunExists(dir), false, `${what}: 壊れた results.json なのに features/last-run.json が作られた`);
      assert.match(r.stderr, /test-results\/results\.json/, `${what}: 標準エラーにファイル名が無い`);
      assert.ok(!r.stdout.includes('書き出し'), `${what}:\n${r.stdout}`);
    }
  }
});

test('empty: 引数なしは終了コード 0、features/ を作らず、集計は合計行だけ(全列 0)、要件番号の最大値 なし、食い違い なし、不整合 なし、最終行は 書き出しなし', () => {
  const r = runTool('empty');
  assert.equal(r.status, 0, r.stderr);
  assert.equal(fs.existsSync(path.join(r.dir, 'features')), false, '引数なしの実行が features/ を作った');

  const summary = sectionLines(r.stdout, '集計');
  assert.deepEqual(tableRows(summary), [['合計', '—', '0', '0', '0', '0', '0', '0', '0', '0']]);
  assert.ok(summary.includes('要件番号の最大値: なし'), summary.join('\n'));
  assert.deepEqual(mismatchLines(r.stdout), []);
  assert.ok(sectionLines(r.stdout, '不整合').includes('なし'), r.stdout);
  assert.equal(scenarioTable(r.dir).length, 0);
  assert.equal(finalLine(r.stdout), '書き出しなし');
});

// ---- 細則(consistent のコピーを 1 箇所だけ加工した変種で検証する。results.json の読み取り・名前先頭 ID の境界・入力の欠落・書き出しの失敗) ----

/** 変種の加工対象にする spec(consistent で REQ-001-1 に結ばれている) */
const LOGIN_SPEC = 'tests/e2e/login/login-with-valid-credentials.spec.ts';
const LOGIN_TITLE = 'REQ-001-1 正しい資格情報でログインできる';

test('consistent の変種: results.json の spec は title 先頭の ID と tags の ID(ちょうど 1 つ)が一致するときだけ読む(design 1.5)。満たさない spec の結果は読まれず、そのシナリオは 未実行', () => {
  const expected = readExpected('consistent');
  assert.ok(expected.latestResults);
  assert.notEqual(expected.latestResults['REQ-001-1'], '未実行', 'REQ-001-1 に結果がある前提');

  // 結合条件を満たさない 4 つの形。いずれも spec が読まれず、REQ-001-1 は 未実行 になる(テストファイルの結合は results.json に依らない)
  const variants: { label: string; edit: (spec: ResultsSpec) => void }[] = [
    {
      label: 'tags が空(title にだけ ID)',
      edit: (spec) => {
        spec.tags = [];
      },
    },
    {
      label: 'title に ID 無し(tags にだけ ID)',
      edit: (spec) => {
        spec.title = spec.title.replace(/^REQ-001-1 /, '');
      },
    },
    {
      label: 'tags の ID が title と異なる',
      edit: (spec) => {
        spec.tags = ['REQ-001-2'];
      },
    },
    {
      label: 'tags に ID が 2 つ',
      edit: (spec) => {
        spec.tags = ['REQ-001-1', 'REQ-001-2'];
      },
    },
  ];
  for (const { label, edit } of variants) {
    const dir = copyFixture('consistent');
    editResults(dir, (results) => edit(specTitled(results, LOGIN_TITLE)));
    const r = runToolIn(dir);
    assert.equal(r.status, 0, `${label}:\n${r.stderr}`);
    const row = scenarioRow(dir, 'REQ-001-1');
    assert.equal(row.latestResult, '未実行', `${label}: 結合条件を満たさない spec の結果が読まれた`);
    assert.equal(row.specFiles, LOGIN_SPEC, `${label}: テストファイルの結合が変わった`);
  }

  // ID 形式でない tag(smoke)が併記されていても、ID の tag が 1 つなら読む: REQ-001-10 の skipped を pass に変えると pass
  const dir = copyFixture('consistent');
  editResults(dir, (results) => {
    const spec = specTitled(results, 'REQ-001-10 メールアドレスの大文字小文字を区別せずにログインできる');
    assert.ok(spec.tags.includes('smoke'), 'REQ-001-10 の spec に ID 形式でない tag が併記されている前提');
    for (const test of spec.tests) {
      test.expectedStatus = 'passed';
      test.status = 'expected';
      test.annotations = [];
    }
  });
  const r = runToolIn(dir);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(scenarioRow(dir, 'REQ-001-10').latestResult, 'pass', 'ID 形式でない tag の併記で spec が読まれなくなった');
});

test('consistent の変種: results.json の status が flaky の test は fail に寄せる(終了コードには影響しない)', () => {
  const dir = copyFixture('consistent');
  editResults(dir, (results) => {
    for (const test of specTitled(results, LOGIN_TITLE).tests) test.status = 'flaky';
  });
  const r = runToolIn(dir);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(scenarioRow(dir, 'REQ-001-1').latestResult, 'fail');
});

test('consistent の変種: Outline 展開の複数 test が既知バグなら description を出現順に / で連結し、同じ description は 1 回だけ', () => {
  const ID = 'REQ-001-3';
  const emailTitle = `${ID} 必須項目が空のときはエラーが表示される: メールアドレス`;
  const passwordTitle = `${ID} 必須項目が空のときはエラーが表示される: パスワード`;
  const newReason = '2026-09-20 ユーザー判断: メールアドレス空のバリデーションが無い。#131';

  // 前提: results.json では メールアドレス(pass)→ パスワード(既知バグ)の順に並ぶ。パスワード側の description が既存の理由
  const base = JSON.parse(fs.readFileSync(path.join(FIXTURES_DIR, 'consistent', RESULTS_PATH), 'utf8')) as ResultsJson;
  const titles = allSpecs(base).map((spec) => spec.title);
  assert.ok(titles.indexOf(emailTitle) < titles.indexOf(passwordTitle), 'メールアドレス の spec が パスワード より前にある前提');
  const existingReason = specTitled(base, passwordTitle).tests[0].annotations.find((a) => a.type === 'issue')?.description;
  assert.ok(existingReason, 'パスワード の spec に issue アノテーションがある前提');

  // 異なる description → 出現順に ` / ` で連結
  const a = copyFixture('consistent');
  editResults(a, (results) => markKnownBug(specTitled(results, emailTitle), newReason));
  const ra = runToolIn(a);
  assert.equal(ra.status, 0, ra.stderr);
  assert.equal(scenarioRow(a, ID).latestResult, `既知バグ(${newReason} / ${existingReason})`);

  // 同じ description → 1 回だけ
  const b = copyFixture('consistent');
  editResults(b, (results) => markKnownBug(specTitled(results, emailTitle), existingReason));
  const rb = runToolIn(b);
  assert.equal(rb.status, 0, rb.stderr);
  assert.equal(scenarioRow(b, ID).latestResult, `既知バグ(${existingReason})`);
});

test('consistent の変種: 名前先頭の ID に空白以外の文字が続く名前は ID とみなさない(.feature は ID 未付与、テストは ID 不一致)', () => {
  // 対照: 変異前の consistent は REQ-001-10 が結合済みで不整合 0(REQ-001-10 を REQ-001-1 と読まないことは既存テストで検証済み)
  const spec = readExpected('consistent').tests.find((t) => t.path === LOGIN_SPEC);
  assert.ok(spec && spec.boundTo === 'REQ-001-1', `${LOGIN_SPEC} が REQ-001-1 に結ばれている前提`);

  // .feature 側: Scenario 名を REQ-001-1x … にする(タグは @REQ-001-1 のまま)→ 名前先頭に ID 無し。そのテストは有効な Scenario を失い 不明 ID 参照
  const scenarioLine = 'Scenario: REQ-001-1 正しい資格情報でログインできる';
  const featureText = fs.readFileSync(path.join(FIXTURES_DIR, 'consistent', 'features', 'login.feature'), 'utf8');
  const featureLineNo = featureText.split('\n').findIndex((line) => line.trim() === scenarioLine) + 1;
  assert.ok(featureLineNo > 0, `login.feature に「${scenarioLine}」がある前提`);

  const a = copyFixture('consistent');
  editFile(a, 'features/login.feature', (text) => text.replace(scenarioLine, scenarioLine.replace('REQ-001-1 ', 'REQ-001-1x ')));
  const ra = runToolIn(a);
  assert.equal(ra.status, 1, ra.stderr);
  assert.deepEqual(inconsistencyRows(ra.stdout), [
    { kind: '不明 ID 参照', feature: 'ログイン', target: `${LOGIN_SPEC} L${spec.line} REQ-001-1` },
    {
      kind: 'ID 未付与',
      feature: 'ログイン',
      target: `features/login.feature L${featureLineNo} Scenario「REQ-001-1x 正しい資格情報でログインできる」(名前先頭に ID 無し)`,
    },
  ]);

  // テスト側: test 名を REQ-001-1x … にする(tag は @REQ-001-1 のまま)→ 名前: — / tag: REQ-001-1 の ID 不一致。REQ-001-1 は 未生成
  const b = copyFixture('consistent');
  editFile(b, LOGIN_SPEC, (text) => text.replace(`test('${LOGIN_TITLE}'`, `test('${LOGIN_TITLE.replace('REQ-001-1 ', 'REQ-001-1x ')}'`));
  const rb = runToolIn(b);
  assert.equal(rb.status, 1, rb.stderr);
  assert.deepEqual(inconsistencyRows(rb.stdout), [
    { kind: '未生成', feature: 'ログイン', target: 'REQ-001-1 正しい資格情報でログインできる' },
    { kind: 'ID 不一致', feature: 'ログイン', target: `${LOGIN_SPEC} L${spec.line} 名前: — / tag: REQ-001-1` },
  ]);
});

test('consistent の変種: features/last-run.json を書き出せない(同名のディレクトリがある)→ 終了コード 2、標準出力は書き出せた実行の最終行を除いたもの', () => {
  const dir = copyFixture('consistent');
  const blocker = path.join(dir, LAST_RUN_PATH);
  fs.mkdirSync(blocker);

  const r = runToolIn(dir, ['--run-id', 'X']);
  assert.equal(r.status, 2, r.stderr);
  assert.match(r.stderr, /features\/last-run\.json を書き出せません/);
  assert.ok(fs.statSync(blocker).isDirectory(), '書き出し先のディレクトリが置き換えられた');
  assert.doesNotMatch(finalLine(r.stdout), STDOUT_FINAL_LINE_RE, `書き出しに失敗したのに最終行がある:\n${r.stdout}`);

  // 別のコピーで成功した --run-id X の標準出力から最終行を除いたものが、失敗した実行の標準出力の全体と一致する
  const ok = runTool('consistent', ['--run-id', 'X']);
  assert.equal(ok.status, 0, ok.stderr);
  assert.equal(r.stdout, withoutFinalLine(ok.stdout));
});

test('consistent の変種: feature-map が壊れた JSON なら、集計の表は .feature のパスの順で、機能の列は Feature: の名前、状態は —', () => {
  const dir = copyFixture('consistent');
  fs.writeFileSync(path.join(dir, 'features', 'feature-map.json'), '{ "app": "会員サイト", }', 'utf8');
  const r = runToolIn(dir);
  assert.equal(r.status, 1, r.stderr);
  assert.deepEqual(
    summaryRows(r.stdout).map((cells) => cells.slice(0, 2)),
    [
      ['ログイン', '—'],
      ['商品検索', '—'],
      ['合計', '—'],
    ],
  );
});

test('consistent の変種: results.json に stats が無ければ、features/last-run.json に startTime の欄が無く、1 行目の結果は —', () => {
  const dir = copyFixture('consistent');
  editResults(dir, (results) => {
    delete results.stats;
  });
  const r = runToolIn(dir, ['--run-id', 'X']);
  assert.equal(r.status, 0, r.stderr);
  assert.deepEqual(headerOf(r.stdout), { runId: 'X', startTime: '—' });
  const lastRun = readLastRun(dir);
  assert.equal('startTime' in lastRun, false, `startTime の欄がある:\n${lastRunBytes(dir).toString('utf8')}`);
  assert.deepEqual(Object.keys(lastRun), ['runId', 'scenarios']);
});

test('consistent の変種: tests/e2e/ が無い → 終了コード 1、全シナリオが 未生成(results.json に結果があっても)、不整合は全要件と全シナリオの 未生成', () => {
  const dir = copyFixture('consistent');
  fs.rmSync(path.join(dir, 'tests', 'e2e'), { recursive: true });
  const r = runToolIn(dir);
  assert.equal(r.status, 1, r.stderr);
  assert.notEqual(headerOf(r.stdout).startTime, '—', 'results.json は読まれている前提');

  const rows = scenarioTable(dir);
  assert.ok(rows.length > 0);
  for (const row of rows) {
    assert.equal(row.specFiles, '—', `${row.id} にテストファイルが結ばれている`);
    assert.equal(row.latestResult, '未生成', `${row.id} の最新結果が 未生成 でない(結果があっても未生成が優先)`);
  }

  const inc = inconsistencyRows(r.stdout);
  assert.deepEqual(new Set(inc.map((row) => row.kind)), new Set(['未生成']), r.stdout);
  const requirements = inc.filter((row) => UNGENERATED_REQUIREMENT_TARGET_RE.test(row.target));
  const scenarios = inc.filter((row) => UNGENERATED_SCENARIO_TARGET_RE.test(row.target));
  assert.equal(requirements.length, ruleTable(dir).length, '要件 ID を持つ Rule がすべて 未生成(要件)として報告される');
  assert.equal(scenarios.length, rows.length, '全シナリオが 未生成(シナリオ)として報告される');
  assert.equal(requirements.length + scenarios.length, inc.length);

  // 集計の合計行: テストがある要件数 0、未生成 = シナリオ数(列は 機能 / 状態 / 要件数 / テストがある要件数 / シナリオ数 / pass / fail / 既知バグ / 未生成 / 未実行)
  const total = summaryRows(r.stdout).at(-1);
  assert.ok(total && total[0] === '合計', `集計表の最終行が合計でない: ${JSON.stringify(total)}`);
  assert.equal(total[3], '0');
  assert.equal(total[8], total[4]);
});

// ---- feature-map(consistent のコピーの features/feature-map.json を書き換えた変種で検証する) ----

const MAP = 'features/feature-map.json';
type JsonObject = Record<string, unknown>;
/** feature-map の features[index](テストの中だけで使う。fixture の形を知っているので型を絞る) */
const featureAt = (map: JsonObject, index: number): JsonObject => (map.features as JsonObject[])[index];

/** コピー上の feature-map を読み、加工して書き戻す */
function editFeatureMap(dir: string, edit: (map: JsonObject) => void): void {
  editFile(dir, MAP, (text) => {
    const map = JSON.parse(text) as JsonObject;
    edit(map);
    return JSON.stringify(map, null, 2);
  });
}

/** text を書けばその文字列でファイルを置き換え、remove ならファイルを消し、edit なら JSON を読んで書き換える */
const FORMAT_CASES: {
  label: string;
  remove?: true;
  text?: string;
  edit?: (map: JsonObject) => void;
  target: string | RegExp;
  feature?: string;
}[] = [
  { label: 'ファイルが無い', remove: true, target: `${MAP} が無い` },
  { label: '壊れた JSON', text: '{ "app": "会員サイト", }', target: /^features\/feature-map\.json を JSON として読めない\(.+\)$/ },
  { label: '中身が配列', text: '[]', target: `${MAP} の中身がオブジェクトでない` },
  {
    label: 'app が無い',
    edit: (m) => {
      delete m.app;
    },
    target: `${MAP} app が無い`,
  },
  {
    label: 'features が配列でない',
    edit: (m) => {
      m.features = {};
    },
    target: `${MAP} features が配列でない`,
  },
  {
    label: 'summary が無い',
    edit: (m) => {
      delete featureAt(m, 1).summary;
    },
    target: `${MAP} features[1].summary が無い`,
    feature: 'ログイン',
  },
  {
    label: 'includes が空',
    edit: (m) => {
      featureAt(m, 1).includes = [];
    },
    target: `${MAP} features[1].includes が空`,
    feature: 'ログイン',
  },
  {
    label: 'includes に数',
    edit: (m) => {
      featureAt(m, 1).includes = [1];
    },
    target: `${MAP} features[1].includes が文字列の配列でない`,
    feature: 'ログイン',
  },
  {
    label: 'status の値',
    edit: (m) => {
      featureAt(m, 1).status = '完了';
    },
    target: `${MAP} features[1].status の「完了」が 未着手・定義済み・テスト済み・対象外 のどれでもない`,
    feature: 'ログイン',
  },
  {
    label: 'decided が数',
    edit: (m) => {
      featureAt(m, 3).decided = 1;
    },
    target: `${MAP} features[3].decided が文字列でない`,
    feature: 'メディア・ファイル',
  },
  {
    label: 'roles が文字列',
    edit: (m) => {
      m.roles = '一般';
    },
    target: `${MAP} roles が文字列の配列でない`,
  },
  {
    label: 'coverage が文字列',
    edit: (m) => {
      m.coverage = 'java';
    },
    target: `${MAP} coverage がオブジェクトでない`,
  },
  {
    label: 'candidates の reason が無い',
    edit: (m) => {
      m.candidates = [{ name: '候補', slug: 'x' }];
    },
    target: `${MAP} candidates[0].reason が無い`,
    feature: '候補',
  },
];

test('feature-map の形式: 1 か所の誤りごとに、ちょうど 1 行の feature-map の形式が出て終了コード 1', () => {
  for (const { label, remove, text, edit, target, feature } of FORMAT_CASES) {
    const dir = copyFixture('consistent');
    const file = path.join(dir, ...MAP.split('/'));
    if (remove) fs.rmSync(file);
    if (text !== undefined) fs.writeFileSync(file, text, 'utf8');
    if (edit) editFeatureMap(dir, edit);
    const r = runToolIn(dir);
    assert.equal(r.status, 1, `${label}:\n${r.stderr}`);
    const rows = inconsistencyRows(r.stdout);
    assert.equal(rows.length, 1, `${label}: 不整合の行がちょうど 1 行でない:\n${r.stdout}`);
    assert.equal(rows[0].kind, 'feature-map の形式', label);
    assert.equal(rows[0].feature, feature ?? '—', label);
    if (typeof target === 'string') assert.equal(rows[0].target, target, label);
    else assert.match(rows[0].target, target, label);
  }
});

test('feature-map の形式があるときは、feature-map に頼る 3 種を出さない', () => {
  const dir = copyFixture('consistent');
  fs.writeFileSync(path.join(dir, 'features', 'extra.feature'), 'Feature: 余分\n', 'utf8');
  // 対照: 形式が正しければ、feature-map に無い .feature が出る
  const before = runToolIn(dir);
  assert.deepEqual(inconsistencyRows(before.stdout), [
    { kind: 'feature-map に無い .feature', feature: '余分', target: 'features/extra.feature(feature-map に slug が extra の機能が無い)' },
  ]);

  editFeatureMap(dir, (map) => {
    delete map.app;
  });
  const r = runToolIn(dir);
  assert.equal(r.status, 1, r.stderr);
  assert.deepEqual(inconsistencyRows(r.stdout), [{ kind: 'feature-map の形式', feature: '—', target: `${MAP} app が無い` }]);
});

test('feature-map.json も .feature も無いときは不整合なしで 0、.feature だけあれば feature-map の形式(ファイルが無い)', () => {
  const empty = runTool('empty');
  assert.equal(empty.status, 0, empty.stderr);
  assert.deepEqual(inconsistencyRows(empty.stdout), []);

  const dir = copyFixture('consistent');
  fs.rmSync(path.join(dir, ...MAP.split('/')));
  const r = runToolIn(dir);
  assert.equal(r.status, 1, r.stderr);
  assert.deepEqual(inconsistencyRows(r.stdout), [{ kind: 'feature-map の形式', feature: '—', target: `${MAP} が無い` }]);
});

test('先頭に BOM のある feature-map.json と results.json を読める', () => {
  const plain = runTool('consistent', ['--run-id', 'BOM']);
  assert.equal(plain.status, 0, plain.stderr);

  const dir = copyFixture('consistent');
  for (const rel of [MAP, 'test-results/results.json']) editFile(dir, rel, (text) => `\uFEFF${text}`);
  const r = runToolIn(dir, ['--run-id', 'BOM']);
  assert.equal(r.status, 0, r.stderr);
  assert.deepEqual(inconsistencyRows(r.stdout), []);
  assert.equal(r.stdout, plain.stdout);
  assertSameBytes(
    lastRunBytes(dir),
    lastRunBytes(plain.dir),
    'BOM のある入力から書いた features/last-run.json が、BOM の無い入力からのものと違う',
  );
});

test('表に無い欄は無視する', () => {
  const dir = copyFixture('consistent');
  editFeatureMap(dir, (map) => {
    map.owner = 'team-a';
    featureAt(map, 0).memo = 1;
    map.candidates = [{ name: '候補', slug: 'wish', reason: '未定', priority: '高' }];
  });
  const r = runToolIn(dir);
  assert.equal(r.status, 0, r.stdout);
  assert.deepEqual(inconsistencyRows(r.stdout), []);
});

test('機能の列は feature-map の name', () => {
  const dir = copyFixture('consistent');
  editFeatureMap(dir, (map) => {
    featureAt(map, 1).name = 'ログイン(会員)';
  });
  // login.feature の REQ-001-1 のタグ行を消す: .feature 側は ID 未付与、テスト側は不明 ID 参照になる
  editFile(dir, 'features/login.feature', (text) => text.replace('    @REQ-001-1\n', ''));
  const r = runToolIn(dir);
  assert.equal(r.status, 1, r.stderr);
  const rows = inconsistencyRows(r.stdout);
  assert.deepEqual(
    rows.map(({ kind, feature }) => ({ kind, feature })),
    [
      { kind: '不明 ID 参照', feature: 'ログイン(会員)' },
      { kind: 'ID 未付与', feature: 'ログイン(会員)' },
    ],
    r.stdout,
  );
  assert.ok(rows[0].target.startsWith(`${LOGIN_SPEC} `), rows[0].target);
});

test('配下にシナリオの無い Rule でも、名前の先頭に要件 ID が無ければ ID 未付与', () => {
  const dir = copyFixture('consistent');
  const rel = 'features/product-search.feature';
  let ruleLine = 0;
  editFile(dir, rel, (text) => {
    assert.ok(text.endsWith('\n'), `${rel} の末尾が改行である前提`);
    ruleLine = text.split('\n').length;
    return `${text}  Rule: 並び順を保存できる\n`;
  });
  const r = runToolIn(dir);
  assert.equal(r.status, 1, r.stderr);
  assert.deepEqual(inconsistencyRows(r.stdout), [
    { kind: 'ID 未付与', feature: '商品検索', target: `${rel} L${ruleLine} Rule「並び順を保存できる」(名前先頭に要件 ID 無し)` },
  ]);
});

test('機能どうしの slug の重なり', () => {
  const dir = copyFixture('consistent');
  editFeatureMap(dir, (map) => {
    featureAt(map, 2).slug = 'login';
  });
  const r = runToolIn(dir);
  assert.equal(r.status, 1, r.stderr);
  assert.deepEqual(inconsistencyRows(r.stdout), [
    { kind: 'slug の重なり', feature: 'ログイン / お知らせ', target: 'login: features[1], features[2]' },
  ]);
});

// ---- import した関数 ----

test('import しても CLI は動かない', () => {
  const dir = copyFixture('consistent');
  const code = `await import(${JSON.stringify(pathToFileURL(TOOL_PATH).href)});`;
  // `--` の後ろは node の引数でなく process.argv に入る(-e では argv[1] から)。CLI が動けば、引数の誤りを標準エラーに出す
  const r = spawnSync(process.execPath, ['--input-type=module', '-e', code, '--', '--run-id', 'X'], { cwd: dir, encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stdout, '');
  assert.equal(r.stderr, '');
  assert.equal(lastRunExists(dir), false);
});

test('inspect はカレントディレクトリでなく引数のルートを読む', () => {
  assert.equal(fs.existsSync(path.join(process.cwd(), 'features')), false, 'テストのカレントディレクトリに features/ が無い前提');
  const inspection = inspect(copyFixture('consistent'));
  assert.deepEqual(
    inspection.features.map((f) => f.path),
    ['features/login.feature', 'features/product-search.feature'],
  );
  assert.equal(inspection.featureMap?.app, '会員サイト');
  assert.deepEqual(inspection.boundSpecPaths.get('REQ-001-1'), [LOGIN_SPEC]);
  assert.deepEqual(inspection.inconsistencies, []);
});

test('inspect の Scenario は直前に書かれた引用元を ownSource に持つ', () => {
  const login = inspect(copyFixture('consistent')).features.find((f) => f.slug === 'login');
  assert.ok(login);
  const scenario = (id: string) => {
    const found = login.scenarios.find((s) => s.nameId === id);
    assert.ok(found, `${id} の Scenario が無い`);
    return found;
  };
  assert.equal(scenario('REQ-001-1').ownSource, null);
  assert.equal(scenario('REQ-001-1').source, 'docs/requirements.md > 3.2 認証');
  assert.equal(scenario('REQ-001-2').ownSource, 'docs/requirements.md > 3.2.1 エラー表示');
});

test('版の定数は 1 行で書かれ、export した値と同じ', () => {
  const matches = [...fs.readFileSync(TOOL_PATH, 'utf8').matchAll(/^export const TRACE_TOOL_VERSION = (\d+);$/gm)];
  assert.equal(matches.length, 1);
  assert.equal(Number(matches[0][1]), TRACE_TOOL_VERSION);
});

test('resultsFromPlaywright は suites が配列でなければ投げる', () => {
  assert.throws(() => resultsFromPlaywright({}), { message: 'suites が配列でない' });
});

test('deriveResults は今の .feature に無い ID の結果を無視する', () => {
  const inspection = inspect(copyFixture('consistent'));
  const base = deriveResults(inspection, {});
  const withUnknown = deriveResults(inspection, { 'REQ-999-1': { result: 'fail' } });
  assert.deepEqual(withUnknown.counts, base.counts);
  assert.deepEqual([...withUnknown.scenarios.values()], [...base.scenarios.values()]);
  assert.deepEqual(withUnknown.mismatches, base.mismatches);
});

// ---- 性質テスト(design Correctness Properties。PBT ライブラリは使わず、PROPERTY_FIXTURES 全件に対する不変条件として書く) ----

/**
 * Property 1: 決定性と入力独立性
 *
 * 対象フィクスチャ全件で:
 * (1) 引数なしの実行は features/last-run.json を作らず(`features/` も作らず)、同じ入力の 2 回の実行で標準出力と終了コードが同じ。
 *     置いてある features/last-run.json はバイト単位で変えない
 * (2) results.json を持つフィクスチャで、同じ入力の `--run-id P1` の 2 回の実行で標準出力と features/last-run.json がバイト単位で同じ
 * (3) 実行前に別の中身の features/last-run.json が置かれていても出力は同じで、ファイルは全体置き換えされる(古い中身の痕跡が残らない)
 *
 * **Validates: Requirements 3.2, 5.1, 6.1**
 */
test('Property 1: 決定性と入力独立性(全フィクスチャ)', () => {
  const BOGUS_MARKER = '手で書いた古い控え';
  const BOGUS_LAST_RUN = `{ "runId": "${BOGUS_MARKER}", "scenarios": { "REQ-999-1": { "result": "pass" } } }\n`;
  const args = ['--run-id', 'P1'];
  let checkedRunId = false;

  for (const fixture of PROPERTY_FIXTURES) {
    // (1) 引数なし: 書かず、features/ も作らず、2 回の実行で同じ
    const dirPlain = copyFixture(fixture);
    const featuresDir = path.join(dirPlain, 'features');
    const hadFeaturesDir = fs.existsSync(featuresDir);
    const plain = runToolIn(dirPlain);
    assert.ok(plain.status === 0 || plain.status === 1, `${fixture}: 終了コードが 0 でも 1 でもない(${plain.status}):\n${plain.stderr}`);
    assert.equal(lastRunExists(dirPlain), false, `${fixture}: 引数なしなのに features/last-run.json が作られた`);
    assert.equal(fs.existsSync(featuresDir), hadFeaturesDir, `${fixture}: 引数なしの実行が features/ を作った`);
    assert.equal(finalLine(plain.stdout), '書き出しなし', `${fixture}: 引数なしの最終行が違う`);
    const plainAgain = runToolIn(dirPlain);
    assert.equal(plainAgain.status, plain.status, `${fixture}: 2 回目の終了コードが違う`);
    assert.equal(plainAgain.stdout, plain.stdout, `${fixture}: 2 回目の標準出力が違う`);

    // (1') 引数なしは置いてある features/last-run.json を変えない
    const dirKept = copyFixture(fixture);
    writeLastRun(dirKept, BOGUS_LAST_RUN);
    const kept = runToolIn(dirKept);
    assert.equal(kept.status, plain.status, `${fixture}: features/last-run.json があると終了コードが違う`);
    assert.equal(kept.stdout, plain.stdout, `${fixture}: features/last-run.json があると標準出力が違う`);
    assertSameBytes(
      lastRunBytes(dirKept),
      Buffer.from(BOGUS_LAST_RUN, 'utf8'),
      `${fixture}: 引数なしの実行が features/last-run.json を変えた`,
    );

    if (!hasResults(fixture)) continue;
    checkedRunId = true;

    // (2) --run-id: 同じコピー上で 2 回実行する
    const dir = copyFixture(fixture);
    const first = runToolIn(dir, args);
    assert.ok(first.status === 0 || first.status === 1, `${fixture}: 終了コードが 0 でも 1 でもない(${first.status}):\n${first.stderr}`);
    assert.equal(finalLine(first.stdout), '書き出し: features/last-run.json', `${fixture}: 書き出し時の最終行が違う`);
    const firstLastRun = lastRunBytes(dir);
    const second = runToolIn(dir, args);
    assert.equal(second.status, first.status, `${fixture}: 2 回目の終了コードが違う`);
    assert.equal(second.stdout, first.stdout, `${fixture}: 2 回目の標準出力が違う`);
    assertSameBytes(lastRunBytes(dir), firstLastRun, `${fixture}: 2 回目の features/last-run.json が違う`);

    // (3) 別の中身の features/last-run.json を置いてから実行しても同じ出力になり、ファイルは全体置き換えされる
    const dirWithBogus = copyFixture(fixture);
    writeLastRun(dirWithBogus, BOGUS_LAST_RUN);
    const replaced = runToolIn(dirWithBogus, args);
    assert.equal(replaced.status, first.status, `${fixture}: 既存ファイルがあると終了コードが違う`);
    assert.equal(replaced.stdout, first.stdout, `${fixture}: 既存ファイルがあると標準出力が違う`);
    assertSameBytes(lastRunBytes(dirWithBogus), firstLastRun, `${fixture}: 既存ファイルがあると features/last-run.json が違う`);
    assert.ok(!lastRunBytes(dirWithBogus).toString('utf8').includes(BOGUS_MARKER), `${fixture}: 古い中身の痕跡が残っている`);
  }

  assert.ok(checkedRunId, 'results.json を持つフィクスチャが無く、--run-id の決定性が検証されていない');
});

/**
 * Property 2: results.json は不整合に影響しない
 *
 * 対象フィクスチャ全件で、`test-results/results.json` を取り除いた一時コピーで引数なしで実行すると:
 * - 不整合節と終了コードが元と同一
 * - scenarioTable の最新結果はすべて `未生成` か `未実行`
 * - 1 行目の結果が `—`
 * results.json を持たないフィクスチャでは取り除きが無操作になり、比較は自明に成り立つ
 *
 * **Validates: Requirements 3.4, 3.7**
 */
test('Property 2: results.json は不整合に影響しない(全フィクスチャ)', () => {
  let removedAny = false;

  for (const fixture of PROPERTY_FIXTURES) {
    // 元: results.json をそのままにした実行
    const baseline = runTool(fixture);
    assert.ok(
      baseline.status === 0 || baseline.status === 1,
      `${fixture}: 終了コードが 0 でも 1 でもない(${baseline.status}):\n${baseline.stderr}`,
    );

    // results.json を取り除いた実行(無いフィクスチャでは無操作)
    const dir = copyFixture(fixture);
    const resultsFile = path.join(dir, RESULTS_PATH);
    if (fs.existsSync(resultsFile)) removedAny = true;
    fs.rmSync(resultsFile, { force: true });
    const without = runToolIn(dir);

    // 不整合節と終了コードは同一
    assert.equal(without.status, baseline.status, `${fixture}: results.json を取り除くと終了コードが違う`);
    assert.equal(
      sectionLines(without.stdout, '不整合').join('\n'),
      sectionLines(baseline.stdout, '不整合').join('\n'),
      `${fixture}: results.json を取り除くと不整合節が違う`,
    );

    // 最新結果は 未生成 か 未実行 だけ
    for (const row of scenarioTable(dir)) {
      assert.ok(row.latestResult === '未生成' || row.latestResult === '未実行', `${fixture}: ${row.id} の最新結果が ${row.latestResult}`);
    }

    // 1 行目の結果
    assert.equal(headerOf(without.stdout).startTime, '—', `${fixture}: 1 行目の結果が違う`);
  }

  assert.ok(removedAny, 'results.json を持つフィクスチャが 1 つも無く、性質が自明にしか検証されていない');
});

/**
 * Property 3: 終了コードは不整合件数だけで決まる
 *
 * 対象フィクスチャ全件で、引数なしの実行について:
 * - 終了コードは 0 か 1(2 は実行不能で、対象フィクスチャには無い)
 * - 終了コード 0 ⇔ 不整合節が `なし`(表の行が 0)
 * - 終了コード 1 ⇔ 不整合節に 1 行以上(`なし` は出ない)
 * 最新結果の `fail` は終了コードに影響しない。性質が自明に成り立っていないことの確認として、
 * `consistent` は `fail` の行を含みながら終了コード 0、`inconsistent` は不整合 1 行以上で終了コード 1 であることも見る
 *
 * **Validates: Requirements 3.7, 5.4**
 */
test('Property 3: 終了コードは不整合件数だけで決まる(全フィクスチャ)', () => {
  const observed = new Map<string, { status: number | null; inconsistencies: number; failRows: number }>();

  for (const fixture of PROPERTY_FIXTURES) {
    const r = runTool(fixture);
    assert.ok(r.status === 0 || r.status === 1, `${fixture}: 終了コードが 0 でも 1 でもない(${r.status}):\n${r.stderr}`);

    const lines = sectionLines(r.stdout, '不整合');
    const rows = inconsistencyRows(r.stdout);
    const none = lines.includes('なし');
    assert.equal(
      r.status === 0,
      rows.length === 0 && none,
      `${fixture}: 終了コード ${r.status} だが不整合節は ${rows.length} 行(なし: ${none})`,
    );
    assert.equal(
      r.status === 1,
      rows.length >= 1 && !none,
      `${fixture}: 終了コード ${r.status} だが不整合節は ${rows.length} 行(なし: ${none})`,
    );

    // 最新結果の fail の有無を記録する(終了コードとの独立性は上の同値性で検証済み。ここでは非自明性の確認に使う)
    const failRows = scenarioTable(r.dir).filter((row) => row.latestResult.startsWith('fail')).length;
    observed.set(fixture, { status: r.status, inconsistencies: rows.length, failRows });
  }

  // 非自明性: fail を含むが不整合 0 のフィクスチャ(consistent)が終了コード 0、不整合ありのフィクスチャ(inconsistent)が終了コード 1
  const consistent = observed.get('consistent');
  assert.ok(consistent);
  assert.ok(consistent.failRows >= 1, 'consistent に fail の行が無く、fail が終了コードに影響しないことが検証されていない');
  assert.equal(consistent.status, 0, `consistent: fail を含むだけで終了コードが ${consistent.status} になった`);
  assert.equal(consistent.inconsistencies, 0);

  const inconsistent = observed.get('inconsistent');
  assert.ok(inconsistent);
  assert.ok(inconsistent.inconsistencies >= 1, 'inconsistent に不整合が無く、終了コード 1 の側が検証されていない');
  assert.equal(inconsistent.status, 1);
});

/**
 * Property 4: 標準出力の形
 *
 * 対象フィクスチャ全件で:
 * - 1 行目が `実行ID: <値> / 結果: <値>`
 * - `## ` の見出しは `## 集計` `## 不整合` の 2 つだけ、この順
 * - 集計節は少なくとも合計行を持つ
 * - 最終行は `書き出し: features/last-run.json` か `書き出しなし`
 * - results.json を持つフィクスチャで、引数なしと `--run-id P4` の実行で 1 行目と最終行を除いた標準出力が同じ
 *
 * **Validates: Requirements 3.6**
 */
test('Property 4: 標準出力の形(全フィクスチャ)', () => {
  let comparedRunId = false;

  for (const fixture of PROPERTY_FIXTURES) {
    const r = runTool(fixture);
    assert.ok(r.status === 0 || r.status === 1, `${fixture}: 終了コードが 0 でも 1 でもない(${r.status}):\n${r.stderr}`);
    assert.match(r.stdout.split('\n')[0], HEADER_RE, `${fixture}: 1 行目の形が違う`);
    const headings = r.stdout.split('\n').filter((line) => line.startsWith('## '));
    assert.deepEqual(headings, ['## 集計', '## 不整合'], `${fixture}: 標準出力の見出しが違う:\n${r.stdout}`);
    assert.ok(
      summaryRows(r.stdout).some((cells) => cells[0] === '合計'),
      `${fixture}: 集計節に合計行が無い:\n${r.stdout}`,
    );
    assert.match(finalLine(r.stdout), STDOUT_FINAL_LINE_RE, `${fixture}: 最終行が違う`);

    if (!hasResults(fixture)) continue;
    comparedRunId = true;
    const withRunId = runTool(fixture, ['--run-id', 'P4']);
    assert.equal(withRunId.status, r.status, `${fixture}: --run-id で終了コードが違う`);
    assert.match(withRunId.stdout.split('\n')[0], HEADER_RE, `${fixture}: --run-id の 1 行目の形が違う`);
    assert.match(finalLine(withRunId.stdout), STDOUT_FINAL_LINE_RE, `${fixture}: --run-id の最終行が違う`);
    assert.equal(
      withoutHeaderAndFinalLine(withRunId.stdout),
      withoutHeaderAndFinalLine(r.stdout),
      `${fixture}: 引数なしと --run-id で 1 行目と最終行のほかが違う`,
    );
  }

  assert.ok(comparedRunId, 'results.json を持つフィクスチャが無く、引数なしと --run-id の比較が検証されていない');
});

/**
 * Property 5: 結合はリテラル一致の必要十分条件で決まる
 *
 * (1) `expected.json` を持つ対象フィクスチャ全件で、有効な ID を持つ scenarioTable の各行について、テストファイル列のパス集合が
 *     expected.json で結合済み(`bound`)かつ `boundTo` がその ID である test 宣言のパス集合と一致する。
 *     集合の一致なので両方向を含む(結ばれるべき test があれば載る ⇐ / 載っていれば結ばれるべき test がある ⇒)。
 *     expected.json の結合先 ID はすべて表に現れる(重複 ID のフィクスチャでは 2 行以上になりうるので 1 行以上)
 * (2) 変異 A: `consistent` の 1 test の tag だけを 1 文字変える → その行はテストファイル `—` / 最新結果 `未生成` になり、
 *     不整合は `未生成`(そのシナリオ)と `ID 不一致` のちょうど 2 行。要件 REQ-001 は他のシナリオが結ばれたままなので `未生成`(要件)にならない。他の行は変わらない
 * (3) 変異 B: 同じ test の名前と tag の両方を同じ未定義 ID に変える → その行は `—` / `未生成`、不整合は `未生成` と `不明 ID 参照` のちょうど 2 行(`ID 不一致` は無い)
 * (4) 対照: 変異前の `consistent` は不整合 0 件・終了コード 0
 *
 * **Validates: Requirements 2.1, 2.3, 3.2**
 */
test('Property 5: 結合はリテラル一致の必要十分条件で決まる(全フィクスチャ + 変異)', () => {
  /** テストファイル列(` / ` 区切り、無ければ `—`)をソート済みのパス配列にする */
  const specFileSet = (cell: string): string[] => (cell === '—' ? [] : cell.split(' / ').sort());

  // (1) expected.json の結合先一覧と scenarioTable のテストファイル列の突き合わせ
  let boundRows = 0;
  let unboundRows = 0;
  for (const fixture of PROPERTY_FIXTURES) {
    if (!fs.existsSync(path.join(FIXTURES_DIR, fixture, 'expected.json'))) continue;
    const r = runTool(fixture);
    assert.ok(r.status === 0 || r.status === 1, `${fixture}: 終了コードが 0 でも 1 でもない(${r.status}):\n${r.stderr}`);
    const rows = scenarioTable(r.dir);

    // 有効なシナリオ ID → 結ばれるべきテストファイルの集合
    const expectedBound = new Map<string, Set<string>>();
    for (const t of readExpected(fixture).tests) {
      if (t.classification !== 'bound') continue;
      assert.ok(t.boundTo, `${fixture}: bound な test 宣言に boundTo が無い: ${t.path} L${t.line}`);
      const paths = expectedBound.get(t.boundTo) ?? new Set<string>();
      paths.add(t.path);
      expectedBound.set(t.boundTo, paths);
    }

    for (const row of rows) {
      if (row.id === '—') continue; // ID 未付与の行は結合の対象外
      const expected = [...(expectedBound.get(row.id) ?? [])].sort();
      assert.deepEqual(specFileSet(row.specFiles), expected, `${fixture}: ${row.id} のテストファイル列が expected.json の結合先と違う`);
      if (expected.length > 0) boundRows++;
      else unboundRows++;
    }
    const idsInRows = new Set(rows.map((row) => row.id));
    for (const id of expectedBound.keys()) {
      assert.ok(idsInRows.has(id), `${fixture}: 結合先 ${id} の行が scenarioTable に無い`);
    }
  }
  // 非自明性: 結ばれた行と結ばれていない行の両方を検査している
  assert.ok(boundRows > 0, '結ばれた行が 1 つも無い');
  assert.ok(unboundRows > 0, '結ばれていない(有効な ID を持つ)行が 1 つも無い');

  // (4) 対照: 変異前の consistent
  const baseline = runTool('consistent');
  assert.equal(baseline.status, 0, baseline.stderr);
  assert.deepEqual(inconsistencyRows(baseline.stdout), []);
  const baselineRows = scenarioTable(baseline.dir);

  // 変異の対象: consistent の 1 test(名前と tag がともに REQ-001-1)
  const TARGET_ID = 'REQ-001-1';
  const SPEC_POSIX = 'tests/e2e/login/login-with-valid-credentials.spec.ts';
  const targetTest = readExpected('consistent').tests.find((t) => t.path === SPEC_POSIX);
  assert.ok(
    targetTest && targetTest.boundTo === TARGET_ID && targetTest.nameId === TARGET_ID,
    `変異の対象 test が expected.json に無い: ${SPEC_POSIX}`,
  );
  const targetRow = baselineRows.find((row) => row.id === TARGET_ID);
  assert.ok(targetRow && targetRow.specFiles === SPEC_POSIX, `変異前に ${TARGET_ID} が ${SPEC_POSIX} に結ばれていない`);
  const ungeneratedRow: InconsistencyRow = { kind: '未生成', feature: targetTest.feature, target: `${TARGET_ID} ${targetRow.name}` };

  /** consistent のコピー上で対象 spec の内容を置き換えて実行する(置換が実際に内容を変えたことも確認する) */
  function runMutated(replace: (source: string) => string): { r: RunResult; rows: ScenarioRow[] } {
    const dir = copyFixture('consistent');
    const file = path.join(dir, ...SPEC_POSIX.split('/'));
    const original = fs.readFileSync(file, 'utf8');
    const mutated = replace(original);
    assert.notEqual(mutated, original, '変異が spec の内容を変えていない');
    fs.writeFileSync(file, mutated, 'utf8');
    const r = runToolIn(dir);
    assert.equal(r.status, 1, `変異後の終了コードが 1 でない(${r.status}):\n${r.stderr}`);
    const rows = scenarioTable(dir);
    // 対象の行だけが変わる: ID 未生成、テストファイル —。他の行は変異前と同一
    const target = rows.filter((row) => row.id === TARGET_ID);
    assert.equal(target.length, 1, `${TARGET_ID} の行がちょうど 1 行でない`);
    assert.equal(target[0].specFiles, '—', `${TARGET_ID} にテストファイルが結ばれたまま`);
    assert.equal(target[0].latestResult, '未生成', `${TARGET_ID} の最新結果が 未生成 でない`);
    assert.deepEqual(
      rows.filter((row) => row.id !== TARGET_ID),
      baselineRows.filter((row) => row.id !== TARGET_ID),
      '変異の対象以外の行が変わった',
    );
    return { r, rows };
  }

  // (2) 変異 A: tag だけを 1 文字変える(REQ-001-1 → REQ-001-2。名前は REQ-001-1 のまま)→ ID 不一致
  const mutatedTagId = 'REQ-001-2';
  const a = runMutated((source) => source.replace(`tag: '@${TARGET_ID}'`, `tag: '@${mutatedTagId}'`));
  assert.deepEqual(inconsistencyRows(a.r.stdout), [
    ungeneratedRow,
    {
      kind: 'ID 不一致',
      feature: targetTest.feature,
      target: `${SPEC_POSIX} L${targetTest.line} 名前: ${TARGET_ID} / tag: ${mutatedTagId}`,
    },
  ]);

  // (3) 変異 B: 名前と tag の両方を同じ未定義 ID に変える → 不明 ID 参照(ID 不一致ではない)
  const undefinedId = 'REQ-009-9';
  assert.ok(!baselineRows.some((row) => row.id === undefinedId), `${undefinedId} は consistent に無い ID である前提`);
  const b = runMutated((source) => source.replaceAll(TARGET_ID, undefinedId));
  assert.deepEqual(inconsistencyRows(b.r.stdout), [
    ungeneratedRow,
    { kind: '不明 ID 参照', feature: targetTest.feature, target: `${SPEC_POSIX} L${targetTest.line} ${undefinedId}` },
  ]);
});

/**
 * Property 6: test 宣言の分類は全域的で排他的
 *
 * `expected.json` を持つ対象フィクスチャ全件で、expected.json に列挙した test 宣言の 1 つ 1 つについて:
 * - 結合済み(`bound`)なら、テスト側の不整合行(孤立テスト / 不明 ID 参照 / ID 不一致)にその宣言(パスと行番号)を指す行が無く、
 *   結合先 ID の scenarioTable の行のテストファイル列にそのファイルが載る
 * - それ以外なら、その宣言を指すテスト側の不整合行がちょうど 1 行あり、種別が期待の分類(orphan → 孤立テスト、unknown → 不明 ID 参照、
 *   mismatch → ID 不一致)と一致し、機能欄も期待どおり。同じファイルに結合済みの宣言が無ければ、scenarioTable のどの行にもそのファイルは載らない
 * - 排他性: テスト側の不整合行の総数 = 結合済みでない宣言の数(行と宣言が 1 対 1 に対応する)
 * - 全域性(フィクスチャ側の確認): `inconsistent` の expected.json に 4 分類がすべて現れる
 *
 * **Validates: Requirements 4.2, 4.3, 4.4**
 */
test('Property 6: test 宣言の分類は全域的で排他的(全フィクスチャ)', () => {
  /** expected.json の分類(結合済み以外)→ 不整合節の種別(design 1.6 / 1.7) */
  const TEST_SIDE_KINDS: Record<Exclude<ExpectedTest['classification'], 'bound'>, string> = {
    orphan: '孤立テスト',
    unknown: '不明 ID 参照',
    mismatch: 'ID 不一致',
  };
  const testSideKinds = new Set(Object.values(TEST_SIDE_KINDS));
  /** テストファイル列(` / ` 区切り、無ければ `—`)をパス配列にする */
  const specFileList = (cell: string): string[] => (cell === '—' ? [] : cell.split(' / '));

  for (const fixture of PROPERTY_FIXTURES) {
    if (!fs.existsSync(path.join(FIXTURES_DIR, fixture, 'expected.json'))) continue;
    const r = runTool(fixture);
    assert.ok(r.status === 0 || r.status === 1, `${fixture}: 終了コードが 0 でも 1 でもない(${r.status}):\n${r.stderr}`);
    const rows = scenarioTable(r.dir);
    const inc = inconsistencyRows(r.stdout).filter((row) => testSideKinds.has(row.kind));
    const tests = readExpected(fixture).tests;
    const filesWithBound = new Set(tests.filter((t) => t.classification === 'bound').map((t) => t.path));

    for (const t of tests) {
      // 対象欄は `<パス> L<行> ...` で始まる(design 1.7)。末尾の空白で L6 と L60 を区別する
      const where = `${t.path} L${t.line} `;
      const referring = inc.filter((row) => row.target.startsWith(where));
      const listedIn = rows.filter((row) => specFileList(row.specFiles).includes(t.path));

      if (t.classification === 'bound') {
        assert.deepEqual(referring, [], `${fixture}: 結合済みの test 宣言が不整合として報告された: ${where}`);
        assert.ok(t.boundTo, `${fixture}: bound な test 宣言に boundTo が無い: ${where}`);
        assert.ok(
          listedIn.some((row) => row.id === t.boundTo),
          `${fixture}: ${where}のファイルが結合先 ${t.boundTo} の行のテストファイル列に載っていない`,
        );
      } else {
        assert.equal(
          referring.length,
          1,
          `${fixture}: ${where}を指すテスト側の不整合行がちょうど 1 行でない(${referring.length} 行):\n${r.stdout}`,
        );
        assert.equal(
          referring[0].kind,
          TEST_SIDE_KINDS[t.classification],
          `${fixture}: ${where}の種別が期待の分類(${t.classification})と違う`,
        );
        assert.equal(referring[0].feature, t.feature, `${fixture}: ${where}の機能欄が違う`);
        // 結ばれない宣言だけのファイルは scenarioTable のどの行にも載らない(同じファイルに結合済みの宣言があれば、その結合で載るので除く)
        if (!filesWithBound.has(t.path)) {
          assert.deepEqual(listedIn, [], `${fixture}: 結合されない test 宣言のファイルが scenarioTable に載った: ${t.path}`);
        }
      }
    }

    // 排他性: テスト側の不整合行と結合済みでない宣言は 1 対 1(上で各宣言にちょうど 1 行を確認したので、総数の一致で宣言に対応しない行が無いことが決まる)
    const unbound = tests.filter((t) => t.classification !== 'bound').length;
    assert.equal(
      inc.length,
      unbound,
      `${fixture}: テスト側の不整合行 ${inc.length} 行と結合済みでない宣言 ${unbound} 件が一致しない:\n${r.stdout}`,
    );
  }

  // 全域性(フィクスチャ側の確認): inconsistent の expected.json に 4 分類がすべて現れ、性質が自明にしか検証されていないことが無い
  assert.deepEqual(
    new Set(readExpected('inconsistent').tests.map((t) => t.classification)),
    new Set(['bound', 'orphan', 'mismatch', 'unknown']),
    'inconsistent の expected.json に 4 分類がすべて現れていない',
  );
});

/**
 * Property 7: .feature 側の ID の不備は漏れなく重複なく報告される
 *
 * `expected.json` を持つ対象フィクスチャ全件で:
 * (1) ID 未付与: 不整合節の `ID 未付与` 行を対象欄の書式(design 1.7 の Scenario の書式と Rule の書式)で分解し、
 *     expected.json の ID 未付与一覧(Scenario は missingIds、Rule は missingRuleIds)と多重集合として一致する
 *     (漏れなく: 期待する Scenario と Rule がすべて報告される / 重複なく: 件数が一致し余分な行が無い)。同じ (パス, 行番号) を指す行は 2 つ以上無い
 * (2) scenarioTable との突き合わせ: シナリオ ID が `—` の行(有効な ID を確定できなかった Scenario)の数と表示名の多重集合が ID 未付与一覧と一致し、
 *     残りの行はすべて有効な形のシナリオ ID を持つ(有効な ID を持つ Scenario は ID 未付与として報告されない)
 * (3) 重複 ID: 不整合節の `重複 ID` 行を {ID, 機能, 場所[]} に分解し、expected.json の重複 ID 一覧と多重集合として一致する。
 *     同じ (ID, 先頭の場所) を持つ行は 2 つ以上無く、1 行の中に同じ場所は 2 回現れない
 * (4) 非自明性(フィクスチャ側の確認): `inconsistent` は ID 未付与が 1 件以上、重複 ID の 3 つの出どころ(scenario / rule / spec)がすべてある。
 *     `consistent` `no-results` は両一覧が空で、(1)(3) の一致によりツールも何も報告しない
 *
 * **Validates: Requirements 4.5, 4.6**
 */
test('Property 7: .feature 側の ID の不備は漏れなく重複なく報告される(全フィクスチャ)', () => {
  /** 名前先頭のシナリオ ID を除いた表示名(design 1.3。scenarioTable のシナリオ列に出る形) */
  const displayName = (name: string): string => name.replace(/^REQ-\d+-\d+(?:\s+|$)/, '');
  const byText = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
  type DuplicateRow = { id: string; feature: string; places: string[] };
  const duplicateKey = (d: DuplicateRow) => `${d.id}: ${d.places.join(', ')}`;
  const byDuplicateKey = (a: DuplicateRow, b: DuplicateRow) => byText(duplicateKey(a), duplicateKey(b));

  for (const fixture of PROPERTY_FIXTURES) {
    if (!fs.existsSync(path.join(FIXTURES_DIR, fixture, 'expected.json'))) continue;
    const r = runTool(fixture);
    assert.ok(r.status === 0 || r.status === 1, `${fixture}: 終了コードが 0 でも 1 でもない(${r.status}):\n${r.stderr}`);
    const expected = readExpected(fixture);
    const inc = inconsistencyRows(r.stdout);

    // (1) ID 未付与 の行を Scenario の書式と Rule の書式に分け、それぞれ expected.json の一覧と多重集合として一致し、同じ要素を指す行は 1 つだけ
    const missing: ExpectedMissingId[] = [];
    const missingRules: ExpectedMissingRuleId[] = [];
    for (const { feature, target } of inc.filter((row) => row.kind === 'ID 未付与')) {
      const rule = MISSING_RULE_ID_TARGET_RE.exec(target);
      if (rule) {
        missingRules.push({ path: rule[1], line: Number(rule[2]), name: rule[3], feature });
        continue;
      }
      const m = MISSING_ID_TARGET_RE.exec(target);
      assert.ok(m, `${fixture}: ID 未付与 の対象欄の書式が違う: ${target}`);
      missing.push({ path: m[1], line: Number(m[2]), name: m[3], reason: m[4], feature });
    }
    assert.deepEqual(
      [...missing].sort(compareLocation),
      [...expected.missingIds].sort(compareLocation),
      `${fixture}: ID 未付与 の行が expected.json の一覧と一致しない:\n${r.stdout}`,
    );
    assert.deepEqual(
      [...missingRules].sort(compareLocation),
      [...(expected.missingRuleIds ?? [])].sort(compareLocation),
      `${fixture}: ID 未付与 の Rule の行が expected.json の一覧と一致しない:\n${r.stdout}`,
    );
    const missingPlaces = [...missing, ...missingRules].map((m) => `${m.path} L${m.line}`);
    assert.equal(new Set(missingPlaces).size, missingPlaces.length, `${fixture}: 同じ要素が ID 未付与 として 2 回以上報告された`);

    // (2) scenarioTable: シナリオ ID `—` の行が ID 未付与一覧と 1 対 1(件数と表示名)。残りの行は有効な形の ID を持つ
    const rows = scenarioTable(r.dir);
    const unassigned = rows.filter((row) => row.id === '—');
    assert.equal(unassigned.length, expected.missingIds.length, `${fixture}: シナリオ ID が — の行数が ID 未付与の件数と違う`);
    assert.deepEqual(
      unassigned.map((row) => row.name).sort(byText),
      expected.missingIds.map((m) => displayName(m.name)).sort(byText),
      `${fixture}: シナリオ ID が — の行の名前が ID 未付与一覧と一致しない`,
    );
    for (const row of rows) {
      if (row.id !== '—') assert.match(row.id, /^REQ-\d+-\d+$/, `${fixture}: 有効な形でないシナリオ ID が scenarioTable にある: ${row.id}`);
    }

    // (3) 重複 ID の行と expected.json の一覧が多重集合として一致し、同じ重複は 1 行だけ、1 行の中に同じ場所は 1 回だけ
    const duplicates: DuplicateRow[] = inc
      .filter((row) => row.kind === '重複 ID')
      .map(({ feature, target }) => {
        const m = DUPLICATE_TARGET_RE.exec(target);
        assert.ok(m, `${fixture}: 重複 ID の対象欄の書式が違う: ${target}`);
        return { id: m[1], feature, places: m[2].split(', ') };
      });
    assert.deepEqual(
      [...duplicates].sort(byDuplicateKey),
      expected.duplicateIds.map(({ id, feature, places }) => ({ id, feature, places })).sort(byDuplicateKey),
      `${fixture}: 重複 ID の行が expected.json の一覧と一致しない:\n${r.stdout}`,
    );
    const firstPlaces = duplicates.map((d) => `${d.id} ${d.places[0]}`);
    assert.equal(new Set(firstPlaces).size, firstPlaces.length, `${fixture}: 同じ重複が 重複 ID として 2 回以上報告された`);
    for (const d of duplicates) {
      assert.ok(d.places.length >= 2, `${fixture}: 重複 ID ${d.id} の場所が 2 つ未満`);
      assert.equal(new Set(d.places).size, d.places.length, `${fixture}: 重複 ID ${d.id} の対象欄に同じ場所が 2 回現れる`);
    }

    // (4) 非自明性(フィクスチャ側の確認)
    if (fixture === 'inconsistent') {
      assert.ok(expected.missingIds.length > 0, 'inconsistent に ID 未付与が無い');
      assert.deepEqual(
        new Set(expected.duplicateIds.map((d) => d.source)),
        new Set(['scenario', 'rule', 'spec']),
        'inconsistent の expected.json に重複 ID の 3 つの出どころがそろっていない',
      );
    } else {
      assert.deepEqual(expected.missingIds, [], `${fixture}: 不備の無いフィクスチャの期待値に ID 未付与がある`);
      assert.deepEqual(expected.duplicateIds, [], `${fixture}: 不備の無いフィクスチャの期待値に重複 ID がある`);
    }
  }
});

/** 集計表の列(機能、状態、件数 8 つ)。添字をそのまま列番号に使う */
const SUMMARY_COLUMNS = [
  '機能',
  '状態',
  '要件数',
  'テストがある要件数',
  'シナリオ数',
  '✅ pass',
  '❌ fail',
  '🐞 既知バグ',
  '未生成',
  '未実行',
];
const SCENARIOS_COLUMN = SUMMARY_COLUMNS.indexOf('シナリオ数');

/** 集計表の数値セル(空文字や `—` を 0 と誤読しないよう、数字だけであることを確かめてから数値にする) */
function countCell(cell: string, what: string): number {
  assert.match(cell, /^\d+$/, `${what} が数値でない: ${JSON.stringify(cell)}`);
  return Number(cell);
}

/**
 * Property 8: 全 Scenario がちょうど 1 行ずつ現れる
 *
 * 対象フィクスチャ全件で:
 * (1) テスト側が `features/*.feature`(直下)の各行を trim して `Scenario:` / `Scenario Outline:` で始まる行を数えた総数 =
 *     scenarioTable の行の総数 = 集計の合計行の「シナリオ数」。集計の機能行の「シナリオ数」の和も合計行と一致する
 *     (テスト側の数え方はツールの状態機械とは独立な単純な行カウント。フィクスチャは docstring 内に `Scenario:` を置かないのでこの数え方で正しい)
 * (2) 有効なシナリオ ID(`—` 以外)はそれぞれ、その ID を持つ Scenario の数だけ表に現れる。通常は 1 回。
 *     expected.json の重複 ID 一覧(出どころ `scenario`)に載る ID だけが場所の数だけ現れ、それ以外の ID がちょうど 1 回
 * (3) 同じシナリオ ID を持つ test が同一ファイルに複数あっても行は増えない: `consistent` の REQ-001-3(Outline 展開)は
 *     expected.json で同一ファイルに 2 つの test 宣言を持つが、表の行はちょうど 1 行
 * (4) `empty` は `features/` が無く、行 0 / 合計 0 で成り立つ
 *
 * **Validates: Requirements 2.3, 5.2**
 */
test('Property 8: 全 Scenario がちょうど 1 行ずつ現れる(全フィクスチャ)', () => {
  const SCENARIO_LINE_PREFIXES = ['Scenario:', 'Scenario Outline:'];

  /** フィクスチャの `features/` 直下の `*.feature` について、trim 後に `Scenario:` / `Scenario Outline:` で始まる行を数える */
  function countScenarioLines(fixture: string): number {
    const featuresDir = path.join(FIXTURES_DIR, fixture, 'features');
    if (!fs.existsSync(featuresDir)) return 0;
    let total = 0;
    for (const entry of fs.readdirSync(featuresDir, { withFileTypes: true })) {
      if (!entry.isFile() || !entry.name.endsWith('.feature')) continue;
      for (const raw of fs.readFileSync(path.join(featuresDir, entry.name), 'utf8').split('\n')) {
        const line = raw.trim();
        if (SCENARIO_LINE_PREFIXES.some((prefix) => line.startsWith(prefix))) total++;
      }
    }
    return total;
  }

  let sawScenarios = false;
  let sawDuplicateScenarioId = false;

  for (const fixture of PROPERTY_FIXTURES) {
    const r = runTool(fixture);
    assert.ok(r.status === 0 || r.status === 1, `${fixture}: 終了コードが 0 でも 1 でもない(${r.status}):\n${r.stderr}`);
    const rows = scenarioTable(r.dir);
    const scenarioCount = countScenarioLines(fixture);
    if (scenarioCount > 0) sawScenarios = true;

    // (1) .feature の Scenario 行数 = scenarioTable の行数 = 集計の合計「シナリオ数」= 機能行の「シナリオ数」の和
    assert.equal(
      rows.length,
      scenarioCount,
      `${fixture}: scenarioTable の行数 ${rows.length} が .feature の Scenario 行数 ${scenarioCount} と違う`,
    );
    const summary = summaryRows(r.stdout);
    const totalRow = summary.at(-1);
    assert.ok(totalRow && totalRow[0] === '合計', `${fixture}: 集計表の最終行が合計でない: ${JSON.stringify(totalRow)}`);
    const totalScenarios = countCell(totalRow[SCENARIOS_COLUMN], `${fixture}: 合計行のシナリオ数`);
    assert.equal(
      totalScenarios,
      scenarioCount,
      `${fixture}: 集計の合計「シナリオ数」${totalScenarios} が .feature の Scenario 行数 ${scenarioCount} と違う`,
    );
    const featureSum = summary
      .slice(0, -1)
      .reduce((sum, cells) => sum + countCell(cells[SCENARIOS_COLUMN], `${fixture}: ${cells[0]} のシナリオ数`), 0);
    assert.equal(featureSum, totalScenarios, `${fixture}: 機能行の「シナリオ数」の和 ${featureSum} が合計行 ${totalScenarios} と違う`);

    // (2) 有効なシナリオ ID の出現回数 = その ID を持つ Scenario の数(重複 ID 一覧に無ければ 1)
    const expectedOccurrences = new Map<string, number>();
    if (fs.existsSync(path.join(FIXTURES_DIR, fixture, 'expected.json'))) {
      for (const d of readExpected(fixture).duplicateIds) {
        if (d.source === 'scenario') {
          expectedOccurrences.set(d.id, d.places.length);
          sawDuplicateScenarioId = true;
        }
      }
    }
    const actualOccurrences = new Map<string, number>();
    for (const row of rows) {
      if (row.id !== '—') actualOccurrences.set(row.id, (actualOccurrences.get(row.id) ?? 0) + 1);
    }
    for (const id of new Set([...actualOccurrences.keys(), ...expectedOccurrences.keys()])) {
      assert.equal(
        actualOccurrences.get(id) ?? 0,
        expectedOccurrences.get(id) ?? 1,
        `${fixture}: ${id} の行数が、その ID を持つ Scenario の数と違う`,
      );
    }

    // (3) 同一ファイルに同じ ID の test が複数あっても行は増えない(consistent の REQ-001-3 は Outline 展開で 2 test)
    if (fixture === 'consistent') {
      const outlineTests = readExpected(fixture).tests.filter((t) => t.boundTo === 'REQ-001-3');
      assert.equal(outlineTests.length, 2, 'REQ-001-3 は同一ファイルに 2 test に展開されている前提');
      assert.equal(new Set(outlineTests.map((t) => t.path)).size, 1, 'REQ-001-3 の 2 test は同一ファイルにある前提');
      assert.equal(rows.filter((row) => row.id === 'REQ-001-3').length, 1, 'REQ-001-3 の行が 1 行でない');
    }

    // (4) empty は行 0 / 合計 0
    if (fixture === 'empty') {
      assert.equal(scenarioCount, 0);
      assert.equal(rows.length, 0);
    }
  }

  // 非自明性: Scenario を持つフィクスチャと、同じ ID を 2 つの Scenario が持つフィクスチャの両方を検査している
  assert.ok(sawScenarios, 'Scenario を持つフィクスチャが 1 つも無い');
  assert.ok(
    sawDuplicateScenarioId,
    '同じシナリオ ID を 2 つの Scenario が持つフィクスチャが無く、出現回数が 1 以外になる場合が検証されていない',
  );
});

/**
 * Property 9: 未生成の報告は表の未生成と 1 対 1 に対応する
 *
 * 対象フィクスチャ全件で:
 * (1) シナリオ側: scenarioTable で有効な ID を持ち最新結果が `未生成` の行の多重集合(`<ID> <シナリオ名>`)と、
 *     不整合節の `未生成` 行のうちシナリオの書式(design 1.7 `REQ-005-1 <シナリオ名>`)の対象欄の多重集合が一致する。
 *     ID 未付与(`—`)の行は `未生成` だが、ID 未付与 として別に報告されるのでこちらには含めない
 * (2) 要件側: ruleTable の要件 ID を持つ Rule ごとに、配下のどの行にもテストファイルが結ばれていない
 *     (配下 0 件を含む)Rule の要件 ID の多重集合と、不整合節の `未生成` 行のうち要件の書式(`REQ-005(配下のシナリオにテストが無い)`)の
 *     ID の多重集合が一致する。同じ要件 ID の Rule が 2 つあっても Rule ごとに数えるので、`inconsistent` の 2 つ目の REQ-001 だけが報告される
 * (3) `未生成` 行の対象欄は 2 つの書式のどちらかに必ず一致する。各行について `最新結果 = 未生成` ⇔ `テストファイル = —`(design 1.8 の 1)
 * (4) expected.json を持つフィクスチャでは、(1)(2) の不整合側が expected.json の `ungenerated` と一致する
 * (5) 非自明性(フィクスチャ側の確認): `inconsistent` は要件側・シナリオ側ともに 1 件以上。`consistent` は 0 件、
 *     `no-results` はテストがあって未実行なだけなので 0 件、`empty` は 0 件
 *
 * **Validates: Requirements 4.1**
 */
test('Property 9: 未生成の報告は表の未生成と 1 対 1 に対応する(全フィクスチャ)', () => {
  const byText = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

  for (const fixture of PROPERTY_FIXTURES) {
    const r = runTool(fixture);
    assert.ok(r.status === 0 || r.status === 1, `${fixture}: 終了コードが 0 でも 1 でもない(${r.status}):\n${r.stderr}`);
    const rows = scenarioTable(r.dir);
    const ungeneratedRows = inconsistencyRows(r.stdout).filter((row) => row.kind === '未生成');

    // (3) 対象欄の書式は要件かシナリオのどちらか。表の各行では 未生成 ⇔ テストファイル —
    const reportedRequirements: string[] = [];
    const reportedScenarios: string[] = [];
    for (const { target } of ungeneratedRows) {
      const req = UNGENERATED_REQUIREMENT_TARGET_RE.exec(target);
      const sc = UNGENERATED_SCENARIO_TARGET_RE.exec(target);
      assert.ok(
        (req !== null) !== (sc !== null),
        `${fixture}: 未生成 の対象欄が要件・シナリオのどちらの書式にも(または両方に)一致する: ${target}`,
      );
      if (req) reportedRequirements.push(req[1]);
      else if (sc) reportedScenarios.push(`${sc[1]} ${sc[2]}`);
    }
    for (const row of rows) {
      assert.equal(
        row.latestResult === '未生成',
        row.specFiles === '—',
        `${fixture}: ${row.id} ${row.name} の最新結果(${row.latestResult})とテストファイル(${row.specFiles})が食い違う`,
      );
    }

    // (1) シナリオ側: 有効な ID を持つ 未生成 の行 ↔ 未生成(シナリオ)行
    const tableScenarios = rows.filter((row) => row.id !== '—' && row.latestResult === '未生成').map((row) => `${row.id} ${row.name}`);
    assert.deepEqual(
      [...reportedScenarios].sort(byText),
      [...tableScenarios].sort(byText),
      `${fixture}: 不整合節の 未生成(シナリオ)と scenarioTable の 未生成 行が 1 対 1 でない:\n${r.stdout}`,
    );

    // (2) 要件側: 配下のどの行にもテストファイルが無い(0 件を含む)Rule ↔ 未生成(要件)行
    const sections = ruleTable(r.dir);
    const tableRequirements = sections.filter((s) => s.rows.every((row) => row.specFiles === '—')).map((s) => s.id);
    assert.deepEqual(
      [...reportedRequirements].sort(byText),
      [...tableRequirements].sort(byText),
      `${fixture}: 不整合節の 未生成(要件)と、配下にテストの無い Rule が 1 対 1 でない:\n${r.stdout}`,
    );

    // (4) expected.json との一致
    if (fs.existsSync(path.join(FIXTURES_DIR, fixture, 'expected.json'))) {
      const expected = readExpected(fixture).ungenerated;
      assert.deepEqual(
        [...reportedRequirements].sort(byText),
        expected.requirements.map((e) => e.id).sort(byText),
        `${fixture}: 未生成(要件)が expected.json と違う`,
      );
      assert.deepEqual(
        [...reportedScenarios].sort(byText),
        expected.scenarios.map((e) => `${e.id} ${e.name}`).sort(byText),
        `${fixture}: 未生成(シナリオ)が expected.json と違う`,
      );
    }

    // (5) 非自明性(フィクスチャ側の確認)
    if (fixture === 'inconsistent') {
      assert.ok(reportedRequirements.length >= 1, 'inconsistent に 未生成(要件)が無い');
      assert.ok(reportedScenarios.length >= 1, 'inconsistent に 未生成(シナリオ)が無い');
      // 配下 0 件の Rule(REQ-005)と、同じ要件 ID の 2 つの Rule のうち片方だけ(REQ-001 がちょうど 1 回)が含まれる
      assert.ok(
        sections.some((s) => s.id === 'REQ-005' && s.rows.length === 0),
        'inconsistent に配下 0 件の Rule(REQ-005)が無い',
      );
      assert.equal(sections.filter((s) => s.id === 'REQ-001').length, 2, 'inconsistent の REQ-001 は 2 つの Rule にある前提');
      assert.equal(reportedRequirements.filter((id) => id === 'REQ-001').length, 1, 'REQ-001 の 未生成(要件)がちょうど 1 回でない');
    } else {
      assert.deepEqual(ungeneratedRows, [], `${fixture}: 未生成 が報告された:\n${r.stdout}`);
      // no-results は結ばれたテストがあり(未実行になるだけ)、性質の「未生成 0 件」側が results.json の有無と独立に成り立つ
      if (fixture === 'no-results')
        assert.ok(rows.length > 0 && rows.every((row) => row.latestResult === '未実行'), 'no-results の行がすべて 未実行 でない');
    }
  }
});

/**
 * Property 10: 集計の内部整合
 *
 * 対象フィクスチャ全件で、標準出力の `## 集計` 節について:
 * (1) 各機能行で `✅ pass + ❌ fail + 🐞 既知バグ + 未生成 + 未実行 = シナリオ数`、`テストがある要件数 ≤ 要件数`。数値列はすべて数字だけからなる。
 *     状態の列は 4 つの状態か `—`
 * (2) 最終行は `合計` で状態の列は `—`、各数値列は機能行の列の和(機能行が無い `empty` では全列 0)
 * (3) `要件番号の最大値: <値>` は、テスト側が `features/*.feature` の `Rule: REQ-<数字>` 行から数値で集めた最大のリテラル
 *     (無ければ `なし`)と一致する。テスト側の数え方はツールの状態機械とは独立な単純な行走査
 * (4) scenarioTable と ruleTable との突き合わせ: 合計「シナリオ数」= scenarioTable の行数、合計「要件数」= 要件 ID を持つ Rule の数、
 *     合計「テストがある要件数」= 配下にテストファイルが結ばれた行を 1 つ以上持つ Rule の数、結果 5 列の合計 = scenarioTable の最新結果ごとの件数
 * (5) 非自明性(フィクスチャ側の確認): 機能行が 2 行以上のフィクスチャ、`テストがある要件数 < 要件数` となる機能行、
 *     `要件番号の最大値: なし` になるフィクスチャがそれぞれある。テスト側の走査は `consistent` → REQ-003、`inconsistent` → REQ-005 を返す
 *
 * **Validates: Requirements 1.4, 5.3**
 */
test('Property 10: 集計の内部整合(全フィクスチャ)', () => {
  const [, STATUS, REQUIREMENTS, TESTED_REQUIREMENTS, SCENARIOS, PASS, FAIL, KNOWN_BUG, UNGENERATED, NOT_RUN] = SUMMARY_COLUMNS.map(
    (_, i) => i,
  );
  const RESULT_COLUMNS = [PASS, FAIL, KNOWN_BUG, UNGENERATED, NOT_RUN];
  const NUMERIC_COLUMNS = [REQUIREMENTS, TESTED_REQUIREMENTS, SCENARIOS, ...RESULT_COLUMNS];
  const STATUS_VALUES = ['未着手', '定義済み', 'テスト済み', '対象外', '—'];
  const MAX_REQUIREMENT_LINE_RE = /^要件番号の最大値: (.+)$/;
  /** テスト側で要件 ID を拾う `Rule:` 行の形(trim 後)。数値比較のために番号部分も取る */
  const RULE_REQUIREMENT_RE = /^Rule:\s*(REQ-(\d+))\s/;
  /** テスト側の走査が返すべき値(フィクスチャ側の確認。走査自体が壊れていないことの保証) */
  const KNOWN_MAX: Record<string, string> = { consistent: 'REQ-003', inconsistent: 'REQ-005', empty: 'なし' };

  /** 最新結果の表示が属する結果列(fail と既知バグは括弧付きの形を含む) */
  const resultColumn = (latestResult: string): number => {
    if (latestResult === 'pass') return PASS;
    if (latestResult.startsWith('fail')) return FAIL;
    if (latestResult.startsWith('既知バグ')) return KNOWN_BUG;
    if (latestResult === '未生成') return UNGENERATED;
    if (latestResult === '未実行') return NOT_RUN;
    assert.fail(`想定外の最新結果: ${latestResult}`);
  };

  /** フィクスチャの `features/` 直下の `*.feature` を走査し、`Rule: REQ-<数字>` の要件 ID を数値で比べた最大のリテラルを返す(無ければ `なし`。同値なら先に現れたもの) */
  function expectedMaxRequirementId(fixture: string): string {
    const featuresDir = path.join(FIXTURES_DIR, fixture, 'features');
    if (!fs.existsSync(featuresDir)) return 'なし';
    let best: { literal: string; value: number } | null = null;
    const names = fs
      .readdirSync(featuresDir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith('.feature'))
      .map((entry) => entry.name)
      .sort();
    for (const name of names) {
      for (const raw of fs.readFileSync(path.join(featuresDir, name), 'utf8').split('\n')) {
        const m = RULE_REQUIREMENT_RE.exec(raw.trim());
        if (!m) continue;
        const value = Number(m[2]);
        if (best === null || value > best.value) best = { literal: m[1], value };
      }
    }
    return best === null ? 'なし' : best.literal;
  }

  let sawMultipleFeatureRows = false;
  let sawFewerTestedRequirements = false;
  let sawNoRequirements = false;

  for (const fixture of PROPERTY_FIXTURES) {
    const r = runTool(fixture);
    assert.ok(r.status === 0 || r.status === 1, `${fixture}: 終了コードが 0 でも 1 でもない(${r.status}):\n${r.stderr}`);
    const summary = sectionLines(r.stdout, '集計');

    // 表のヘッダ行が列の順(以下の列番号の前提)
    const headerCells = (summary.find((line) => line.startsWith('|')) ?? '')
      .slice(1, -1)
      .split('|')
      .map((cell) => cell.trim());
    assert.deepEqual(headerCells, SUMMARY_COLUMNS, `${fixture}: 集計表の列が違う`);

    const rows = tableRows(summary);
    assert.ok(rows.length >= 1, `${fixture}: 集計表に行が無い:\n${summary.join('\n')}`);
    for (const cells of rows)
      assert.equal(cells.length, SUMMARY_COLUMNS.length, `${fixture}: 集計表の列数が違う: ${JSON.stringify(cells)}`);
    const featureRows = rows.slice(0, -1);
    const totalRow = rows.at(-1);
    assert.ok(totalRow, `${fixture}: 集計表に合計行が無い`);

    // (1) 各機能行: 結果 5 列の和 = シナリオ数、テストがある要件数 ≤ 要件数、状態の列の値
    for (const cells of featureRows) {
      const label = `${fixture}: 機能行「${cells[0]}」`;
      assert.notEqual(cells[0], '合計', `${fixture}: 合計行が最終行以外にある`);
      assert.ok(STATUS_VALUES.includes(cells[STATUS]), `${label}の状態が 4 つの状態でも — でもない: ${cells[STATUS]}`);
      const n = (column: number) => countCell(cells[column], `${label}の${SUMMARY_COLUMNS[column]}`);
      const resultSum = RESULT_COLUMNS.reduce((sum, column) => sum + n(column), 0);
      assert.equal(resultSum, n(SCENARIOS), `${label}の結果 5 列の和 ${resultSum} がシナリオ数 ${n(SCENARIOS)} と違う`);
      assert.ok(
        n(TESTED_REQUIREMENTS) <= n(REQUIREMENTS),
        `${label}のテストがある要件数 ${n(TESTED_REQUIREMENTS)} が要件数 ${n(REQUIREMENTS)} を超える`,
      );
      if (n(TESTED_REQUIREMENTS) < n(REQUIREMENTS)) sawFewerTestedRequirements = true;
    }
    if (featureRows.length >= 2) sawMultipleFeatureRows = true;

    // (2) 合計行: 状態は —、各数値列 = 機能行の列の和(機能行が無ければ 0)
    assert.equal(totalRow[0], '合計', `${fixture}: 集計表の最終行が合計でない: ${JSON.stringify(totalRow)}`);
    assert.equal(totalRow[STATUS], '—', `${fixture}: 合計行の状態が — でない`);
    const total = (column: number) => countCell(totalRow[column], `${fixture}: 合計行の${SUMMARY_COLUMNS[column]}`);
    for (const column of NUMERIC_COLUMNS) {
      const featureSum = featureRows.reduce(
        (sum, cells) => sum + countCell(cells[column], `${fixture}: 機能行「${cells[0]}」の${SUMMARY_COLUMNS[column]}`),
        0,
      );
      assert.equal(
        total(column),
        featureSum,
        `${fixture}: 合計行の${SUMMARY_COLUMNS[column]} ${total(column)} が機能行の和 ${featureSum} と違う`,
      );
    }
    if (featureRows.length === 0) {
      for (const column of NUMERIC_COLUMNS)
        assert.equal(total(column), 0, `${fixture}: 機能行が無いのに合計行の${SUMMARY_COLUMNS[column]}が 0 でない`);
    }

    // (3) 要件番号の最大値: テスト側の .feature 走査と一致
    const maxLines = summary.map((line) => MAX_REQUIREMENT_LINE_RE.exec(line)).filter((m) => m !== null);
    assert.equal(maxLines.length, 1, `${fixture}: 集計節の「要件番号の最大値:」行がちょうど 1 行でない:\n${summary.join('\n')}`);
    const actualMax = maxLines[0][1];
    const expectedMax = expectedMaxRequirementId(fixture);
    assert.equal(actualMax, expectedMax, `${fixture}: 要件番号の最大値が .feature の Rule 行から求めた値と違う`);
    assert.match(actualMax, /^(?:REQ-\d+|なし)$/, `${fixture}: 要件番号の最大値の表示が違う: ${actualMax}`);
    if (actualMax === 'なし') sawNoRequirements = true;
    if (fixture in KNOWN_MAX) assert.equal(expectedMax, KNOWN_MAX[fixture], `${fixture}: テスト側の走査が既知の最大値を返さない`);

    // (4) scenarioTable と ruleTable との突き合わせ
    const scenarios = scenarioTable(r.dir);
    assert.equal(
      total(SCENARIOS),
      scenarios.length,
      `${fixture}: 合計「シナリオ数」${total(SCENARIOS)} が scenarioTable の行数 ${scenarios.length} と違う`,
    );
    const sections = ruleTable(r.dir);
    assert.equal(
      total(REQUIREMENTS),
      sections.length,
      `${fixture}: 合計「要件数」${total(REQUIREMENTS)} が要件 ID を持つ Rule の数 ${sections.length} と違う`,
    );
    const testedSections = sections.filter((s) => s.rows.some((row) => row.specFiles !== '—')).length;
    assert.equal(
      total(TESTED_REQUIREMENTS),
      testedSections,
      `${fixture}: 合計「テストがある要件数」${total(TESTED_REQUIREMENTS)} が配下にテストのある Rule の数 ${testedSections} と違う`,
    );
    const resultCounts = new Map<number, number>(RESULT_COLUMNS.map((column) => [column, 0]));
    for (const row of scenarios) {
      const column = resultColumn(row.latestResult);
      resultCounts.set(column, (resultCounts.get(column) ?? 0) + 1);
    }
    for (const column of RESULT_COLUMNS) {
      assert.equal(
        total(column),
        resultCounts.get(column),
        `${fixture}: 合計「${SUMMARY_COLUMNS[column]}」${total(column)} が scenarioTable の件数 ${resultCounts.get(column)} と違う`,
      );
    }
  }

  // (5) 非自明性(フィクスチャ側の確認)
  assert.ok(sawMultipleFeatureRows, '機能行が 2 行以上のフィクスチャが無く、合計が機能行の和であることが自明にしか検証されていない');
  assert.ok(sawFewerTestedRequirements, 'テストがある要件数 < 要件数 の機能行が無く、≤ が等号としてしか検証されていない');
  assert.ok(sawNoRequirements, '要件番号の最大値が なし になるフィクスチャが無い');
});

/** design 1.5 の結合条件(title の先頭 ID と tags[] の ID がちょうど 1 つずつあり文字列一致する)を満たす spec の ID。満たさなければ null */
function conformingIdOf(spec: ResultsSpec): string | null {
  const tagIds = spec.tags.filter((tag) => /^REQ-\d+-\d+$/.test(tag));
  const m = /^(REQ-\d+-\d+)(?=\s|$)/.exec(spec.title);
  return tagIds.length === 1 && m !== null && m[1] === tagIds[0] ? tagIds[0] : null;
}

/**
 * Property 11: 最新結果は結合条件を満たす spec の結果だけから導かれる
 *
 * 対象フィクスチャ全件で、results.json から design 1.5 の条件を満たさない spec をすべて取り除いた一時コピーで実行しても、
 * 標準出力・終了コード・features/last-run.json が元と同一(results.json を持つフィクスチャは `--run-id P11`、持たないものは引数なし)。
 * results.json を持たないフィクスチャでは取り除きが無操作になり、比較は自明に成り立つ。
 * 非自明性(フィクスチャ側の確認): `inconsistent` で取り除かれる spec に、結合済みのシナリオ REQ-001-2 と同じ ID を tag または
 * title に持ち結果が fail(unexpected)のものがあり、REQ-001-2 の最新結果は `pass`(条件を緩めて「tags の最初の ID、無ければ title の先頭 ID」で読むと
 * その fail が混ざって `fail` になる)
 *
 * **Validates: Requirements 5.2**
 */
test('Property 11: 最新結果は結合条件を満たす spec の結果だけから導かれる(全フィクスチャ)', () => {
  const TAG_ID_RE = /^REQ-\d+-\d+$/;
  const TITLE_ID_RE = /^(REQ-\d+-\d+)(?=\s|$)/;
  /** 条件を緩めたときに spec が名乗る ID(tags の最初の ID、無ければ title の先頭 ID)。非自明性の確認に使う */
  const looseId = (spec: ResultsSpec): string | null =>
    spec.tags.find((tag) => TAG_ID_RE.test(tag)) ?? TITLE_ID_RE.exec(spec.title)?.[1] ?? null;
  /** suites を再帰的に辿り、条件を満たさない spec を取り除いて返す */
  const prune = (suites: ResultsSuite[], removed: ResultsSpec[]): void => {
    for (const suite of suites) {
      if (suite.specs) {
        removed.push(...suite.specs.filter((spec) => conformingIdOf(spec) === null));
        suite.specs = suite.specs.filter((spec) => conformingIdOf(spec) !== null);
      }
      prune(suite.suites ?? [], removed);
    }
  };

  let removedTotal = 0;
  for (const fixture of PROPERTY_FIXTURES) {
    const args = hasResults(fixture) ? ['--run-id', 'P11'] : [];
    const baseline = runTool(fixture, args);
    assert.ok(
      baseline.status === 0 || baseline.status === 1,
      `${fixture}: 終了コードが 0 でも 1 でもない(${baseline.status}):\n${baseline.stderr}`,
    );

    const dir = copyFixture(fixture);
    const resultsFile = path.join(dir, RESULTS_PATH);
    const removed: ResultsSpec[] = [];
    if (fs.existsSync(resultsFile)) {
      const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8')) as ResultsJson;
      prune(results.suites, removed);
      fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2), 'utf8');
    }
    const pruned = runToolIn(dir, args);
    assert.equal(pruned.status, baseline.status, `${fixture}: 条件を満たさない spec を取り除くと終了コードが違う`);
    assert.equal(pruned.stdout, baseline.stdout, `${fixture}: 条件を満たさない spec を取り除くと標準出力が違う`);
    assert.equal(lastRunExists(dir), lastRunExists(baseline.dir), `${fixture}: features/last-run.json の有無が違う`);
    if (lastRunExists(dir)) {
      assertSameBytes(
        lastRunBytes(dir),
        lastRunBytes(baseline.dir),
        `${fixture}: 条件を満たさない spec を取り除くと features/last-run.json が違う`,
      );
    }
    removedTotal += removed.length;

    if (fixture === 'inconsistent') {
      const rivals = removed.filter((spec) => looseId(spec) === 'REQ-001-2' && spec.tests.some((test) => test.status === 'unexpected'));
      assert.ok(rivals.length >= 1, 'inconsistent の results.json に、REQ-001-2 を名乗るが結合条件を満たさない fail の spec が無い');
      assert.equal(scenarioRow(baseline.dir, 'REQ-001-2').latestResult, 'pass', 'ID 不一致の test の fail が REQ-001-2 に混ざった');
    }
  }
  assert.ok(removedTotal > 0, '条件を満たさない spec を持つフィクスチャが 1 つも無く、性質が自明にしか検証されていない');
});

/**
 * Property 12: features/last-run.json の scenarios は、結合条件を満たす spec の ID のうち、まとめて未実行にならないもの
 *
 * results.json を持つ対象フィクスチャ全件で、`--run-id P12` で書いた features/last-run.json の scenarios のキーの集合が、
 * テストの側で独立に求めた集合(結合条件を満たす spec の ID のうち、test の結果を fail > 既知バグ > skip > pass でまとめて skip にならないもの)と同じで、
 * キーが文字コード順に並ぶ。結び付きでは絞らないので、不明 ID 参照の test の ID も入る。
 * 非自明性(フィクスチャ側の確認): skip だけの ID(consistent の REQ-001-10)が除かれる場合がある
 *
 * **Validates: Requirements 5.2**
 */
test('Property 12: features/last-run.json の scenarios は、結合条件を満たす spec の ID のうち、まとめて未実行にならないものを文字コード順に持つ', () => {
  type Kind = 'fail' | 'known-bug' | 'skip' | 'pass';
  const PRIORITY: readonly Kind[] = ['fail', 'known-bug', 'skip', 'pass'];
  /** test 1 つの結果(design 1.5 の表をテストの側で書き直したもの) */
  const kindOf = (t: ResultsTest): Kind => {
    if (t.status === 'skipped') return 'skip';
    if (t.expectedStatus === 'failed') return t.status === 'expected' ? 'known-bug' : 'fail';
    return t.status === 'expected' ? 'pass' : 'fail';
  };

  let checked = 0;
  let sawSkipOnly = false;
  for (const fixture of PROPERTY_FIXTURES) {
    if (!hasResults(fixture)) continue;
    const results = JSON.parse(fs.readFileSync(path.join(FIXTURES_DIR, fixture, RESULTS_PATH), 'utf8')) as ResultsJson;
    const kinds = new Map<string, Kind[]>();
    for (const spec of allSpecs(results)) {
      const id = conformingIdOf(spec);
      if (id === null) continue;
      kinds.set(id, [...(kinds.get(id) ?? []), ...spec.tests.map(kindOf)]);
    }
    const expectedKeys: string[] = [];
    for (const [id, list] of kinds) {
      const summarized = PRIORITY.find((kind) => list.includes(kind));
      if (summarized === 'skip') sawSkipOnly = true;
      if (summarized !== undefined && summarized !== 'skip') expectedKeys.push(id);
    }

    const r = runTool(fixture, ['--run-id', 'P12']);
    assert.ok(r.status === 0 || r.status === 1, `${fixture}: 終了コードが 0 でも 1 でもない(${r.status}):\n${r.stderr}`);
    const keys = Object.keys(readLastRun(r.dir).scenarios);
    assert.deepEqual(new Set(keys), new Set(expectedKeys), `${fixture}: scenarios のキーの集合が違う`);
    assert.deepEqual(keys, [...keys].sort(), `${fixture}: scenarios のキーが文字コード順でない`);
    checked++;
  }
  assert.ok(checked > 0, 'results.json を持つフィクスチャが無い');
  assert.ok(sawSkipOnly, 'skip だけの ID を持つフィクスチャが無く、未実行の ID を除くことが検証されていない');
});
