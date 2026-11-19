// 照合ツール e2e-trace
//
// features/*.feature、features/feature-map.json、tests/e2e/**/*.spec.ts、test-results/results.json から
// 要件 ID とシナリオ ID をリテラル抽出し、完全一致だけで突き合わせて、不整合と機能ごとの結果の件数を標準出力に出す。
// feature-map.json は、形式と、.feature との食い違いを検査する。
//
// 実行: node scripts/e2e-trace.mts [--run-id <実行ID>]
//   - 引数なしは検査だけをして、何も書かない
//   - --run-id を付けると、検査に加えて features/last-run.json(全体実行の結果の控え)を書く。全体実行の後にだけ使う
//   - Node.js 22.18 以上。型ストリップで直接実行する(トランスパイル工程なし)
//   - 依存は Node 標準モジュールのみ
//   - TypeScript は消去可能な構文(型注釈・type・interface・import type)だけを使う
//   - 直接実行されたときだけ CLI として動く。ビューアは inspect などの関数を import して使う
//
// 標準出力: 1 行目に実行 ID と結果の開始日時、`## 集計`、`## 不整合`、最後に書き出しの有無を示す 1 行
// 終了コード: 0 = 不整合なし / 1 = 不整合あり / 2 = 実行不能(引数の誤りを含む)。テストの fail は影響しない

/** 照合ツールの版。中身を変えるたびに 1 増やす。導入先のコピーがスキルの原本より古いかを、エージェントがこの行で確かめる */
export const TRACE_TOOL_VERSION = 2;

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

// ---- 共通 ----

type ExitCode = 0 | 1 | 2;

/** 入力が読めない・出力が書けないなど、処理を中断して終了コード 2 で終わる状況 */
class FatalError extends Error {}

function describeError(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

function errnoCode(e: unknown): string | undefined {
  return typeof e === 'object' && e !== null && 'code' in e && typeof e.code === 'string' ? e.code : undefined;
}

// ---- 引数解釈 ----

interface Options {
  /** 1 行目と features/last-run.json に書く実行 ID。指定が無ければ null で、features/last-run.json を書かない */
  runId: string | null;
}

type ParsedArgs = { ok: true; options: Options } | { ok: false; message: string };

const USAGE = '使い方: node scripts/e2e-trace.mts [--run-id <実行ID>]';

function parseArgs(argv: readonly string[]): ParsedArgs {
  const options: Options = { runId: null };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--run-id') {
      const value = argv[i + 1];
      if (value === undefined || value.startsWith('--')) {
        return { ok: false, message: '--run-id には実行 ID の値が必要です' };
      }
      options.runId = value;
      i++;
    } else {
      return { ok: false, message: `未知の引数: ${arg}` };
    }
  }
  return { ok: true, options };
}

// ---- 中間モデル: feature 読み取りの結果 ----

/** 要件(`Rule:`)。本文が要件の書式に一致しない Rule もここに入る(requirementId が null) */
export interface RuleRecord {
  /** `REQ-<数字>`。無ければ null */
  requirementId: string | null;
  /** 要件文。要件 ID が無ければ `Rule:` の後ろ全体 */
  text: string;
  line: number;
  /** 直前の `# 引用元:`。無ければ null */
  source: string | null;
}

/** ID 未付与の理由(design 1.7)。不整合節の対象欄にこの文字列のまま載せる */
export type MissingIdReason =
  | 'タグ無し'
  | '名前先頭に ID 無し'
  | 'タグと名前の ID が異なる'
  | 'タグの ID が複数'
  | 'Rule 外'
  | 'Rule に要件 ID 無し'
  | '要件番号が Rule と異なる';

/** 有効なシナリオ ID(値はタグの ID)か、ID 未付与とその理由 */
export type ScenarioIdJudgment = { kind: 'valid'; id: string } | { kind: 'missing'; reason: MissingIdReason };

/** シナリオ(`Scenario:` / `Scenario Outline:`) */
export interface ScenarioRecord {
  /** `Scenario:` の後ろの名前そのまま */
  rawName: string;
  /** 先頭のシナリオ ID を除いた名前 */
  displayName: string;
  line: number;
  isOutline: boolean;
  /** 直前のタグ行に書かれたタグ全部(`@` 付き、書かれた順)。ID 以外のタグも含む */
  tags: string[];
  /** tags のうち `@REQ-<数字>-<数字>` 形式のもの(`@` を除いた値) */
  tagIds: string[];
  /** 名前先頭のシナリオ ID。無ければ null */
  nameId: string | null;
  /** 所属する Rule。Rule 外なら null */
  rule: RuleRecord | null;
  /** 継承後の引用元(Scenario 直前 > Rule > Feature)。無ければ null */
  source: string | null;
  /** その Scenario の直前に書かれた `# 引用元:`。Rule や Feature からは継承しない。無ければ null */
  ownSource: string | null;
  /** 有効なシナリオ ID の判定結果。missing のシナリオは以降の照合でテストと結ばない */
  idJudgment: ScenarioIdJudgment;
}

/** 1 つの .feature ファイル */
export interface FeatureFile {
  /** プロジェクトルートからの POSIX パス(features/<slug>.feature) */
  path: string;
  slug: string;
  /** `Feature:` の名前。無ければ slug */
  name: string;
  source: string | null;
  rules: RuleRecord[];
  /** 全シナリオ(行順)。Rule 配下かどうかは各要素の rule で判別する */
  scenarios: ScenarioRecord[];
}

// ---- feature 読み取り ----

const FEATURES_DIR = 'features';
const FEATURE_EXT = '.feature';

const SOURCE_COMMENT_RE = /^#\s*引用元:\s*(.+)$/;
const TAG_LINE_RE = /^@\S+(?:\s+@\S+)*$/;
const TAG_ID_RE = /^@REQ-\d+-\d+$/;
const FEATURE_LINE_RE = /^Feature:\s*(.*)$/;
const RULE_WITH_ID_RE = /^Rule:\s*(REQ-\d+)\s+(.+)$/;
const RULE_LINE_RE = /^Rule:\s*(.*)$/;
const SCENARIO_LINE_RE = /^Scenario( Outline)?:\s*(.*)$/;
/** 名前先頭のシナリオ ID。直後が空白か行末のときだけ一致する(`REQ-001-1x` のように ID に文字が続く名前は ID 無しとみなす) */
const NAME_LEADING_ID_RE = /^(REQ-\d+-\d+)(?=\s|$)/;

/** シナリオ ID `REQ-<数字>-<数字>` から要件 ID `REQ-<数字>` の部分を取る(最後のハイフンより前) */
function requirementPartOf(scenarioId: string): string {
  return scenarioId.slice(0, scenarioId.lastIndexOf('-'));
}

/**
 * 有効なシナリオ ID を決める(design 1.3)。次をすべて満たすときだけ有効で、値はタグの ID:
 *   1. `@REQ-<数字>-<数字>` 形式のタグがちょうど 1 つ
 *   2. 名前先頭に ID があり、タグの ID と文字列一致
 *   3. 所属 Rule に要件 ID があり、シナリオ ID の `REQ-<数字>` 部分と文字列一致
 * 満たさないときは理由を 1 つだけ返す。理由は条件 1 → 2 → 3 の順に、先に破れた条件で決める
 * (タグ無し / タグの ID が複数 → 名前先頭に ID 無し / タグと名前の ID が異なる → Rule 外 / Rule に要件 ID 無し / 要件番号が Rule と異なる)。
 */
function judgeScenarioId(tagIds: readonly string[], nameId: string | null, rule: RuleRecord | null): ScenarioIdJudgment {
  if (tagIds.length === 0) return { kind: 'missing', reason: 'タグ無し' };
  if (tagIds.length >= 2) return { kind: 'missing', reason: 'タグの ID が複数' };
  const id = tagIds[0];
  if (nameId === null) return { kind: 'missing', reason: '名前先頭に ID 無し' };
  if (nameId !== id) return { kind: 'missing', reason: 'タグと名前の ID が異なる' };
  if (rule === null) return { kind: 'missing', reason: 'Rule 外' };
  if (rule.requirementId === null) return { kind: 'missing', reason: 'Rule に要件 ID 無し' };
  if (requirementPartOf(id) !== rule.requirementId) return { kind: 'missing', reason: '要件番号が Rule と異なる' };
  return { kind: 'valid', id };
}

/**
 * .feature の本文を行単位の状態機械で読む(design 1.3)。
 * 各行を trim して先頭で分類し、ステップ・表・docstring・空行・引用元以外のコメントは無視する。
 */
