// ears.ts が要件文をキーワードの前で行に分け、各行を先頭のキーワードと本文に分けることを確かめる
import { expect, test } from 'vitest';
import { splitKeyword, splitRequirement } from '../src/ears';

const APP = '会員サイト';

test.each([
  { form: '常時', text: 'The 会員サイト SHALL ログイン画面を表示する', lines: ['The 会員サイト', 'SHALL ログイン画面を表示する'] },
  {
    form: '事象駆動',
    text: 'WHEN 正しい資格情報を送信した, the 会員サイト SHALL ダッシュボードを表示する',
    lines: ['WHEN 正しい資格情報を送信した,', 'the 会員サイト', 'SHALL ダッシュボードを表示する'],
  },
  {
    form: '状態駆動',
    text: 'WHILE ログインしている, the 会員サイト SHALL ユーザー名を表示する',
    lines: ['WHILE ログインしている,', 'the 会員サイト', 'SHALL ユーザー名を表示する'],
  },
  {
    form: '任意機能',
    text: 'WHERE 二要素認証が有効になっている, the 会員サイト SHALL 確認コードを求める',
    lines: ['WHERE 二要素認証が有効になっている,', 'the 会員サイト', 'SHALL 確認コードを求める'],
  },
  {
    form: '望ましくない挙動',
    text: 'IF 5 回続けて誤ったパスワードを送信した, THEN the 会員サイト SHALL アカウントをロックする',
    lines: ['IF 5 回続けて誤ったパスワードを送信した,', 'THEN the 会員サイト', 'SHALL アカウントをロックする'],
  },
  {
    form: '複合',
    text: 'WHILE カートに商品がある, WHEN 購入ボタンを押した, the 会員サイト SHALL 注文確認画面を表示する',
    lines: ['WHILE カートに商品がある,', 'WHEN 購入ボタンを押した,', 'the 会員サイト', 'SHALL 注文確認画面を表示する'],
  },
])('$form の要件文は、キーワードとアプリ名が続く the の前で分かれ、文字は区切りの空白のほかに変わらない', ({ text, lines }) => {
  expect(splitRequirement(text, APP)).toEqual(lines);
  expect(lines.join(' ')).toBe(text);
});

test('アプリ名が続かない the では分けない', () => {
  expect(splitRequirement('WHEN 検索した, the 会員サイト SHALL the latest な商品と the 会員サイトマップを表示する', APP)).toEqual([
    'WHEN 検索した,',
    'the 会員サイト',
    'SHALL the latest な商品と the 会員サイトマップを表示する',
  ]);
});

test('空白や記号を含むアプリ名でも、そのアプリ名が続く the の前で分ける', () => {
  const app = 'Acme Shop (β) +1';
  expect(splitRequirement('WHEN 送信した, the Acme Shop (β) +1 SHALL 保存する', app)).toEqual([
    'WHEN 送信した,',
    'the Acme Shop (β) +1',
    'SHALL 保存する',
  ]);
  expect(splitRequirement('WHEN 送信した, the Acme Shop SHALL 保存する', app)).toEqual(['WHEN 送信した, the Acme Shop', 'SHALL 保存する']);
});

test('キーワードの綴りを含む別の語や小文字のキーワードでは分けず、アプリ名の中のキーワードでも分けない', () => {
  expect(splitRequirement('WHEN SHALLOW な階層を開いた, the 会員サイト SHALL IFの説明と when の例を表示する', APP)).toEqual([
    'WHEN SHALLOW な階層を開いた,',
    'the 会員サイト',
    'SHALL IFの説明と when の例を表示する',
  ]);
  expect(splitRequirement('WHEN 開いた, the IF Portal SHALL 表示する', 'IF Portal')).toEqual([
    'WHEN 開いた,',
    'the IF Portal',
    'SHALL 表示する',
  ]);
});

