// EARS の要件文を、表で読みやすいようにキーワードの前で行に分ける。表でキーワードを本文の左の欄にそろえるため、1 行を先頭のキーワードと本文にも分ける。
// 表示のためだけのもので、CSV の要件文は 1 行のまま
const KEYWORDS = ['WHEN', 'WHILE', 'WHERE', 'IF', 'THEN', 'SHALL'];
/** 直前の語が THEN か。`THEN the <アプリ名>` は 1 行にまとめる */
const AFTER_THEN_RE = /(?:^|\s)THEN$/;
/** 行頭のキーワード。THEN the を THEN より先に試す */
const LEADING_KEYWORD_RE = /^(?:THEN\s+the|WHEN|WHILE|WHERE|IF|THEN|SHALL|the|The)(?=\s|$)/;

export type KeywordLine = { keyword: string; text: string };

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 要件文を、語として現れる WHEN・WHILE・WHERE・IF・THEN・SHALL と、アプリ名が続く the の前で行に分ける。
 * 語として現れるとは、前後が空白か文の端であること(SHALLOW や IFの では分けない)。キーワードは大文字だけを見る。
 * 文頭では分けず、THEN の直後の the でも分けない。カンマは前の行の末尾に残し、区切りの空白は行の端から除く。それ以外の文字は変えない
 */
export function splitRequirement(text: string, app: string): string[] {
  // 区切りの空白(space)と、その後ろの目印。`the <アプリ名>`(subject)はアプリ名まで読み進めるので、アプリ名の中のキーワードの綴りでは分けない
  const keyword = `(?=(?:${KEYWORDS.join('|')})(?:\\s|$))`;
  const subject = `(?<subject>the\\s+${escapeRegExp(app)})(?=\\s|$)`;
  const marker = new RegExp(`(?<=\\S)(?<space>\\s+)(?:${keyword}|${subject})`, 'g');
  const lines: string[] = [];
  let start = 0;
  for (const match of text.matchAll(marker)) {
    if (match.groups?.subject !== undefined && AFTER_THEN_RE.test(text.slice(0, match.index))) continue;
    lines.push(text.slice(start, match.index));
    start = match.index + (match.groups?.space.length ?? 0);
  }
  lines.push(text.slice(start));
  return lines;
}

/**
 * splitRequirement が返した 1 行の先頭のキーワードと、その後ろ。THEN の後ろの the はまとめてキーワードにし、どの要件文でもアプリ名が本文の欄の先頭にそろうようにする。
 * キーワードは大文字小文字を区別し、語として現れるもの(後ろが空白か行末)だけ。キーワードで始まらない行はキーワードを空にする
 */
export function splitKeyword(line: string): KeywordLine {
  const keyword = LEADING_KEYWORD_RE.exec(line)?.[0];
  if (keyword === undefined) return { keyword: '', text: line };
  return { keyword, text: line.slice(keyword.length).trimStart() };
}