function parseFeature(relPath: string, slug: string, text: string): FeatureFile {
  const feature: FeatureFile = { path: relPath, slug, name: slug, source: null, rules: [], scenarios: [] };
  let currentRule: RuleRecord | null = null;
  // 保留: 次の Feature: / Rule: / Scenario: に付く引用元と、次の Scenario: に付くタグ
  let pendingSource: string | null = null;
  let pendingTags: string[] = [];

  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lineNo = i + 1;
    if (line === '') continue;

    const sourceMatch = SOURCE_COMMENT_RE.exec(line);
    if (sourceMatch) {
      pendingSource = sourceMatch[1].trim();
      continue;
    }
    if (line.startsWith('#')) continue;

    if (TAG_LINE_RE.test(line)) {
      pendingTags.push(...line.split(/\s+/));
      continue;
    }

    const featureMatch = FEATURE_LINE_RE.exec(line);
    if (featureMatch) {
      if (featureMatch[1] !== '') feature.name = featureMatch[1];
      feature.source = pendingSource;
      pendingSource = null;
      pendingTags = [];
      continue;
    }

    const ruleMatch = RULE_LINE_RE.exec(line);
    if (ruleMatch) {
      const withId = RULE_WITH_ID_RE.exec(line);
      currentRule = {
        requirementId: withId ? withId[1] : null,
        text: withId ? withId[2] : ruleMatch[1],
        line: lineNo,
        source: pendingSource,
      };
      feature.rules.push(currentRule);
      pendingSource = null;
      pendingTags = [];
      continue;
    }

    if (line.startsWith('Background:') || line.startsWith('Examples:')) {
      pendingSource = null;
      pendingTags = [];
      continue;
    }

    const scenarioMatch = SCENARIO_LINE_RE.exec(line);
    if (scenarioMatch) {
      const rawName = scenarioMatch[2];
      const idMatch = NAME_LEADING_ID_RE.exec(rawName);
      const nameId = idMatch ? idMatch[1] : null;
      const tagIds = pendingTags.filter((t) => TAG_ID_RE.test(t)).map((t) => t.slice(1));
      feature.scenarios.push({
        rawName,
        displayName: nameId ? rawName.slice(nameId.length).trim() : rawName,
        line: lineNo,
        isOutline: scenarioMatch[1] !== undefined,
        tags: pendingTags,
        tagIds,
        nameId,
        rule: currentRule,
        source: pendingSource ?? currentRule?.source ?? feature.source,
        ownSource: pendingSource,
        idJudgment: judgeScenarioId(tagIds, nameId, currentRule),
      });
      pendingSource = null;
      pendingTags = [];
    }
    // それ以外(ステップ、表、docstring、Feature の説明文など)は無視
  }
  return feature;
}

/**
 * プロジェクトのルート root の `features/` 直下の `*.feature` をパス順に読む。
 * `features/` が無ければ 0 件。ファイルが読めなければ FatalError(終了コード 2)。
 */
function readFeatureFiles(root: string): FeatureFile[] {
  let names: string[];
  try {
    names = fs
      .readdirSync(path.join(root, FEATURES_DIR), { withFileTypes: true })
      .filter((entry) => !entry.isDirectory() && entry.name.endsWith(FEATURE_EXT))
      .map((entry) => entry.name)
      .sort();
  } catch (e) {
    if (errnoCode(e) === 'ENOENT') return [];
    throw new FatalError(`${FEATURES_DIR} を読めません: ${describeError(e)}`);
  }
  return names.map((name) => {
    const relPath = path.posix.join(FEATURES_DIR, name);
    let text: string;
    try {
      text = fs.readFileSync(path.join(root, FEATURES_DIR, name), 'utf8');
    } catch (e) {
      throw new FatalError(`${relPath} を読めません: ${describeError(e)}`);
    }
    return parseFeature(relPath, name.slice(0, -FEATURE_EXT.length), text);
  });
}

// ---- 中間モデル: spec 読み取りの結果 ----

/** テストファイル内の 1 つの test 宣言(`test(` / `test.fail(` / `test.fixme(` / `test.skip(` / `test.only(`) */
interface TestDeclaration {
  /** 第 1 引数の文字列リテラルの中身(引用符を除いたそのまま。エスケープは戻さず、テンプレートリテラルは `${...}` を含む全体) */
  name: string;
  /** 名前先頭のシナリオ ID。無ければ null。テンプレートリテラルは最初の `${` より前だけを見る */
  nameId: string | null;
  /** 第 2 引数(テスト詳細)の `tag` のうち `@REQ-<数字>-<数字>` 形式のもの(`@` を除いた値、書かれた順)。他の tag は含めない */
  tagIds: string[];
  /** `test` の一致位置の行番号(1 始まり) */
  line: number;
}

/** 1 つの .spec.ts ファイル */
interface SpecFile {
  /** プロジェクトルートからの POSIX パス(tests/e2e/<slug>/<file>.spec.ts) */
  path: string;
  /** `tests/e2e/` 直下のディレクトリ名。`tests/e2e/` 直下に置かれたファイルなら '' */
  slug: string;
  /** 全 test 宣言(出現順) */
  tests: TestDeclaration[];
}

// ---- spec 読み取り ----

const SPECS_DIR = 'tests/e2e';
const SPEC_EXT = '.spec.ts';

/** 文字列リテラル 3 種(エスケープ許容)。`'` `"` は行内に収まるもの、バッククォートは改行と `${...}` を含んでよい */
const STRING_LITERAL_RE = /'(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\[\s\S])*`/;
const STRING_LITERAL_GLOBAL_RE = new RegExp(STRING_LITERAL_RE.source, 'g');
/**
 * test 宣言(design 1.4)。第 1 引数の文字列リテラルを 1、`{` で始まる第 2 引数(テスト詳細。最初の `}` まで)を 2 に捕まえる。
 * `test` の直後が `(` か `.fail|.fixme|.skip|.only` + `(` のときだけ一致し、`test.describe(` `test.use(` `test.beforeEach(` 等には一致しない。
 * 引数ごとに改行した宣言は `\s*` で吸収する。
 */
const TEST_DECLARATION_RE = new RegExp(
  String.raw`\btest(?:\.(?:fail|fixme|skip|only))?\s*\(\s*(${STRING_LITERAL_RE.source})\s*(?:,\s*(\{[^}]*\}))?`,
  'g',
);
/** テスト詳細の `tag:`。値は文字列リテラル 1 つ(1)か、文字列リテラルの配列(2 は `[` `]` の中身) */
const TAG_PROPERTY_RE = new RegExp(String.raw`\btag\s*:\s*(?:(${STRING_LITERAL_RE.source})|\[([^\]]*)\])`);

/** 引用符を除いた中身を返す */
function literalContent(literal: string): string {
  return literal.slice(1, -1);
}

/** text の index 位置が何行目か(1 始まり)。一致位置までの改行数で求める */
function lineNumberAt(text: string, index: number): number {
  let line = 1;
  for (let i = 0; i < index; i++) {
    if (text.charCodeAt(i) === 10) line++;
  }
  return line;
}

/** テスト詳細 `{ ... }` の `tag` からシナリオ ID を取る。`@REQ-<数字>-<数字>` 形式以外の tag と `annotation` は読まない */
function extractTagIds(details: string): string[] {
  const match = TAG_PROPERTY_RE.exec(details);
  if (!match) return [];
  const literals = match[1] !== undefined ? [match[1]] : [...match[2].matchAll(STRING_LITERAL_GLOBAL_RE)].map((m) => m[0]);
  return literals
    .map(literalContent)
    .filter((value) => TAG_ID_RE.test(value))
    .map((value) => value.slice(1));
}

/** .spec.ts の本文から test 宣言を全件走査する(design 1.4)。TypeScript は解析しない。トレーサビリティヘッダは読まない */
function parseSpec(relPath: string, slug: string, text: string): SpecFile {
  const tests: TestDeclaration[] = [];
  for (const match of text.matchAll(TEST_DECLARATION_RE)) {
    const literal = match[1];
    const name = literalContent(literal);
    // テンプレートリテラルは `${` より前で名前先頭 ID を見る
    const idSource = literal.startsWith('`') ? name.split('${')[0] : name;
    const idMatch = NAME_LEADING_ID_RE.exec(idSource);
    tests.push({
      name,
      nameId: idMatch ? idMatch[1] : null,
      tagIds: match[2] === undefined ? [] : extractTagIds(match[2]),
      line: lineNumberAt(text, match.index),
    });
  }
  return { path: relPath, slug, tests };
}

/** root からの POSIX 相対パス relDir の中身を読む。読めなければ FatalError */
function readDirEntries(root: string, relDir: string): fs.Dirent[] {
  try {
    return fs.readdirSync(path.join(root, relDir), { withFileTypes: true });
  } catch (e) {
    throw new FatalError(`${relDir} を読めません: ${describeError(e)}`);
  }
}

/** relDir 配下を再帰的に辿り、`*.spec.ts` の POSIX 相対パスを out に集める */
function collectSpecPaths(root: string, relDir: string, out: string[]): void {
  for (const entry of readDirEntries(root, relDir)) {
    const rel = path.posix.join(relDir, entry.name);
    if (entry.isDirectory()) {
      collectSpecPaths(root, rel, out);
    } else if (entry.name.endsWith(SPEC_EXT)) {
      out.push(rel);
    }
  }
}

