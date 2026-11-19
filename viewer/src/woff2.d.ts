// 書体の woff2 の import の型。bundle.mts の esbuild(loader の '.woff2': 'dataurl')では data: URL、Storybook の Vite では配信する URL の文字列が default export になる
declare module '*.woff2' {
  const url: string;
  export default url;
}
