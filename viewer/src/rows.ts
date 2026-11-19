// 照合ツールの照合の結果(inspect と deriveResults)と features/last-run.json から、表のページとレビュー用 CSV のデータを作る。
// ID の読み取り、テストとの結び付け、feature-map の検査は照合ツールの結果を正とし、ここには同じ決まりを書かない。
// Gherkin のパーサーは、手順・DataTable・Examples・DocString を取り出すことと、構文エラーを見つけることにだけ使う
import fs from 'node:fs';
import path from 'node:path';
import { AstBuilder, Errors, GherkinClassicTokenMatcher, Parser } from '@cucumber/gherkin';
import {
  type Examples,
  type FeatureChild,
  IdGenerator,
  type Rule,
  type RuleChild,
  type Scenario,
  type Step,
  type TableRow,
} from '@cucumber/messages';
import {
  type DerivedResults,
  deriveResults,
  type FeatureFile,
  type FeatureMap,
  type FeatureMapCandidate,
  type FeatureMapFeature,
  type Inconsistency,
  type Inspection,
  inspect,
  type Outcome,
  type RecordedResult,
  type RuleRecord,
  type ScenarioOutcome,
  type ScenarioRecord,
  type ScenarioResults,
  type StatusMismatch,
} from '../../skills/e2e-testing/scripts/e2e-trace.mts';

export type { Outcome } from '../../skills/e2e-testing/scripts/e2e-trace.mts';

export type RowKind = '機能' | '要件' | 'シナリオ' | '候補';
/**
 * 手順を表に描くための塊。line は句か Examples の行。keyword は句のキーワード(step.keyword。`Given ` のように後ろの空白まで含む)、
 * Examples の行は空。text はキーワードの後ろ(Examples の行は `Examples:` と名前)。table は DataTable か Examples の表で、
 * セルの値はエスケープを戻したもの、1 行目が見出し。docString は区切り行を含めた行を LF でつないだもの
 */
export type StepBlock =
  | { kind: 'line'; keyword: string; text: string }
  | { kind: 'table'; rows: string[][] }
  | { kind: 'docString'; text: string };
/** CSV の 1 行。kind から source までのフィールドの並びは CSV の列の順。stepBlocks は表だけに使い、CSV には出さない */
export type Row = {
  kind: RowKind;
  /** 機能と候補は slug、要件は要件 ID(REQ-001)、シナリオはシナリオ ID(REQ-001-1) */
  id: string;
  /** feature-map の機能名。候補は候補の名前 */
  feature: string;
  /** 機能は feature-map の status。要件・シナリオ・候補は空 */
  status: string;
  /** 機能は概要などの、候補は理由と根拠の、見出し付きの行を LF でつないだもの。要件は要件文、シナリオは ID を除いたシナリオ名 */
  body: string;
  /** 1 句 1 行(LF)。機能は Feature 直下の Background、要件は Rule 直下の Background、シナリオは句と Examples の表。候補は空 */
  steps: string;
  /** その要素の直前に書かれた `# 引用元:` の値。Feature や Rule から継承しない。無ければ空 */
  source: string;
  /** steps と同じ手順を、句・表・DocString の塊に分けたもの */
  stepBlocks: StepBlock[];
};
export type ResultCounts = { pass: number; fail: number; knownBug: number; ungenerated: number; notRun: number };
/** テストファイルへのリンク。href は features/viewer/index.html から見た相対パス */
export type SpecLink = { path: string; href: string };
export type ItemResult =
  /** 要件: 配下のシナリオの件数。untested は配下のどのシナリオにもテストファイルが無い(配下が 0 件を含む) */
  | { kind: 'requirement'; counts: ResultCounts; untested: boolean }
  /** シナリオ: 最新結果。reason は既知バグの理由か `fail 指定だが通過`。specs は結ばれたテストファイル(パス順) */
  | { kind: 'scenario'; outcome: Outcome; reason: string | null; specs: SpecLink[] };