/**
 * プロジェクトのルート root の `tests/e2e/` 配下の `*.spec.ts` を再帰的に列挙し、パス順に読む。
 * `tests/e2e/` が無ければ 0 件。ファイルが読めなければ FatalError(終了コード 2)。
 */
function readSpecFiles(root: string): SpecFile[] {
  try {
    fs.statSync(path.join(root, SPECS_DIR));
  } catch (e) {
    if (errnoCode(e) === 'ENOENT') return [];
    // それ以外の失敗は readDirEntries で FatalError にする
  }
  const relPaths: string[] = [];
  collectSpecPaths(root, SPECS_DIR, relPaths);
  relPaths.sort();
  return relPaths.map((relPath) => {
    let text: string;
    try {
      text = fs.readFileSync(path.join(root, relPath), 'utf8');
    } catch (e) {
      throw new FatalError(`${relPath} を読めません: ${describeError(e)}`);
    }
    // slug = tests/e2e/ 直下のディレクトリ名。直下のファイルなら ''
    const under = relPath.slice(SPECS_DIR.length + 1);
    const slash = under.indexOf('/');
    return parseSpec(relPath, slash === -1 ? '' : under.slice(0, slash), text);
  });
}

// ---- 中間モデル: feature-map 読み取りの結果 ----

export type FeatureStatus = '未着手' | '定義済み' | 'テスト済み' | '対象外';

/** feature-map の機能 1 つ。表に無い欄は読まない */
export interface FeatureMapFeature {
  name: string;
  slug: string;
  status: FeatureStatus;
  summary: string;
  includes: string[];
  excludes?: string[];
  sources?: string[];
  questions?: string[];
  decided?: string;
}

/** 機能にするか決まっていない候補 1 つ */
export interface FeatureMapCandidate {
  name: string;
  slug: string;
  reason: string;
  sources?: string[];
}

/** 検査を通った features/feature-map.json の中身 */
export interface FeatureMap {
  app: string;
  roles?: string[];
  baseline_data?: string;
  /** coverage.md の計測の設定。中の欄は検査しない */
  coverage?: Record<string, unknown>;
  features: FeatureMapFeature[];
  candidates?: FeatureMapCandidate[];
}

/** feature-map の形式の誤り 1 件 */
interface FeatureMapProblem {
  /** 機能の列。誤りのある項目の name、無ければ `—` */
  feature: string;
  /** 対象の欄で `features/feature-map.json ` の後ろに続ける文(例 `features[1].summary が無い`) */
  message: string;
}

interface FeatureMapReading {
  /** ファイルが無い。.feature の有無で扱いが変わるので、problems には入れずに inspect が決める */
  missing: boolean;
  /** 検査を通った中身。ファイルが無い、読めない、形式の誤りが 1 つでもあれば null */
  map: FeatureMap | null;
  /** 形式の誤り(見つけた順) */
  problems: FeatureMapProblem[];
}

// ---- feature-map 読み取り ----

const FEATURE_MAP_PATH = 'features/feature-map.json';
const STATUSES: readonly FeatureStatus[] = ['未着手', '定義済み', 'テスト済み', '対象外'];
/** 定義済みとテスト済みは .feature が要る */
const STATUSES_WITH_FEATURE: readonly FeatureStatus[] = ['定義済み', 'テスト済み'];

/** 欄の値の検査。誤りがあれば、欄の名前の後ろに空白を挟んで続ける文を返す */
type FieldRule = (value: unknown) => string | null;

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

/** 必須の文字列。空文字列も抜けとする */
const requiredString: FieldRule = (value) => {
  if (value === undefined || value === '') return 'が無い';
  return typeof value === 'string' ? null : 'が文字列でない';
};
const optionalString: FieldRule = (value) => (value === undefined || typeof value === 'string' ? null : 'が文字列でない');
const optionalStringArray: FieldRule = (value) => (value === undefined || isStringArray(value) ? null : 'が文字列の配列でない');
const optionalObject: FieldRule = (value) => (value === undefined || isRecord(value) ? null : 'がオブジェクトでない');
/** 1 つ以上の文字列の配列 */
const requiredStringList: FieldRule = (value) => {
  if (value === undefined) return 'が無い';
  if (!isStringArray(value)) return 'が文字列の配列でない';
  return value.length === 0 ? 'が空' : null;
};
const statusRule: FieldRule = (value) => {
  const error = requiredString(value);
  if (error !== null) return error;
  return (STATUSES as readonly unknown[]).includes(value) ? null : `の「${value}」が ${STATUSES.join('・')} のどれでもない`;
};

/** 検査する欄と検査の順(設計書の欄の表に従う。表に無い欄は読まない) */
const TOP_LEVEL_FIELDS: readonly (readonly [string, FieldRule])[] = [
  ['app', requiredString],
  ['roles', optionalStringArray],
  ['baseline_data', optionalString],
  ['coverage', optionalObject],
];
const FEATURE_FIELDS: readonly (readonly [string, FieldRule])[] = [
  ['name', requiredString],
  ['slug', requiredString],
  ['status', statusRule],
  ['summary', requiredString],
  ['includes', requiredStringList],
  ['excludes', optionalStringArray],
  ['sources', optionalStringArray],
  ['questions', optionalStringArray],
  ['decided', optionalString],
];
const CANDIDATE_FIELDS: readonly (readonly [string, FieldRule])[] = [
  ['name', requiredString],
  ['slug', requiredString],
  ['reason', requiredString],
  ['sources', optionalStringArray],
];

/** record の欄を fields の順に検査し、誤りを problems に足す。prefix は欄の名前の前に付ける場所(`features[1].` など) */
function checkFields(
  record: Record<string, unknown>,
  fields: readonly (readonly [string, FieldRule])[],
  prefix: string,
  feature: string,
  problems: FeatureMapProblem[],
): void {
  for (const [name, rule] of fields) {
    const error = rule(record[name]);
    if (error !== null) problems.push({ feature, message: `${prefix}${name} ${error}` });
  }
}

/** 配列の欄 key(features か candidates)と、その各項目を検査する */
function checkItems(
  map: Record<string, unknown>,
  key: string,
  required: boolean,
  fields: readonly (readonly [string, FieldRule])[],
  problems: FeatureMapProblem[],
): void {
  const value = map[key];
  if (value === undefined) {
    if (required) problems.push({ feature: '—', message: `${key} が無い` });
    return;
  }
  if (!Array.isArray(value)) {
    problems.push({ feature: '—', message: `${key} が配列でない` });
    return;
  }
  value.forEach((item: unknown, index) => {
    const where = `${key}[${index}]`;
    if (!isRecord(item)) {
      problems.push({ feature: '—', message: `${where} がオブジェクトでない` });
      return;
    }
    const feature = typeof item.name === 'string' && item.name !== '' ? item.name : '—';
    checkFields(item, fields, `${where}.`, feature, problems);
  });
}

/**
 * プロジェクトのルート root の `features/feature-map.json` を読んで形式を検査する。
 * 先頭の BOM を除いてから JSON.parse する。読めないことも形式の誤りとして返し、FatalError にはしない。
 */
function readFeatureMap(root: string): FeatureMapReading {
  let text: string;
  try {
    text = fs.readFileSync(path.join(root, FEATURE_MAP_PATH), 'utf8');
  } catch (e) {
    if (errnoCode(e) === 'ENOENT') return { missing: true, map: null, problems: [] };
    return { missing: false, map: null, problems: [{ feature: '—', message: `を読めない(${describeError(e)})` }] };
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(text.replace(/^\uFEFF/, ''));
  } catch (e) {
    return { missing: false, map: null, problems: [{ feature: '—', message: `を JSON として読めない(${describeError(e)})` }] };
  }
  if (!isRecord(parsed)) return { missing: false, map: null, problems: [{ feature: '—', message: 'の中身がオブジェクトでない' }] };

  const problems: FeatureMapProblem[] = [];
  checkFields(parsed, TOP_LEVEL_FIELDS, '', '—', problems);
  checkItems(parsed, 'features', true, FEATURE_FIELDS, problems);
  checkItems(parsed, 'candidates', false, CANDIDATE_FIELDS, problems);
  // 検査を通った値をそのまま使う。表に無い欄も残るが、照合ツールもビューアも読まない
  return { missing: false, map: problems.length === 0 ? (parsed as unknown as FeatureMap) : null, problems };
}

// ---- 照合(ID のリテラル一致。design 1.6) ----

/**
 * test 宣言の分類。表示用の文字列(孤立テスト / ID 不一致 / 不明 ID 参照)は不整合判定で付ける。
 *   - bound   : 結合済み。名前先頭 ID と tag ID が同じ 1 つの ID で、索引にある
 *   - orphan  : 孤立テスト。名前先頭 ID も tag ID も無い
 *   - mismatch: ID 不一致。一方だけにある / 両方あるが異なる / tag の ID が 2 つ以上(ID そのものは TestDeclaration の nameId と tagIds を見る)
 *   - unknown : 不明 ID 参照。名前と tag は一致したが、その ID を持つ有効な Scenario が無い
 */