test('区切りの空白が複数あっても、行の端に空白を残さない', () => {
  expect(splitRequirement('WHEN 送信した,  the 会員サイト   SHALL 保存する', APP)).toEqual([
    'WHEN 送信した,',
    'the 会員サイト',
    'SHALL 保存する',
  ]);
});

test.each([
  {
    form: '常時',
    text: 'The 会員サイト SHALL ログイン画面を表示する',
    pairs: [
      ['The', '会員サイト'],
      ['SHALL', 'ログイン画面を表示する'],
    ],
  },
  {
    form: '事象駆動',
    text: 'WHEN 正しい資格情報を送信した, the 会員サイト SHALL ダッシュボードを表示する',
    pairs: [
      ['WHEN', '正しい資格情報を送信した,'],
      ['the', '会員サイト'],
      ['SHALL', 'ダッシュボードを表示する'],
    ],
  },
  {
    form: '状態駆動',
    text: 'WHILE ログインしている, the 会員サイト SHALL ユーザー名を表示する',
    pairs: [
      ['WHILE', 'ログインしている,'],
      ['the', '会員サイト'],
      ['SHALL', 'ユーザー名を表示する'],
    ],
  },
  {
    form: '任意機能',
    text: 'WHERE 二要素認証が有効になっている, the 会員サイト SHALL 確認コードを求める',
    pairs: [
      ['WHERE', '二要素認証が有効になっている,'],
      ['the', '会員サイト'],
      ['SHALL', '確認コードを求める'],
    ],
  },
  {
    form: '望ましくない挙動',
    text: 'IF 5 回続けて誤ったパスワードを送信した, THEN the 会員サイト SHALL アカウントをロックする',
    pairs: [
      ['IF', '5 回続けて誤ったパスワードを送信した,'],
      ['THEN the', '会員サイト'],
      ['SHALL', 'アカウントをロックする'],
    ],
  },
  {
    form: '複合',
    text: 'WHILE カートに商品がある, WHEN 購入ボタンを押した, the 会員サイト SHALL 注文確認画面を表示する',
    pairs: [
      ['WHILE', 'カートに商品がある,'],
      ['WHEN', '購入ボタンを押した,'],
      ['the', '会員サイト'],
      ['SHALL', '注文確認画面を表示する'],
    ],
  },
])('$form の要件文の各行は、先頭のキーワードと本文に分かれ、戻すと元の要件文になる', ({ text, pairs }) => {
  const lines = splitRequirement(text, APP).map(splitKeyword);
  expect(lines.map((line) => [line.keyword, line.text])).toEqual(pairs);
  expect(lines.map((line) => [line.keyword, line.text].filter((s) => s !== '').join(' ')).join(' ')).toBe(text);
});

test('本文の中の英語の the やキーワードは本文に残し、行頭のキーワードだけを分ける', () => {
  expect(splitKeyword('SHALL the latest な商品と WHEN の例を表示する')).toEqual({
    keyword: 'SHALL',
    text: 'the latest な商品と WHEN の例を表示する',
  });
});

test.each([
  'ユーザーはログインできる',
  'when 送信した',
  'WHENEVER 送信した',
  'SHALLOW な階層を開いた,',
  'IFの説明を表示する',
  'theory を表示する',
])('キーワードで始まらない行「%s」はキーワードが空', (line) => {
  expect(splitKeyword(line)).toEqual({ keyword: '', text: line });
});

test('THEN の後ろが the の語でなければ、the をまとめない', () => {
  expect(splitKeyword('THEN theory を表示する')).toEqual({ keyword: 'THEN', text: 'theory を表示する' });
});

test('キーワードだけの行は本文が空', () => {
  expect(splitKeyword('SHALL')).toEqual({ keyword: 'SHALL', text: '' });
});

test('キーワードと本文の間の空白が複数でも、本文の先頭に空白を残さない', () => {
  expect(splitKeyword('WHEN  送信した,')).toEqual({ keyword: 'WHEN', text: '送信した,' });
});