/** 要件とシナリオの表の 1 行 */
export type ItemRow = Row & { result: ItemResult };
export type FeatureView = {
  /** CSV の機能の行(kind 機能、id は slug) */
  row: Row;
  summary: string;
  includes: string[];
  excludes: string[];
  sources: string[];
  questions: string[];
  /** 無ければ空文字列 */
  decided: string;
  /** 一覧表の結果の列。未着手と対象外は null */
  counts: ResultCounts | null;
  /** 要件行とシナリオ行(.feature の Rule の順、各 Rule の配下は行の順) */
  items: ItemRow[];
};
export type CandidateView = { row: Row; reason: string; sources: string[] };
/** 照合ツールの不整合の節の 1 行 */
export type Notice = { kind: string; feature: string; target: string };
export type LastRun = { runId: string; startTime: string | null };
export type ViewerData = {
  app: string;
  /** features/last-run.json が無ければ null */
  lastRun: LastRun | null;
  /** 今の .feature の全シナリオの結果の件数 */
  totals: ResultCounts;
  notices: Notice[];
  /** feature-map の順 */
  features: FeatureView[];
  candidates: CandidateView[];
};

/** パーサーの読み取りのうち、照合ツールの Rule と Scenario に行番号で結ぶもの */
type ParsedFeature = { background: StepBlock[]; rules: Map<number, Rule>; scenarios: Map<number, Scenario> };

const FEATURE_MAP = 'features/feature-map.json';
const LAST_RUN = 'features/last-run.json';
/** 止める不整合の種別。ほかに、出どころが feature の重複 ID も止める */
const STOPPING_KINDS: readonly Inconsistency['kind'][] = [
  'ID 未付与',
  'feature-map の形式',
  'feature-map に無い .feature',
  '.feature の無い機能',
  'slug の重なり',
];
const RECORDED_RESULTS: readonly RecordedResult['result'][] = ['pass', 'fail', 'known-bug'];
const OUTCOME_KEYS: Readonly<Record<Outcome, keyof ResultCounts>> = {
  pass: 'pass',
  fail: 'fail',
  既知バグ: 'knownBug',
  未生成: 'ungenerated',
  未実行: 'notRun',
};
/** features/viewer/index.html からプロジェクトのルートへの相対パス */
const ROOT_FROM_OUTPUT = '../../';
const TOOL_ONLY_CAUSE = '照合ツールだけが読んだ行。DocString の中の行頭の Scenario: か Rule: が原因になりうる';
const PARSER_ONLY_CAUSE = 'Gherkin のパーサーだけが読んだ行。Example: などの規約に無いキーワードが原因になりうる';

const parser = new Parser(new AstBuilder(IdGenerator.incrementing()), new GherkinClassicTokenMatcher());

/**
 * プロジェクトのルート root からデータを作る。止める場合は、次の順に調べて最初に当たったものでエラーを投げる:
 * 照合ツールの止める不整合、feature-map が無い、features/last-run.json を読めない、構文エラー、照合ツールとパーサーの読み取りの食い違い
 */
export function loadViewerData(root: string): ViewerData {
  const inspection = inspect(root);
  const map = featureMapOrThrow(inspection);
  const lastRun = readLastRun(root);
  const derived = deriveResults(inspection, lastRun.scenarios);
  const parsed = parseFeatures(root, inspection.features);
  const outcome = (scenario: ScenarioRecord): ScenarioOutcome => outcomeOf(derived, scenario);
  return {
    app: map.app,
    lastRun: lastRun.lastRun,
    totals: countOutcomes([...derived.scenarios.values()]),
    // 止める不整合は featureMapOrThrow で投げ終えている。未生成は結果の列に出すので、節には入れない
    notices: [...inspection.inconsistencies.filter((i) => i.kind !== '未生成').map(toNotice), ...derived.mismatches.map(mismatchNotice)],
    features: map.features.map((item) => {
      // 定義済みとテスト済みの機能には .feature がある(無ければ .feature の無い機能として止めている)
      const file = inspection.features.find((f) => f.slug === item.slug);
      const parsedFeature = parsed.get(item.slug);
      const items =
        file && parsedFeature ? file.rules.flatMap((rule) => ruleRows(item.name, file, rule, parsedFeature, inspection, outcome)) : [];
      return featureView(item, file, parsedFeature?.background ?? [], items, file?.scenarios.map(outcome) ?? []);
    }),
    candidates: (map.candidates ?? []).map(candidateView),
  };
}

function isStopping(inconsistency: Inconsistency): boolean {
  return STOPPING_KINDS.includes(inconsistency.kind) || (inconsistency.kind === '重複 ID' && inconsistency.origin === 'feature');
}

