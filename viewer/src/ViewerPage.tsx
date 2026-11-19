// 表のページの中身。表とページ内リンクだけで、スクリプトが無くても読める。上から次の順に並べる:
//   アプリ名、件数の 1 文、テストの結果の 1 文、CSV へのリンクと保存の案内、照合ツールの不整合の節(あるときだけ)、
//   機能の一覧表、機能にするか決まっていないものの表(候補があるときだけ)、機能ごとの節(要件とシナリオの表)
// 機能の一覧表は中身の幅で外枠に収め、要件とシナリオの表はページの幅いっぱいに描く。
// 2 つの表(class が resizable)には、column-resize.ts が後から列の幅を変えるつまみを付ける。
// 不整合の節と候補の表は section にも resizable にもしない。機能の節の section を選ぶテストとスタイルに入れないため。
// データを props で受け取るので、document.tsx からも Storybook からも描ける。
// 要件文と手順は、行頭のキーワードを左の欄にそろえるグリッドで描く。
// 要件文の行、手順の塊、feature-map の箇条書き、不整合の行は、どれも書かれた順のまま並べ替えないので、一覧の中の位置を key にする
import { Fragment } from 'react';
import { splitKeyword, splitRequirement } from './ears';
import type { CandidateView, FeatureView, ItemResult, LastRun, Notice, ResultCounts, Row, StepBlock, ViewerData } from './rows';

function countOf(items: readonly Row[], kind: Row['kind']): number {
  return items.filter((row) => row.kind === kind).length;
}

/**
 * 機能の節の表の ID の列の幅。どの節の表も同じ列の幅になるよう、ページの全部の要件とシナリオの ID のうち最長のものが 1 行に収まる幅にする。
 * ch は 0 の字の幅で、REQ の英大文字は 0 より広いことがあるので 1 字分を足す。1.5rem と 1px はセルの左右の padding と罫線の分
 */
function idColumnWidth(items: readonly Row[]): string {
  const chars = Math.max(0, ...items.map((row) => row.id.length));
  return `calc(${chars + 1}ch + 1.5rem + 1px)`;
}

/** 状態ごとの記号。色を見分けられなくても進み具合が分かるよう、形を変える */
const STATUS_MARKS: Record<string, string> = { 未着手: '○', 定義済み: '◐', テスト済み: '●', 対象外: '✕' };
/** .feature の無い機能の節に、表の代わりに出す一言 */
const EMPTY_NOTES: Record<string, string> = { 未着手: '要件とシナリオはまだありません。', 対象外: 'テストの対象から外しています。' };
/** 件数の語と並び */
const COUNT_LABELS: readonly [keyof ResultCounts, string][] = [
  ['pass', 'pass'],
  ['fail', 'fail'],
  ['knownBug', '既知バグ'],
  ['ungenerated', '未生成'],
  ['notRun', '未実行'],
];

/** 機能の状態。色を見分けられなくても進み具合が分かるよう、状態ごとに形の違う記号を付ける。記号は読み上げず、文字のラベルを読ませる */
function Status({ status }: { status: string }) {
  const mark = STATUS_MARKS[status];
  return (
    <span className="status">
      {mark !== undefined && (
        <span className="status-mark" aria-hidden="true">
          {mark}
        </span>
      )}
      {status}
    </span>
  );
}

/** 件数を `pass 2、fail 1` の形で描く。withZero でなければ 0 の件数を省く。fail は朱の太字 */
function Counts({ counts, withZero = false }: { counts: ResultCounts; withZero?: boolean }) {
  const parts = COUNT_LABELS.filter(([key]) => withZero || counts[key] > 0);
  return (
    <>
      {parts.map(([key, label], index) => (
        <Fragment key={key}>
          {index > 0 && '、'}
          {key === 'fail' ? <span className="fail">{`${label} ${counts[key]}`}</span> : `${label} ${counts[key]}`}
        </Fragment>
      ))}
    </>
  );
}

/** テストの結果の 1 文。開始日時は文字列のまま出し、無ければ括弧ごと省く */
function RunSummary({ lastRun, totals }: { lastRun: LastRun | null; totals: ResultCounts }) {
  if (lastRun === null) return <p>全体実行の結果はまだありません。</p>;
  const startTime = lastRun.startTime === null ? '' : `(${lastRun.startTime})`;
  return (
    <p>
      {`最後の全体実行: ${lastRun.runId}${startTime}。`}
      <Counts counts={totals} withZero />。
    </p>
  );
}

/** 箇条書き */
function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul>
      {Array.from(items.entries(), ([position, item]) => (
        <li key={position}>{item}</li>
      ))}
    </ul>
  );
}

