// ページの HTML の外枠(html・head・body)。title と、書体の @font-face の <style> と、styles.css の <style> と、列の幅を変える <script> を持つ。
// 外部のファイルを参照せず、スクリプトもモジュールでない普通のものを直接書くので、出力の index.html をファイルとして直接開ける
import type { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { fontFaceCss } from './font';
import type { ViewerData } from './rows';
import css from './styles.css';
import { ViewerPage } from './ViewerPage';

/** column-resize.ts の enableColumnResize(document) を即時実行の形にまとめたコード。bundle.mts が esbuild の define で文字列に置き換える */
declare const COLUMN_RESIZE_SCRIPT: string;

function Document({ title, children }: { title: string; children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        {/* React は <style> の中の文字列をエスケープしないので、CSS がそのまま入る */}
        <style>{fontFaceCss}</style>
        <style>{css}</style>
      </head>
      <body>
        {children}
        {/* 表を描いた後に実行するよう、body の最後に置く。<script> の中の文字列も、React はエスケープしない */}
        <script>{COLUMN_RESIZE_SCRIPT}</script>
      </body>
    </html>
  );
}

/**
 * 表のページの HTML の全体。renderToStaticMarkup は doctype を付けないので、先頭に付ける。
 * 差分を読めるよう、表の行(<tr の開始タグ)ごとに改行する。React はテキストと属性の値をエスケープするので、<tr は開始タグにしか現れない。
 * <style> と <script> の中身はエスケープされないので、そこに <tr が無いことは bundle.mts が確かめる。
 * React のツリーの中に改行を入れると tbody の子のテキストになって警告が出るので、描いた後の文字列に入れる
 */
export function renderHtml(data: ViewerData): string {
  const markup = renderToStaticMarkup(
    <Document title={data.app}>
      <ViewerPage {...data} />
    </Document>,
  );
  return `<!doctype html>${markup.replace(/<tr(?=[\s>])/g, '\n<tr')}`;
}