type TestClassification = { kind: 'bound'; id: string } | { kind: 'orphan' } | { kind: 'mismatch' } | { kind: 'unknown'; id: string };

/** 索引の要素。重複 ID の報告に .feature のパスと行番号が要るので、所属する FeatureFile と組にする */
interface IndexedScenario {
  feature: FeatureFile;
  scenario: ScenarioRecord;
}

/** 分類済みの test 宣言。不整合の対象欄にパス・行番号・slug が要るので、所属する SpecFile と組にする */
interface ClassifiedTest {
  spec: SpecFile;
  test: TestDeclaration;
  classification: TestClassification;
}

/** 照合の結果。以降の不整合判定・最新結果の導出・描画はこれを読む */
interface MatchResult {
  /** 有効なシナリオ ID → その ID を持つ Scenario。重複があれば全件(.feature のパス順 → 行順)を保持する */
  scenarioIndex: Map<string, IndexedScenario[]>;
  /** 全 test 宣言の分類(テストファイルのパス順 → 出現順) */
  tests: ClassifiedTest[];
  /** シナリオ ID → 結ばれたテストファイルのパス(重複なし、パス順)。1 つも結ばれていない ID は載らない */
  boundSpecPaths: Map<string, string[]>;
}

/** 有効なシナリオ ID → Scenario の索引。ID 未付与のシナリオは入れない(テストと結ばない) */
function indexScenarios(features: readonly FeatureFile[]): Map<string, IndexedScenario[]> {
  const index = new Map<string, IndexedScenario[]>();
  for (const feature of features) {
    for (const scenario of feature.scenarios) {
      if (scenario.idJudgment.kind !== 'valid') continue;
      const entries = index.get(scenario.idJudgment.id) ?? [];
      entries.push({ feature, scenario });
      index.set(scenario.idJudgment.id, entries);
    }
  }
  return index;
}

/** test 宣言を分類する(design 1.6 の 2)。名前先頭 ID と tag ID がちょうど 1 つずつあり文字列一致するときだけ ID が決まる */
function classifyTest(test: TestDeclaration, scenarioIndex: ReadonlyMap<string, unknown>): TestClassification {
  const { nameId, tagIds } = test;
  if (nameId === null && tagIds.length === 0) return { kind: 'orphan' };
  if (nameId === null || tagIds.length !== 1 || tagIds[0] !== nameId) return { kind: 'mismatch' };
  return scenarioIndex.has(nameId) ? { kind: 'bound', id: nameId } : { kind: 'unknown', id: nameId };
}

/**
 * シナリオとテストを ID のリテラル一致だけで結ぶ(design 1.6 の 1〜3)。
 * 結合済みの test はそのシナリオ ID にテストファイルのパスを結ぶ。同じファイル内の複数 test(Outline 展開)は 1 パスに集約する。
 * 同じ ID を持つ Scenario が複数あっても(重複 ID)、ID をキーにするので全員が同じパス一覧を見る。
 */
function matchScenariosAndTests(features: readonly FeatureFile[], specs: readonly SpecFile[]): MatchResult {
  const scenarioIndex = indexScenarios(features);
  const tests: ClassifiedTest[] = [];
  const boundSpecPaths = new Map<string, string[]>();
  // specs は readSpecFiles がパス順に並べているので、push した順がそのままパス順になる
  for (const spec of specs) {
    for (const test of spec.tests) {
      const classification = classifyTest(test, scenarioIndex);
      tests.push({ spec, test, classification });
      if (classification.kind !== 'bound') continue;
      const paths = boundSpecPaths.get(classification.id) ?? [];
      if (!paths.includes(spec.path)) paths.push(spec.path);
      boundSpecPaths.set(classification.id, paths);
    }
  }
  return { scenarioIndex, tests, boundSpecPaths };
}

/** シナリオに結ばれたテストファイルのパス(パス順)。ID 未付与、または 1 つも結ばれていなければ空。照合の結果(MatchResult か Inspection)から引く */
function boundSpecPathsOf(source: { boundSpecPaths: ReadonlyMap<string, readonly string[]> }, scenario: ScenarioRecord): readonly string[] {
  return scenario.idJudgment.kind === 'valid' ? (source.boundSpecPaths.get(scenario.idJudgment.id) ?? []) : [];
}

// ---- 不整合判定 ----

/** 不整合の種別(design 1.7 の表の順の後ろに、feature-map の検査の 4 種)。配列の順が不整合節の並び順になる */
const INCONSISTENCY_KINDS = [
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
] as const;
export type InconsistencyKind = (typeof INCONSISTENCY_KINDS)[number];

/** 不整合の出どころ。直すファイルが .feature か、テストファイルか、feature-map か */
export type InconsistencyOrigin = 'feature' | 'test' | 'feature-map';

/** 不整合節の 1 行 */
export interface Inconsistency {
  kind: InconsistencyKind;
  origin: InconsistencyOrigin;
  /**
   * 機能欄。slug が feature-map の機能にあればその name、無ければその slug の `features/<slug>.feature` の Feature 名、
   * それも無ければ slug、slug が無い(`tests/e2e/` 直下のファイル)なら `—`。.feature 側の項目はその .feature の slug で決める。
   * 複数の .feature にまたがる重複 ID と slug の重なりは、関係する名前を重ねずに ` / ` で連結する
   */
  feature: string;
  /** 対象欄(design 1.7 の書式) */
  target: string;
  /**
   * 同種別内の並び順に使う。.feature またはテストファイルのパス → 行番号。
   * feature-map の形式、.feature の無い機能、slug の重なりは features/feature-map.json と、見つけた順の通し番号(1 から)
   */
  sortPath: string;
  sortLine: number;
}

/** 種別は INCONSISTENCY_KINDS の順、同種別内はパス → 行番号。それも同じなら対象欄の文字列で決める(並びを完全に決定的にする) */
function compareInconsistencies(a: Inconsistency, b: Inconsistency): number {
  const kindDiff = INCONSISTENCY_KINDS.indexOf(a.kind) - INCONSISTENCY_KINDS.indexOf(b.kind);
  if (kindDiff !== 0) return kindDiff;
  if (a.sortPath !== b.sortPath) return a.sortPath < b.sortPath ? -1 : 1;
  if (a.sortLine !== b.sortLine) return a.sortLine - b.sortLine;
  return a.target < b.target ? -1 : a.target > b.target ? 1 : 0;
}

/**
 * 機能欄を slug から決める関数を作る。feature-map の機能の name → slug と同名の .feature の Feature 名 → slug → slug が無ければ `—`。
 * feature-map が null なら Feature 名から決める。同じ slug の機能が feature-map に複数あれば(slug の重なり)先のものを使う
 */
function makeFeatureNameOfSlug(features: readonly FeatureFile[], map: FeatureMap | null): (slug: string) => string {
  const mapNames = new Map<string, string>();
  for (const item of map?.features ?? []) {
    if (!mapNames.has(item.slug)) mapNames.set(item.slug, item.name);
  }
  const featureNames = new Map(features.map((feature) => [feature.slug, feature.name]));
  return (slug) => (slug === '' ? '—' : (mapNames.get(slug) ?? featureNames.get(slug) ?? slug));
}

/**
 * 未生成(design 1.7):
 *   (要件)配下のシナリオのいずれにもテストファイルが結ばれていない Rule。配下が 0 件の Rule も含む。
 *         要件 ID の無い Rule は対象外(配下のシナリオが ID 未付与として報告される)
 *   (シナリオ)有効な ID を持つがテストファイルが結ばれていない Scenario
 */
function detectUngenerated(
  features: readonly FeatureFile[],
  match: MatchResult,
  featureNameOfSlug: (slug: string) => string,
): Inconsistency[] {
  const result: Inconsistency[] = [];
  for (const feature of features) {
    const featureName = featureNameOfSlug(feature.slug);
    for (const rule of feature.rules) {
      if (rule.requirementId === null) continue;
      const hasBound = feature.scenarios.some((s) => s.rule === rule && boundSpecPathsOf(match, s).length > 0);
      if (hasBound) continue;
      result.push({
        kind: '未生成',
        origin: 'feature',
        feature: featureName,
        target: `${rule.requirementId}(配下のシナリオにテストが無い)`,
        sortPath: feature.path,
        sortLine: rule.line,
      });
    }
    for (const scenario of feature.scenarios) {
      if (scenario.idJudgment.kind !== 'valid' || boundSpecPathsOf(match, scenario).length > 0) continue;
      result.push({
        kind: '未生成',
        origin: 'feature',
        feature: featureName,
        target: `${scenario.idJudgment.id} ${scenario.displayName}`,
        sortPath: feature.path,
        sortLine: scenario.line,
      });
    }
  }
  return result;
}

