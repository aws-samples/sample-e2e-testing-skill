// 英字と数字の書体 Atkinson Hyperlegible Next の @font-face。document.tsx が出力の <style> に、.storybook/preview.ts が Storybook のページに入れる。
// latin のサブセットの可変ウェイト(wght、normal)だけを使い、イタリックと latin-ext は使わない
import fontUrl from '@fontsource-variable/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-normal.woff2';

/** unicode-range はパッケージの wght.css の latin の @font-face と同じ値 */
export const fontFaceCss = [
  '/* Atkinson Hyperlegible Next: Copyright 2020-2024 The Atkinson Hyperlegible Next Project Authors (https://github.com/googlefonts/atkinson-hyperlegible-next)',
  '   SIL Open Font License 1.1 https://openfontlicense.org */',
  '@font-face {',
  '  font-family: "Atkinson Hyperlegible Next";',
  '  font-style: normal;',
  '  font-weight: 200 800;',
  '  font-display: swap;',
  `  src: url("${fontUrl}") format("woff2");`,
  '  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;',
  '}',
].join('\n');
