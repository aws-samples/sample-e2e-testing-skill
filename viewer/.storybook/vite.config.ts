// Storybook と、vitest の storybook プロジェクトが使う Vite の設定。
// @storybook/react-vite は @vitejs/plugin-react を自分では足さない(preset が足すのは react-docgen のプラグインだけ)ので、ここで足す
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [viteReact()],
});