/** test 宣言の分類(design 1.6 の 2)を不整合の種別と対象欄に写す。結合済みなら null */
function describeTestClassification({ spec, test, classification }: ClassifiedTest): { kind: InconsistencyKind; target: string } | null {
  const where = `${spec.path} L${test.line}`;
  switch (classification.kind) {
    case 'bound':
      return null;
    case 'orphan':
      return { kind: '孤立テスト', target: `${where} test「${test.name}」` };
    case 'unknown':
      return { kind: '不明 ID 参照', target: `${where} ${classification.id}` };
    case 'mismatch': {
      const tag = test.tagIds.length > 0 ? test.tagIds.join(', ') : '—';
      return { kind: 'ID 不一致', target: `${where} 名前: ${test.nameId ?? '—'} / tag: ${tag}` };
    }
  }
}

/** 孤立テスト / 不明 ID 参照 / ID 不一致: 結合済み以外の test 宣言を 1 件 1 行で報告する */
function detectTestSideInconsistencies(match: MatchResult, featureNameOfSlug: (slug: string) => string): Inconsistency[] {
  const result: Inconsistency[] = [];
  for (const classified of match.tests) {
    const described = describeTestClassification(classified);
    if (described === null) continue;
    result.push({
      ...described,
      origin: 'test',
      feature: featureNameOfSlug(classified.spec.slug),
      sortPath: classified.spec.path,
      sortLine: classified.test.line,
    });
  }
  return result;
}

/** .feature 側の重複 ID の 1 行。場所は .feature のパス順 → 行順で渡される。機能欄は関係する機能の名前を重複除去して ` / ` で連結する */
function featureSideDuplicate(
  id: string,
  places: readonly { feature: FeatureFile; line: number }[],
  featureNameOfSlug: (slug: string) => string,
): Inconsistency {
  return {
    kind: '重複 ID',
    origin: 'feature',
    feature: [...new Set(places.map((p) => featureNameOfSlug(p.feature.slug)))].join(' / '),
    target: `${id}: ${places.map((p) => `${p.feature.path} L${p.line}`).join(', ')}`,
    sortPath: places[0].feature.path,
    sortLine: places[0].line,
  };
}

/**
 * 重複 ID(design 1.7)。3 つの出どころをすべて同じ種別で報告する:
 *   (1) 同じシナリオ ID を持つ Scenario が 2 つ以上 → `<ID>: <パス> L<行>, ...`
 *   (2) 同じ要件 ID を持つ Rule が 2 つ以上 → 同上
 *   (3) 同じシナリオ ID に結ばれたテストファイルが 2 つ以上 → `<ID>: <パス>, <パス>`。
 *       機能欄は先頭のテストファイルの slug から解決し、並び順の行番号はそのファイル内で当該 ID に結ばれた最初の test の行を使う
 */
function detectDuplicateIds(
  features: readonly FeatureFile[],
  match: MatchResult,
  featureNameOfSlug: (slug: string) => string,
): Inconsistency[] {
  const result: Inconsistency[] = [];

  // (1) 索引は indexScenarios が .feature のパス順 → 行順で積んでいる
  for (const [id, entries] of match.scenarioIndex) {
    if (entries.length < 2) continue;
    result.push(
      featureSideDuplicate(
        id,
        entries.map((e) => ({ feature: e.feature, line: e.scenario.line })),
        featureNameOfSlug,
      ),
    );
  }

  // (2) features はパス順、rules は行順
  const rulesById = new Map<string, { feature: FeatureFile; line: number }[]>();
  for (const feature of features) {
    for (const rule of feature.rules) {
      if (rule.requirementId === null) continue;
      const places = rulesById.get(rule.requirementId) ?? [];
      places.push({ feature, line: rule.line });
      rulesById.set(rule.requirementId, places);
    }
  }
  for (const [id, places] of rulesById) {
    if (places.length >= 2) result.push(featureSideDuplicate(id, places, featureNameOfSlug));
  }

  // (3) boundSpecPaths はパス順。match.tests もパス順 → 出現順なので、当該 ID に結ばれた最初の test は先頭パスのファイルにある
  for (const [id, paths] of match.boundSpecPaths) {
    if (paths.length < 2) continue;
    const first = match.tests.find((t) => t.classification.kind === 'bound' && t.classification.id === id);
    result.push({
      kind: '重複 ID',
      origin: 'test',
      feature: featureNameOfSlug(first?.spec.slug ?? ''),
      target: `${id}: ${paths.join(', ')}`,
      sortPath: paths[0],
      sortLine: first?.test.line ?? 0,
    });
  }
  return result;
}

/**
 * ID 未付与: 有効なシナリオ ID の条件(design 1.3)を満たさない Scenario を理由付きで、名前の先頭に要件 ID が無い Rule を
 * 配下のシナリオの有無に依らず報告する。Rule の配下の Scenario は、Scenario の行として `Rule に要件 ID 無し` で別に出る
 */
function detectMissingIds(features: readonly FeatureFile[], featureNameOfSlug: (slug: string) => string): Inconsistency[] {
  const result: Inconsistency[] = [];
  for (const feature of features) {
    const featureName = featureNameOfSlug(feature.slug);
    for (const rule of feature.rules) {
      if (rule.requirementId !== null) continue;
      result.push({
        kind: 'ID 未付与',
        origin: 'feature',
        feature: featureName,
        target: `${feature.path} L${rule.line} Rule「${rule.text}」(名前先頭に要件 ID 無し)`,
        sortPath: feature.path,
        sortLine: rule.line,
      });
    }
    for (const scenario of feature.scenarios) {
      if (scenario.idJudgment.kind !== 'missing') continue;
      result.push({
        kind: 'ID 未付与',
        origin: 'feature',
        feature: featureName,
        target: `${feature.path} L${scenario.line} Scenario「${scenario.rawName}」(${scenario.idJudgment.reason})`,
        sortPath: feature.path,
        sortLine: scenario.line,
      });
    }
  }
  return result;
}

/**
 * feature-map の形式: 形式の誤りを 1 件 1 行で報告する。
 * ファイルが無いことは、.feature が 1 つ以上あるときだけ報告する(feature-map も .feature も無いのは導入の直後)
 */
function detectFeatureMapFormat(features: readonly FeatureFile[], reading: FeatureMapReading): Inconsistency[] {
  const problems: FeatureMapProblem[] = reading.missing && features.length > 0 ? [{ feature: '—', message: 'が無い' }] : reading.problems;
  return problems.map((problem, index) => ({
    kind: 'feature-map の形式',
    origin: 'feature-map',
    feature: problem.feature,
    target: `${FEATURE_MAP_PATH} ${problem.message}`,
    sortPath: FEATURE_MAP_PATH,
    sortLine: index + 1,
  }));
}

/** feature-map に無い .feature: ファイル名(拡張子を除く)が、どの機能の slug とも一致しない .feature */
function detectFeaturesOutsideMap(
  features: readonly FeatureFile[],
  map: FeatureMap,
  featureNameOfSlug: (slug: string) => string,
): Inconsistency[] {
  const slugs = new Set(map.features.map((item) => item.slug));
  return features
    .filter((feature) => !slugs.has(feature.slug))
    .map((feature) => ({
      kind: 'feature-map に無い .feature',
      origin: 'feature',
      feature: featureNameOfSlug(feature.slug),
      target: `${feature.path}(feature-map に slug が ${feature.slug} の機能が無い)`,
      sortPath: feature.path,
      sortLine: 0,
    }));
}

/**
 * .feature の無い機能: 状態が 定義済み か テスト済み なのに `features/<slug>.feature` が無い機能。
 * ファイルの有無は readdir で読んだ .feature の slug と突き合わせ、大文字小文字を区別しないファイルシステムでも結果を変えない
 */
function detectFeaturesWithoutFile(features: readonly FeatureFile[], map: FeatureMap): Inconsistency[] {
  const slugs = new Set(features.map((feature) => feature.slug));
  return map.features
    .filter((item) => STATUSES_WITH_FEATURE.includes(item.status) && !slugs.has(item.slug))
    .map((item, index) => ({
      kind: '.feature の無い機能',
      origin: 'feature-map',
      feature: item.name,
      target: `${FEATURES_DIR}/${item.slug}${FEATURE_EXT} が無い(状態が ${item.status})`,
      sortPath: FEATURE_MAP_PATH,
      sortLine: index + 1,
    }));
}

/** slug の重なり: 機能と候補を合わせた全体で、同じ slug を持つ項目が 2 つ以上。場所は features、candidates の順 */
function detectSlugOverlaps(map: FeatureMap): Inconsistency[] {
  const bySlug = new Map<string, { name: string; place: string }[]>();
  const add = (slug: string, name: string, place: string): void => {
    const items = bySlug.get(slug) ?? [];
    items.push({ name, place });
    bySlug.set(slug, items);
  };
  for (const [index, item] of map.features.entries()) add(item.slug, item.name, `features[${index}]`);
  for (const [index, item] of (map.candidates ?? []).entries()) add(item.slug, item.name, `candidates[${index}]`);

  const result: Inconsistency[] = [];
  for (const [slug, items] of bySlug) {
    if (items.length < 2) continue;
    result.push({
      kind: 'slug の重なり',
      origin: 'feature-map',
      feature: [...new Set(items.map((item) => item.name))].join(' / '),
      target: `${slug}: ${items.map((item) => item.place).join(', ')}`,
      sortPath: FEATURE_MAP_PATH,
      sortLine: result.length + 1,
    });
  }
  return result;
}

