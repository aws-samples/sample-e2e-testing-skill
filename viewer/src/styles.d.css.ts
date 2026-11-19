// bundle.mts の esbuild が styles.css を文字列として取り込む(loader の '.css': 'text')ので、default export は CSS の本文。
// tsconfig の allowArbitraryExtensions により、'./styles.css' の import はこのファイルの型になる
declare const css: string;
export default css;