/** 止める不整合があれば 1 件 1 行の `<種別>: <機能>: <対象>` で投げる。feature-map が無ければ(.feature も無いとき)投げる */
function featureMapOrThrow(inspection: Inspection): FeatureMap {
  const stopping = inspection.inconsistencies.filter(isStopping);
  if (stopping.length > 0) throw new Error(stopping.map((i) => `${i.kind}: ${i.feature}: ${i.target}`).join('\n'));
  if (inspection.featureMap === null) throw new Error(`${FEATURE_MAP} が無い`);
  return inspection.featureMap;
}

function toNotice({ kind, feature, target }: Inconsistency): Notice {
  return { kind, feature, target };
}

function mismatchNotice({ name, fail, ungenerated }: StatusMismatch): Notice {
  const parts = [fail > 0 ? `fail ${fail}` : null, ungenerated > 0 ? `未生成 ${ungenerated}` : null].filter((part) => part !== null);
  return { kind: '状態と結果の食い違い', feature: name, target: `テスト済み なのに ${parts.join('、')}` };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function messageOf(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

/**
 * features/last-run.json を読む。無ければ lastRun は null で結果は空。runId が文字列でなければ `—`、startTime が文字列でなければ null。
 * result が pass・fail・known-bug のどれでもない項目は無視する
 */
function readLastRun(root: string): { lastRun: LastRun | null; scenarios: ScenarioResults } {
  let text: string;
  try {
    text = readText(path.join(root, ...LAST_RUN.split('/')));
  } catch (e) {
    if (isRecord(e) && e.code === 'ENOENT') return { lastRun: null, scenarios: {} };
    throw new Error(`${LAST_RUN} を読めない: ${messageOf(e)}`);
  }
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch (e) {
    throw new Error(`${LAST_RUN} を読めない: JSON として読めない(${messageOf(e)})`);
  }
  if (!isRecord(value) || !isRecord(value.scenarios)) throw new Error(`${LAST_RUN} を読めない: scenarios がオブジェクトでない`);
  const scenarios: ScenarioResults = {};
  for (const [id, item] of Object.entries(value.scenarios)) {
    if (!isRecord(item)) continue;
    const result = RECORDED_RESULTS.find((r) => r === item.result);
    if (result === undefined) continue;
    scenarios[id] = typeof item.reason === 'string' ? { result, reason: item.reason } : { result };
  }
  const lastRun = {
    runId: typeof value.runId === 'string' ? value.runId : '—',
    startTime: typeof value.startTime === 'string' ? value.startTime : null,
  };
  return { lastRun, scenarios };
}

/**
 * 照合ツールが読んだ .feature をパーサーでも読み、slug ごとの読み取りを返す。構文エラーは全ファイル分を `<パス>: <パーサーの message>` でまとめて投げる。
 * 次に、照合ツールの Rule と Scenario の行と、パーサーの Rule と Scenario の行を比べ、どちらか一方にしか無い行を全ファイル分まとめて投げる
 */
function parseFeatures(root: string, files: readonly FeatureFile[]): Map<string, ParsedFeature> {
  const syntaxErrors: string[] = [];
  const docs: { file: FeatureFile; children: readonly FeatureChild[] }[] = [];
  for (const file of files) {
    try {
      docs.push({ file, children: parser.parse(readText(path.join(root, ...file.path.split('/')))).feature?.children ?? [] });
    } catch (error) {
      // パーサーは構文のエラーを 1 件でも CompositeParserException にまとめて投げる。それ以外はパーサーの不具合なので投げ直す
      if (!(error instanceof Errors.CompositeParserException)) throw error;
      // パーサーのエラーには行と列はあるがファイル名が無いので、パスを付ける
      syntaxErrors.push(...error.errors.map((e) => `${file.path}: ${e.message}`));
    }
  }
  if (syntaxErrors.length > 0) throw new Error(syntaxErrors.join('\n'));

  const mismatches: string[] = [];
  const parsed = new Map<string, ParsedFeature>();
  for (const { file, children } of docs) {
    const rules = new Map<number, Rule>();
    const scenarios = new Map<number, Scenario>();
    for (const child of children) {
      if (child.scenario) scenarios.set(child.scenario.location.line, child.scenario);
      if (!child.rule) continue;
      rules.set(child.rule.location.line, child.rule);
      for (const { scenario } of child.rule.children) {
        if (scenario) scenarios.set(scenario.location.line, scenario);
      }
    }
    mismatches.push(...readingMismatches(file, new Set([...rules.keys(), ...scenarios.keys()])));
    parsed.set(file.slug, { background: backgroundBlocks(children), rules, scenarios });
  }
  if (mismatches.length > 0) throw new Error(mismatches.join('\n'));
  return parsed;
}

/** 照合ツールとパーサーの一方にしか無い Rule と Scenario の行を、行の順に 1 件 1 行で返す */
function readingMismatches(file: FeatureFile, parserLines: ReadonlySet<number>): string[] {
  const toolLines = new Set([...file.rules.map((rule) => rule.line), ...file.scenarios.map((scenario) => scenario.line)]);
  const found = [
    ...[...toolLines].filter((line) => !parserLines.has(line)).map((line) => ({ line, cause: TOOL_ONLY_CAUSE })),
    ...[...parserLines].filter((line) => !toolLines.has(line)).map((line) => ({ line, cause: PARSER_ONLY_CAUSE })),
  ];
  return found
    .sort((a, b) => a.line - b.line)
    .map(({ line, cause }) => `${file.path}:${line}: 照合ツールと Gherkin の読み取りが食い違う(${cause})`);
}

function outcomeOf(derived: DerivedResults, scenario: ScenarioRecord): ScenarioOutcome {
  const outcome = derived.scenarios.get(scenario);
  // deriveResults は inspection.features の全 Scenario の結果を持つので、ここには来ない
  if (outcome === undefined) throw new Error(`${scenario.rawName} の最新結果が無い`);
  return outcome;
}

function countOutcomes(outcomes: readonly ScenarioOutcome[]): ResultCounts {
  const counts: ResultCounts = { pass: 0, fail: 0, knownBug: 0, ungenerated: 0, notRun: 0 };
  for (const { outcome } of outcomes) counts[OUTCOME_KEYS[outcome]]++;
  return counts;
}

/** 値のある項目だけを `<見出し>: <値>` の行にして LF でつなぐ */
function labeledLines(items: readonly (readonly [string, string])[]): string {
  return items
    .filter(([, value]) => value !== '')
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
}

/** 1 つの機能。background は Feature 直下の Background、outcomes はその .feature の全シナリオの最新結果 */
function featureView(
  item: FeatureMapFeature,
  file: FeatureFile | undefined,
  background: StepBlock[],
  items: ItemRow[],
  outcomes: readonly ScenarioOutcome[],
): FeatureView {
  const lists = { includes: item.includes, excludes: item.excludes ?? [], sources: item.sources ?? [], questions: item.questions ?? [] };
  const decided = item.decided ?? '';
  const body = labeledLines([
    ['概要', item.summary],
    ['含む', lists.includes.join('、')],
    ['含まない', lists.excludes.join('、')],
    ['根拠', lists.sources.join('、')],
    ['確認したいこと', lists.questions.join('、')],
    ['決めたこと', decided],
  ]);
  return {
    row: {
      kind: '機能',
      id: item.slug,
      feature: item.name,
      status: item.status,
      body,
      ...stepFields(background),
      source: file?.source ?? '',
    },
    summary: item.summary,
    ...lists,
    decided,
    counts: item.status === '未着手' || item.status === '対象外' ? null : countOutcomes(outcomes),
    items,
  };
}

/** 1 つの Rule の要件行と、その配下のシナリオ行(行の順) */
function ruleRows(
  featureName: string,
  file: FeatureFile,
  rule: RuleRecord,
  parsed: ParsedFeature,
  inspection: Inspection,
  outcome: (scenario: ScenarioRecord) => ScenarioOutcome,
): ItemRow[] {
  const scenarios = file.scenarios.filter((scenario) => scenario.rule === rule);
  const outcomes = scenarios.map(outcome);
  const parsedRule = parsed.rules.get(rule.line);
  const requirement: ItemRow = {
    kind: '要件',
    id: rule.requirementId ?? '',
    feature: featureName,
    status: '',
    body: rule.text,
    ...stepFields(parsedRule ? backgroundBlocks(parsedRule.children) : []),
    source: rule.source ?? '',
    // 有効な ID のシナリオ(ID 未付与は止めている)が 未生成 なのは、テストファイルが結ばれていないときだけ
    result: { kind: 'requirement', counts: countOutcomes(outcomes), untested: outcomes.every((o) => o.outcome === '未生成') },
  };
  return [
    requirement,
    ...scenarios.map((scenario, index): ItemRow => {
      const id = scenario.idJudgment.kind === 'valid' ? scenario.idJudgment.id : '';
      const parsedScenario = parsed.scenarios.get(scenario.line);
      const specs = (inspection.boundSpecPaths.get(id) ?? []).map((specPath) => ({
        path: specPath,
        href: `${ROOT_FROM_OUTPUT}${specPath}`,
      }));
      return {
        kind: 'シナリオ',
        id,
        feature: featureName,
        status: '',
        body: scenario.displayName,
        ...stepFields(
          parsedScenario ? [...parsedScenario.steps.flatMap(stepBlocks), ...parsedScenario.examples.flatMap(examplesBlocks)] : [],
        ),
        source: scenario.ownSource ?? '',
        result: { kind: 'scenario', outcome: outcomes[index].outcome, reason: outcomes[index].reason, specs },
      };
    }),
  ];
}

/** 候補の行。本文は理由と根拠 */
function candidateView(candidate: FeatureMapCandidate): CandidateView {
  const sources = candidate.sources ?? [];
  const body = labeledLines([
    ['理由', candidate.reason],
    ['根拠', sources.join('、')],
  ]);
  return {
    row: { kind: '候補', id: candidate.slug, feature: candidate.name, status: '', body, source: '', ...stepFields([]) },
    reason: candidate.reason,
    sources,
  };
}

/** 先頭の BOM を除き、改行を LF にそろえて読む */
function readText(file: string): string {
  return fs
    .readFileSync(file, 'utf8')
    .replace(/^\uFEFF/, '')
    .replaceAll('\r\n', '\n');
}

/** 行の steps と stepBlocks。steps は塊を 1 句 1 行(LF)の文字列に戻したもので、表は 1 行ずつ Gherkin の書き方に戻す */
function stepFields(blocks: StepBlock[]): Pick<Row, 'steps' | 'stepBlocks'> {
  const lines = blocks.flatMap((block) => {
    if (block.kind === 'table') return block.rows.map(tableRowLine);
    if (block.kind === 'line') return [`${block.keyword}${block.text}`];
    return [block.text];
  });
  return { steps: lines.join('\n'), stepBlocks: blocks };
}

/** その階層の直下にある Background の句。Background の名前は入れない */
function backgroundBlocks(children: readonly RuleChild[]): StepBlock[] {
  const background = children.find((child) => child.background)?.background;
  return background ? background.steps.flatMap(stepBlocks) : [];
}

/** DataTable と Examples の表の 1 行のセルの値。パーサーがエスケープを戻した値 */
function cellValues(row: TableRow): string[] {
  return row.cells.map((cell) => cell.value);
}

/** 表の 1 行を Gherkin の書き方に戻す。セルの値の `\`、`|`、改行はエスケープする */
function tableRowLine(cells: readonly string[]): string {
  const escaped = cells.map((value) => value.replaceAll('\\', '\\\\').replaceAll('|', '\\|').replaceAll('\n', '\\n'));
  return `| ${escaped.join(' | ')} |`;
}

/** 句。step.keyword は `Given ` のように後ろの空白まで含む。DataTable と DocString は句の後に続ける */
function stepBlocks(step: Step): StepBlock[] {
  const blocks: StepBlock[] = [{ kind: 'line', keyword: step.keyword, text: step.text }];
  if (step.dataTable) blocks.push({ kind: 'table', rows: step.dataTable.rows.map(cellValues) });
  if (step.docString) {
    const { delimiter, mediaType, content } = step.docString;
    const lines = [`${delimiter}${mediaType ?? ''}`, ...(content === '' ? [] : content.split('\n')), delimiter];
    blocks.push({ kind: 'docString', text: lines.join('\n') });
  }
  return blocks;
}

/** Scenario Outline の Examples。`Examples:` の行(名前があれば続ける)と表 */
function examplesBlocks(examples: Examples): StepBlock[] {
  const title: StepBlock = { kind: 'line', keyword: '', text: `${examples.keyword}:${examples.name ? ` ${examples.name}` : ''}` };
  if (!examples.tableHeader) return [title];
  return [title, { kind: 'table', rows: [examples.tableHeader, ...examples.tableBody].map(cellValues) }];
}