/**
 * 10 種すべての不整合を集めて並び順を確定する(design 1.7)。
 * feature-map が null(無い、読めない、形式の誤りがある)なら、feature-map に頼る 3 種は検査しない
 */
function detectInconsistencies(features: readonly FeatureFile[], match: MatchResult, reading: FeatureMapReading): Inconsistency[] {
  const { map } = reading;
  const featureNameOfSlug = makeFeatureNameOfSlug(features, map);
  const mapChecks =
    map === null
      ? []
      : [
          ...detectFeaturesOutsideMap(features, map, featureNameOfSlug),
          ...detectFeaturesWithoutFile(features, map),
          ...detectSlugOverlaps(map),
        ];
  return [
    ...detectUngenerated(features, match, featureNameOfSlug),
    ...detectTestSideInconsistencies(match, featureNameOfSlug),
    ...detectDuplicateIds(features, match, featureNameOfSlug),
    ...detectMissingIds(features, featureNameOfSlug),
    ...detectFeatureMapFormat(features, reading),
    ...mapChecks,
  ].sort(compareInconsistencies);
}

// ---- 結果に依らない照合の結果(ビューアが import する) ----

/** inspect の返り値 */
export interface Inspection {
  /** 検査を通った feature-map。ファイルが無い、JSON として読めない、形式の誤りが 1 つでもあるときは null */
  featureMap: FeatureMap | null;
  /** features/*.feature の読み取り結果(パス順) */
  features: FeatureFile[];
  /** シナリオ ID → 結ばれたテストファイルのパス(パス順)。1 つも結ばれていない ID は載らない */
  boundSpecPaths: ReadonlyMap<string, readonly string[]>;
  /** 結果に依らない不整合。並びは確定済み */
  inconsistencies: Inconsistency[];
}

/**
 * プロジェクトのルート root の `.feature`、feature-map、テストコードを読み、結果に依らない照合の結果を返す。
 * カレントディレクトリには頼らない。`.feature` やテストファイルが読めなければ Error を投げる
 */
export function inspect(root: string = process.cwd()): Inspection {
  const features = readFeatureFiles(root);
  const specs = readSpecFiles(root);
  const reading = readFeatureMap(root);
  const match = matchScenariosAndTests(features, specs);
  return {
    featureMap: reading.map,
    features,
    boundSpecPaths: match.boundSpecPaths,
    inconsistencies: detectInconsistencies(features, match, reading),
  };
}

// ---- 結果読み取り ----

/**
 * results.json の `tests[]` 1 要素から導いた結果(design 1.5)。
 *   - pass      : outcome が `expected`(fail 指定でない)
 *   - fail      : outcome が `unexpected` / `flaky` / その他。unexpectedPass は「fail 指定だが通過」
 *                 (`expectedStatus: failed` かつ outcome `unexpected`)。flaky は retries 0 の規約では現れないが、現れたら fail に寄せる
 *   - known-bug : `expectedStatus: failed` かつ outcome `expected`(期待どおり失敗)。reason は `issue` アノテーションの description、無ければ `理由なし`
 *   - skip      : outcome が `skipped`(規約では現れない。1 つの ID にまとめるときに 未実行 に寄せる)
 */
type TestResult = { kind: 'pass' } | { kind: 'fail'; unexpectedPass: boolean } | { kind: 'known-bug'; reason: string } | { kind: 'skip' };

/** features/last-run.json の scenarios の 1 項目。reason は既知バグの理由(重なりを除いて ` / ` でつなぐ)か `fail 指定だが通過` */
export interface RecordedResult {
  result: 'pass' | 'fail' | 'known-bug';
  reason?: string;
}
/** シナリオ ID → 結果。features/last-run.json の scenarios と同じ形 */
export type ScenarioResults = Record<string, RecordedResult>;

const RESULTS_PATH = 'test-results/results.json';
const SCENARIO_ID_RE = /^REQ-\d+-\d+$/;
const KNOWN_BUG_NO_REASON = '理由なし';
/** fail 指定の test が通ったときの理由 */
const UNEXPECTED_PASS_REASON = 'fail 指定だが通過';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** 配列ならそのまま、そうでなければ空。results.json の中の欠けた・壊れた欄を「無いもの」として読み進めるために使う */
function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

/**
 * spec のシナリオ ID(design 1.5)。`tags[]`(`@` 無し)のうち `REQ-<数字>-<数字>` 形式がちょうど 1 つあり、
 * `title` の先頭 ID と文字列一致するときだけその ID。test 宣言を結合済みとする条件(classifyTest)と同じにして、
 * `ID 不一致` になる test の結果を同じ ID のシナリオに混ぜない。満たさなければ null(その spec の結果は読まない)
 */
function scenarioIdOfSpec(spec: Record<string, unknown>): string | null {
  const tagIds = asArray(spec.tags).filter((tag): tag is string => typeof tag === 'string' && SCENARIO_ID_RE.test(tag));
  if (tagIds.length !== 1) return null;
  const nameMatch = typeof spec.title === 'string' ? NAME_LEADING_ID_RE.exec(spec.title) : null;
  return nameMatch !== null && nameMatch[1] === tagIds[0] ? tagIds[0] : null;
}

/** 既知バグの理由。`annotations[]` の `type: 'issue'` のうち description が空でない文字列の最初のもの、無ければ `理由なし` */
function knownBugReasonOf(annotations: unknown): string {
  for (const annotation of asArray(annotations)) {
    if (!isRecord(annotation) || annotation.type !== 'issue') continue;
    const { description } = annotation;
    if (typeof description === 'string' && description.trim() !== '') return description;
  }
  return KNOWN_BUG_NO_REASON;
}

/** `tests[]` の 1 要素から結果を 1 つ導く(design 1.5 の表)。`results[]` は読まない */
function deriveTestResult(test: Record<string, unknown>): TestResult {
  const { expectedStatus, status } = test;
  if (status === 'skipped') return { kind: 'skip' };
  if (expectedStatus === 'failed') {
    if (status === 'expected') return { kind: 'known-bug', reason: knownBugReasonOf(test.annotations) };
    return { kind: 'fail', unexpectedPass: status === 'unexpected' };
  }
  if (status === 'expected') return { kind: 'pass' };
  return { kind: 'fail', unexpectedPass: false };
}

/** `suites[]` を `suites[].suites[]` まで再帰的に辿り、各 suite の `specs[]` から結果を集める。JSON reporter の並び(specs → suites)どおりに辿る */
function collectResults(suites: readonly unknown[], byScenarioId: Map<string, TestResult[]>): void {
  for (const suite of suites) {
    if (!isRecord(suite)) continue;
    for (const spec of asArray(suite.specs)) {
      if (!isRecord(spec)) continue;
      const id = scenarioIdOfSpec(spec);
      if (id === null) continue;
      const tests = asArray(spec.tests).filter(isRecord);
      if (tests.length === 0) continue;
      const results = byScenarioId.get(id) ?? [];
      for (const test of tests) results.push(deriveTestResult(test));
      byScenarioId.set(id, results);
    }
    collectResults(asArray(suite.suites), byScenarioId);
  }
}

/**
 * 1 つの ID の test の結果を 1 つにまとめる(design 1.8)。Outline 展開で同じ ID の test が複数あっても、
 * 優先順 fail > 既知バグ > 未実行 > pass で決める。未実行(skip を含み、fail と既知バグが無い)なら null。
 * 既知バグの理由は重なりを除いて出現順に ` / ` でつなぐ
 */
function summarizeTestResults(testResults: readonly TestResult[]): RecordedResult | null {
  let hasFail = false;
  let unexpectedPass = false;
  let hasSkip = false;
  const reasons: string[] = [];
  for (const result of testResults) {
    switch (result.kind) {
      case 'fail':
        hasFail = true;
        if (result.unexpectedPass) unexpectedPass = true;
        break;
      case 'known-bug':
        if (!reasons.includes(result.reason)) reasons.push(result.reason);
        break;
      case 'skip':
        hasSkip = true;
        break;
      case 'pass':
        break;
    }
  }
  if (hasFail) return unexpectedPass ? { result: 'fail', reason: UNEXPECTED_PASS_REASON } : { result: 'fail' };
  if (reasons.length > 0) return { result: 'known-bug', reason: reasons.join(' / ') };
  if (hasSkip) return null;
  return { result: 'pass' };
}