export function ViewerPage({ app, lastRun, totals, notices, features, candidates }: ViewerData) {
  const items = features.flatMap((feature) => feature.items);
  const idWidth = idColumnWidth(items);
  return (
    <main>
      <h1>{app}</h1>
      <p>{`E2E テストの仕様。機能 ${features.length}、要件 ${countOf(items, '要件')}、シナリオ ${countOf(items, 'シナリオ')}。`}</p>
      <RunSummary lastRun={lastRun} totals={totals} />
      {/* index.html と同じディレクトリの review.csv への相対リンク */}
      <p>
        レビュー用の CSV: <a href="review.csv">review.csv</a>
      </p>
      <p className="note">コメントの列に修正の依頼を書き、Excel では「CSV UTF-8」を選んで features/viewer/ の外に保存する</p>
      {notices.length > 0 && <Notices notices={notices} />}
      <div className="table-scroll">
        <table className="resizable">
          <thead>
            <tr>
              <th>機能名</th>
              <th>状態</th>
              <th>説明</th>
              <th className="number">要件数</th>
              <th className="number">シナリオ数</th>
              <th>結果</th>
              <th>確認したいこと</th>
            </tr>
          </thead>
          <tbody>
            {features.map(({ row, summary, questions, counts, items: featureItems }) => (
              <tr key={row.id}>
                {/* slug は機能名の下に小さく出す。名前の計算で機能名と slug がつながらないよう、間の空白を DOM に入れる */}
                <td>
                  <a href={`#${row.id}`}>{row.feature}</a> <span className="slug">{row.id}</span>
                </td>
                <td>
                  <Status status={row.status} />
                </td>
                <td>
                  <div className="summary">{summary}</div>
                </td>
                <td className="number">{countOf(featureItems, '要件')}</td>
                <td className="number">{countOf(featureItems, 'シナリオ')}</td>
                <td>{counts !== null && <Counts counts={counts} />}</td>
                <td>{questions.length > 0 && <a href={`#${row.id}`}>{`${questions.length} 件`}</a>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {candidates.length > 0 && <Candidates candidates={candidates} />}
      {features.map((feature) => (
        <FeatureSection key={feature.row.id} app={app} idWidth={idWidth} feature={feature} />
      ))}
    </main>
  );
}

/** 照合ツールの止めない不整合と、状態と結果の食い違い */
function Notices({ notices }: { notices: readonly Notice[] }) {
  return (
    <div className="notices">
      <h2>照合ツールの不整合</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>種別</th>
              <th>機能</th>
              <th>対象</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(notices.entries(), ([position, { kind, feature, target }]) => (
              <tr key={position}>
                <td>{kind}</td>
                <td>{feature}</td>
                <td>{target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** 機能にするか決まっていないもの。slug は名前の下に小さく出す */
function Candidates({ candidates }: { candidates: readonly CandidateView[] }) {
  return (
    <div className="candidates">
      <h2>機能にするか決まっていないもの</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>名前</th>
              <th>理由</th>
              <th>根拠</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map(({ row, reason, sources }) => (
              <tr key={row.id}>
                <td>
                  {row.feature} <span className="slug">{row.id}</span>
                </td>
                <td>{reason}</td>
                <td>{sources.length > 0 && <BulletList items={sources} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * 行頭のキーワードと本文の 1 行。separator はキーワードと本文の間の DOM の空白で、グリッドの中では描かれず、
 * textContent と読み上げで語がつながらないようにする
 */
function KeywordLine({ className, keyword, separator, text }: { className: string; keyword: string; separator: string; text: string }) {
  return (
    <div className={`keyword-line ${className}`}>
      <span className="keyword">{keyword}</span>
      {separator}
      <span className="keyword-text">{text}</span>
    </div>
  );
}

/** 要件文。キーワードの前で分けた行を 1 行ずつ、キーワードと本文に分けて並べる。行の間には空白を置き、textContent を元の要件文と同じにする */
function RequirementText({ text, app }: { text: string; app: string }) {
  const lines = splitRequirement(text, app).map(splitKeyword);
  return (
    <div className="keyword-grid">
      {Array.from(lines.entries(), ([position, line]) => (
        <Fragment key={position}>
          {position > 0 && ' '}
          <KeywordLine
            className="ears-line"
            keyword={line.keyword}
            separator={line.keyword !== '' && line.text !== '' ? ' ' : ''}
            text={line.text}
          />
        </Fragment>
      ))}
    </div>
  );
}

/**
 * 要件とシナリオの表の結果のセル。要件は配下のシナリオの件数で、どのシナリオにもテストが無ければ未生成。
 * シナリオは結果の語、理由(既知バグと fail 指定だが通過)、結ばれたテストファイルへのリンク
 */
function ResultCell({ result }: { result: ItemResult }) {
  if (result.kind === 'requirement') return result.untested ? '未生成' : <Counts counts={result.counts} />;
  return (
    <>
      {result.outcome === 'fail' ? <strong className="fail">fail</strong> : result.outcome}
      {result.reason !== null && <div className="reason">{result.reason}</div>}
      {result.specs.map((spec) => (
        <div key={spec.path}>
          <a className="spec-link" href={spec.href} title={spec.path}>
            {spec.path}
          </a>
        </div>
      ))}
    </>
  );
}

/**
 * 機能の節。見出しは機能名と状態。feature-map の項目・Background・引用元のうち値のあるものと、要件とシナリオの表。idWidth は ID の列の幅。
 * 含む・含まない・根拠・確認したいことは箇条書きにし、確認したいことは地の色で目立たせる
 */
function FeatureSection({ app, idWidth, feature }: { app: string; idWidth: string; feature: FeatureView }) {
  const { row, summary, includes, excludes, sources, questions, decided, items } = feature;
  const list = (values: readonly string[]) => values.length > 0 && <BulletList items={values} />;
  const details = [
    { term: '概要', content: summary !== '' && summary },
    { term: '含む', content: list(includes) },
    { term: '含まない', content: list(excludes) },
    { term: '根拠', content: list(sources) },
    { term: '確認したいこと', content: list(questions), className: 'questions' },
    { term: '決めたこと', content: decided !== '' && decided },
    { term: 'Background', content: row.stepBlocks.length > 0 && <Steps blocks={row.stepBlocks} /> },
    { term: '引用元', content: row.source !== '' && row.source },
  ].filter(({ content }) => content !== false);
  const emptyNote = items.length === 0 ? EMPTY_NOTES[row.status] : undefined;
  return (
    <section id={row.id}>
      {/* 名前の計算で機能名と状態がつながらないよう、間の空白を DOM に入れる */}
      <h2>
        {row.feature} <Status status={row.status} />
      </h2>
      {details.length > 0 && (
        <dl className="details">
          {details.map(({ term, content, className }) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd className={className === undefined ? 'text' : `text ${className}`}>{content}</dd>
            </div>
          ))}
        </dl>
      )}
      {emptyNote !== undefined && <p className="note">{emptyNote}</p>}
      {items.length > 0 && (
        <div className="table-scroll">
          <table className="resizable">
            {/*
              列の幅。スクリプトが無くても効くよう HTML に書く。本文・手順・引用元・結果の % の合計は 100% なので、ID の列の分だけ表の幅を超える。
              table-layout: fixed の表は、そのとき % の列を比を保って縮めるので、ID の列の残りを 30:40:15:15 で分ける
            */}
            <colgroup>
              <col style={{ width: idWidth }} />
              <col style={{ width: '30%' }} />
              <col style={{ width: '40%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>ID</th>
                <th>本文</th>
                <th>手順</th>
                <th>引用元</th>
                <th>結果</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className={item.kind === '要件' ? 'requirement' : undefined}>
                  <td>{item.id}</td>
                  <td className="text">{item.kind === '要件' ? <RequirementText text={item.body} app={app} /> : item.body}</td>
                  <td className="text">
                    <Steps blocks={item.stepBlocks} />
                  </td>
                  <td className="text">{item.source}</td>
                  <td>
                    <ResultCell result={item.result} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

/**
 * 手順。句と Examples の行は 1 行ずつキーワードと本文に分け、DataTable と Examples の表は表に、DocString は改行を保ったまま、
 * どれも本文の欄に描く。塊の間には改行を置き、コピーや読み上げで前の塊とつながらないようにする
 */
function Steps({ blocks }: { blocks: readonly StepBlock[] }) {
  return (
    <div className="keyword-grid">
      {Array.from(blocks.entries(), ([position, block]) => (
        <Fragment key={position}>
          {position > 0 && '\n'}
          <StepBlockView block={block} />
        </Fragment>
      ))}
    </div>
  );
}

function StepBlockView({ block }: { block: StepBlock }) {
  if (block.kind === 'table') return <StepTable rows={block.rows} />;
  if (block.kind === 'docString') return <pre className="doc-string">{block.text}</pre>;
  const keyword = block.keyword.trimEnd();
  return <KeywordLine className="step-line" keyword={keyword} separator={block.keyword.slice(keyword.length)} text={block.text} />;
}

/** DataTable か Examples の表。1 行目を見出しにする */
function StepTable({ rows }: { rows: readonly string[][] }) {
  const [header = [], ...body] = rows;
  return (
    <table className="step-table">
      <thead>
        <tr>
          {Array.from(header.entries(), ([column, value]) => (
            <th key={column} scope="col">
              {value}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from(body.entries(), ([line, cells]) => (
          <tr key={line}>
            {Array.from(cells.entries(), ([column, value]) => (
              <td key={column}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