/**
 * JSON.parse 済みの test-results/results.json の値から、シナリオ ID ごとの結果を作る(design 1.5、1.8)。
 * 結び付きでは絞らず、結合条件を満たす spec の ID をすべて含める。未実行(skip だけのものを含む)の ID は含めない。
 * キーは ID の文字コード順。BOM の除去と JSON.parse は読む側が行う。suites が配列でなければ Error を投げる
 */
export function resultsFromPlaywright(results: unknown): ScenarioResults {
  if (!isRecord(results) || !Array.isArray(results.suites)) throw new Error('suites が配列でない');
  const byScenarioId = new Map<string, TestResult[]>();
  collectResults(results.suites, byScenarioId);
  const recorded: ScenarioResults = {};
  for (const id of [...byScenarioId.keys()].sort()) {
    const result = summarizeTestResults(byScenarioId.get(id) ?? []);
    if (result !== null) recorded[id] = result;
  }
  return recorded;
}

/** test-results/results.json を読んだ結果 */
interface ResultsReading {
  /** resultsFromPlaywright の返り値。ファイルが無ければ空 */
  scenarios: ScenarioResults;
  /** `stats.startTime` の文字列。無ければ null */
  startTime: string | null;
  /** ファイルがあったか。--run-id はファイルが無ければ実行不能にする */
  present: boolean;
}

/**
 * プロジェクトのルート root の `test-results/results.json` を読む(design 1.5)。先頭の BOM を除いてから JSON.parse する。
 * 無ければ空の結果として続行する(present: false)。あるのに読めない、JSON として読めない、`suites` が配列でない場合は FatalError(終了コード 2)。
 * `config` `specs[].file` `tests[].results[]` は読まない。
 */
function readResults(root: string): ResultsReading {
  let text: string;
  try {
    text = fs.readFileSync(path.join(root, RESULTS_PATH), 'utf8');
  } catch (e) {
    if (errnoCode(e) === 'ENOENT') return { scenarios: {}, startTime: null, present: false };
    throw new FatalError(`${RESULTS_PATH} を読めません: ${describeError(e)}`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(text.replace(/^\uFEFF/, ''));
  } catch (e) {
    throw new FatalError(`${RESULTS_PATH} を読めません: JSON として読めない(${describeError(e)})`);
  }
  let scenarios: ScenarioResults;
  try {
    scenarios = resultsFromPlaywright(parsed);
  } catch (e) {
    throw new FatalError(`${RESULTS_PATH} を読めません: ${describeError(e)}`);
  }
  const startTime =
    isRecord(parsed) && isRecord(parsed.stats) && typeof parsed.stats.startTime === 'string' ? parsed.stats.startTime : null;
  return { scenarios, startTime, present: true };
}

// ---- 最新結果の導出(design 1.8) ----

/** シナリオの最新結果 */
export type Outcome = 'pass' | 'fail' | '既知バグ' | '未生成' | '未実行';
/** シナリオ 1 つの最新結果。reason は既知バグの理由か `fail 指定だが通過`。無ければ null */
export interface ScenarioOutcome {
  outcome: Outcome;
  reason: string | null;
}
/** 1 機能(.feature)分の件数 */
export interface FeatureCounts {
  /** 要件 ID を持つ Rule の数 */
  requirements: number;
  /** 要件 ID を持つ Rule のうち、配下に結ばれたシナリオが 1 つ以上ある Rule の数 */
  testedRequirements: number;
  /** Rule 外を含む全 Scenario / Scenario Outline の数。結果 5 つの件数の和に等しい */
  scenarios: number;
  pass: number;
  fail: number;
  knownBug: number;
  ungenerated: number;
  notRun: number;
}
/** 状態が テスト済み なのに、配下に fail か 未生成 のシナリオがある機能。未実行 は数えない */
export interface StatusMismatch {
  slug: string;
  name: string;
  fail: number;
  ungenerated: number;
}
/** deriveResults の返り値 */
export interface DerivedResults {
  /** inspection.features の全 Scenario → 最新結果 */
  scenarios: Map<ScenarioRecord, ScenarioOutcome>;
  /** .feature の slug → 件数 */
  counts: Map<string, FeatureCounts>;
  /** feature-map の機能の順。feature-map が null なら空 */
  mismatches: StatusMismatch[];
}

/** 最新結果 → 件数の欄 */
const OUTCOME_COUNT_KEYS: Readonly<Record<Outcome, keyof FeatureCounts>> = {
  pass: 'pass',
  fail: 'fail',
  既知バグ: 'knownBug',
  未生成: 'ungenerated',
  未実行: 'notRun',
};

function emptyCounts(): FeatureCounts {
  return { requirements: 0, testedRequirements: 0, scenarios: 0, pass: 0, fail: 0, knownBug: 0, ungenerated: 0, notRun: 0 };
}

/**
 * シナリオ 1 つの最新結果。有効な ID が無いか、テストファイルが結ばれていなければ 未生成。
 * そうでなく scenarioResults にその ID が無ければ 未実行。あれば、その結果をそのまま写す
 */
function outcomeOf(scenario: ScenarioRecord, inspection: Inspection, scenarioResults: Readonly<ScenarioResults>): ScenarioOutcome {
  if (scenario.idJudgment.kind !== 'valid' || boundSpecPathsOf(inspection, scenario).length === 0) {
    return { outcome: '未生成', reason: null };
  }
  const recorded = Object.hasOwn(scenarioResults, scenario.idJudgment.id) ? scenarioResults[scenario.idJudgment.id] : undefined;
  if (recorded === undefined) return { outcome: '未実行', reason: null };
  switch (recorded.result) {
    case 'pass':
      return { outcome: 'pass', reason: null };
    case 'fail':
      return { outcome: 'fail', reason: recorded.reason ?? null };
    case 'known-bug':
      return { outcome: '既知バグ', reason: recorded.reason ?? null };
  }
}

/**
 * 照合の結果とシナリオごとの結果から、各シナリオの最新結果、機能ごとの件数、状態と結果の食い違いを求める。
 * scenarioResults にあって今の .feature に無い ID は無視する
 */
export function deriveResults(inspection: Inspection, scenarioResults: Readonly<ScenarioResults>): DerivedResults {
  const scenarios = new Map<ScenarioRecord, ScenarioOutcome>();
  const counts = new Map<string, FeatureCounts>();
  for (const feature of inspection.features) {
    const featureCounts = emptyCounts();
    for (const rule of feature.rules) {
      if (rule.requirementId === null) continue;
      featureCounts.requirements++;
      if (feature.scenarios.some((s) => s.rule === rule && boundSpecPathsOf(inspection, s).length > 0)) featureCounts.testedRequirements++;
    }
    for (const scenario of feature.scenarios) {
      const outcome = outcomeOf(scenario, inspection, scenarioResults);
      scenarios.set(scenario, outcome);
      featureCounts.scenarios++;
      featureCounts[OUTCOME_COUNT_KEYS[outcome.outcome]]++;
    }
    counts.set(feature.slug, featureCounts);
  }

  const mismatches: StatusMismatch[] = [];
  for (const item of inspection.featureMap?.features ?? []) {
    if (item.status !== 'テスト済み') continue;
    const featureCounts = counts.get(item.slug);
    if (featureCounts === undefined || (featureCounts.fail === 0 && featureCounts.ungenerated === 0)) continue;
    mismatches.push({ slug: item.slug, name: item.name, fail: featureCounts.fail, ungenerated: featureCounts.ungenerated });
  }
  return { scenarios, counts, mismatches };
}

// ---- 描画 ----

/**
 * Markdown 表のセル。規約上、パスや名前に `|` や改行は現れないが、
 * 万一含まれていても表が崩れないように `|` は `\|` にエスケープし、改行は空白にする。
 */
function tableCell(value: string): string {
  return value.replace(/\r\n|\r|\n/g, ' ').replaceAll('|', '\\|');
}

function renderTableRow(cells: readonly string[]): string {
  return `| ${cells.map(tableCell).join(' | ')} |`;
}

/** 各節は末尾が改行 1 つの文字列にし、節同士を `\n` で連結する(節の間に空行 1 つ) */
function joinSections(sections: readonly string[]): string {
  return sections.join('\n');
}

/** `## 不整合` 節(design 1.9)。0 件なら表の代わりに `なし` */
function renderInconsistencySection(inconsistencies: readonly Inconsistency[]): string {
  const lines = ['## 不整合', ''];
  if (inconsistencies.length === 0) {
    lines.push('なし');
  } else {
    lines.push('| 種別 | 機能 | 対象 |', '|---|---|---|');
    for (const item of inconsistencies) {
      lines.push(renderTableRow([item.kind, item.feature, item.target]));
    }
  }
  return `${lines.join('\n')}\n`;
}

/** 1 行目: `実行ID: <--run-id の値、無ければ —> / 結果: <results.json の stats.startTime、無ければ —>`。startTime は記録された文字列のまま出す */
function renderHeaderLine(runId: string | null, startTime: string | null): string {
  return `実行ID: ${runId ?? '—'} / 結果: ${startTime ?? '—'}`;
}

/** 集計表の数値列の順(FeatureCounts の各欄をこの順に並べる) */
const SUMMARY_COLUMNS: readonly (keyof FeatureCounts)[] = [
  'requirements',
  'testedRequirements',
  'scenarios',
  'pass',
  'fail',
  'knownBug',
  'ungenerated',
  'notRun',
];

const SUMMARY_TABLE_HEADER = [
  '| 機能 | 状態 | 要件数 | テストがある要件数 | シナリオ数 | ✅ pass | ❌ fail | 🐞 既知バグ | 未生成 | 未実行 |',
  '|---|---|---:|---:|---:|---:|---:|---:|---:|---:|',
] as const;

/** 状態の列の値が無いとき(feature-map に無い .feature、feature-map が読めないとき、合計の行) */
const NO_STATUS = '—';

/** 集計表の機能の 1 行 */
interface SummaryRow {
  label: string;
  status: string;
  counts: FeatureCounts;
}

/**
 * 集計表の機能の行。feature-map があれば、その機能の順(.feature の無い機能は件数 0)に続けて、feature-map に無い .feature を
 * ファイル名の順(機能の列は Feature: の名前、状態は —)。feature-map が null なら .feature のパスの順で、機能の列は Feature: の名前、状態は —
 */
function summaryRowsOf(inspection: Inspection, derived: DerivedResults): SummaryRow[] {
  const countsOf = (slug: string): FeatureCounts => derived.counts.get(slug) ?? emptyCounts();
  const fromFeatureFile = (feature: FeatureFile): SummaryRow => ({
    label: feature.name,
    status: NO_STATUS,
    counts: countsOf(feature.slug),
  });
  const map = inspection.featureMap;
  if (map === null) return inspection.features.map(fromFeatureFile);
  const mapSlugs = new Set(map.features.map((item) => item.slug));
  return [
    ...map.features.map((item) => ({ label: item.name, status: item.status, counts: countsOf(item.slug) })),
    ...inspection.features.filter((feature) => !mapSlugs.has(feature.slug)).map(fromFeatureFile),
  ];
}

function addCounts(total: FeatureCounts, counts: FeatureCounts): void {
  for (const column of SUMMARY_COLUMNS) total[column] += counts[column];
}

function renderSummaryRow({ label, status, counts }: SummaryRow): string {
  return renderTableRow([label, status, ...SUMMARY_COLUMNS.map((column) => String(counts[column]))]);
}

const REQUIREMENT_ID_PREFIX = 'REQ-';

/**
 * 要件番号の最大値: 全 .feature の要件 ID(`Rule:` の `REQ-<数字>`)を数値で比較した最大を、書かれたリテラルのまま返す。
 * 数値が同じリテラルが複数あれば(`REQ-14` と `REQ-014` など)、.feature のパス順 → 行順で先に現れたものを採る。要件が無ければ null。
 */
function maxRequirementId(features: readonly FeatureFile[]): string | null {
  let maxId: string | null = null;
  let maxNumber = -1;
  for (const feature of features) {
    for (const rule of feature.rules) {
      if (rule.requirementId === null) continue;
      const number = Number(rule.requirementId.slice(REQUIREMENT_ID_PREFIX.length));
      if (number > maxNumber) {
        maxNumber = number;
        maxId = rule.requirementId;
      }
    }
  }
  return maxId;
}

/** 状態と結果の食い違いの行。無ければ `状態と結果の食い違い: なし`、あれば見出しの行に続けて 1 機能 1 行(0 の結果は書かない) */
function renderMismatchLines(mismatches: readonly StatusMismatch[]): string[] {
  if (mismatches.length === 0) return ['状態と結果の食い違い: なし'];
  const describe = ({ fail, ungenerated }: StatusMismatch): string =>
    [fail > 0 ? `fail ${fail}` : null, ungenerated > 0 ? `未生成 ${ungenerated}` : null].filter((part) => part !== null).join('、');
  return ['状態と結果の食い違い:', ...mismatches.map((mismatch) => `- ${mismatch.name}: テスト済み なのに ${describe(mismatch)}`)];
}

/**
 * `## 集計` 節。機能ごとの行と合計行の表、空行、`要件番号の最大値: <ID または なし>`、空行、状態と結果の食い違い。
 * 機能 0 件でも合計行は出す。状態と結果の食い違いは不整合ではなく、終了コードに影響しない
 */
function renderSummarySection(inspection: Inspection, derived: DerivedResults): string {
  const lines: string[] = ['## 集計', '', ...SUMMARY_TABLE_HEADER];
  const total = emptyCounts();
  for (const row of summaryRowsOf(inspection, derived)) {
    addCounts(total, row.counts);
    lines.push(renderSummaryRow(row));
  }
  lines.push(renderSummaryRow({ label: '合計', status: NO_STATUS, counts: total }));
  lines.push('', `要件番号の最大値: ${maxRequirementId(inspection.features) ?? 'なし'}`);
  lines.push('', ...renderMismatchLines(derived.mismatches));
  return `${lines.join('\n')}\n`;
}

/**
 * 標準出力の本文: 1 行目 → `## 集計` → `## 不整合`。
 * 書き出しの有無を示す最終行は含めない。書き出しの成否が決まってから main が添える
 */
function renderStdoutBody(inspection: Inspection, derived: DerivedResults, runId: string | null, startTime: string | null): string {
  return joinSections([
    `${renderHeaderLine(runId, startTime)}\n`,
    renderSummarySection(inspection, derived),
    renderInconsistencySection(inspection.inconsistencies),
  ]);
}

// ---- 書き出し ----

const LAST_RUN_PATH = path.posix.join(FEATURES_DIR, 'last-run.json');

/** 標準出力の最終行。--run-id で features/last-run.json を書いたとき / 引数なしのとき */
const WRITTEN_LINE = `書き出し: ${LAST_RUN_PATH}`;
const NOT_WRITTEN_LINE = '書き出しなし';

/** features/last-run.json の全文。startTime が取れなければ欄ごと省く。scenarios は resultsFromPlaywright の返り値(キーは文字コード順)。インデント 2、末尾は改行 1 つ */
function renderLastRun(runId: string, startTime: string | null, scenarios: ScenarioResults): string {
  const record = startTime === null ? { runId, scenarios } : { runId, startTime, scenarios };
  return `${JSON.stringify(record, null, 2)}\n`;
}

/** `features/last-run.json` を全体置き換えで書く(UTF-8、LF)。`features/` が無ければ作る。失敗すれば FatalError(終了コード 2) */
function writeLastRun(root: string, text: string): void {
  try {
    fs.mkdirSync(path.join(root, FEATURES_DIR), { recursive: true });
    fs.writeFileSync(path.join(root, LAST_RUN_PATH), text, 'utf8');
  } catch (e) {
    throw new FatalError(`${LAST_RUN_PATH} を書き出せません: ${describeError(e)}`);
  }
}

// ---- 入口 ----

function main(argv: readonly string[]): ExitCode {
  const parsed = parseArgs(argv);
  if (!parsed.ok) {
    process.stderr.write(`${parsed.message}\n${USAGE}\n`);
    return 2;
  }
  const { runId } = parsed.options;
  try {
    const root = process.cwd();
    const inspection = inspect(root);
    // results.json の破損はここで FatalError になり、標準出力に何も出さずに中断する
    const results = readResults(root);
    if (runId !== null && !results.present) {
      process.stderr.write(`${RESULTS_PATH} が無い。--run-id は全体実行の後にだけ使う\n${USAGE}\n`);
      return 2;
    }
    const derived = deriveResults(inspection, results.scenarios);
    // 標準出力を出し終えてから書く。書き出しの失敗は FatalError(終了コード 2)になるが、1 行目・集計・不整合は出ている
    process.stdout.write(renderStdoutBody(inspection, derived, runId, results.startTime));
    // 不整合があっても控えは書く
    if (runId !== null) writeLastRun(root, renderLastRun(runId, results.startTime, results.scenarios));
    // 書き出しの有無を示す最終行。書き出しに失敗したときはここに来ないので出ない。節の間と同じく空行 1 つを挟む
    process.stdout.write(`\n${runId === null ? NOT_WRITTEN_LINE : WRITTEN_LINE}\n`);
    // 終了コードは不整合の件数だけで決まる。テストの fail と状態と結果の食い違いは影響しない
    return inspection.inconsistencies.length > 0 ? 1 : 0;
  } catch (e) {
    if (e instanceof FatalError) {
      process.stderr.write(`${e.message}\n`);
      return 2;
    }
    throw e;
  }
}

// 直接実行されたときだけ CLI として動く。ビューアの build.mjs は esbuild の define で import.meta.main を false に置き換える
// process.exit() ではなく exitCode を使う。標準出力がパイプのとき、書き込みを取りこぼさずに終了させるため
if (import.meta.main) {
  process.exitCode = main(process.argv.slice(2));
}
