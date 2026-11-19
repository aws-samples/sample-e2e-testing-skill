// すべてのストーリーに共通する設定。表のページと同じ styles.css と書体の @font-face を読み、書体を読み込んでから描く
import type { Preview } from '@storybook/react-vite';
import { fontFaceCss } from '../src/font';
import '../src/styles.css';

const fontFace = document.createElement('style');
fontFace.textContent = fontFaceCss;
document.head.append(fontFace);

const preview: Preview = {
  parameters: {
    // アクセシビリティの違反があれば、vitest のテストを失敗させる
    a11y: { test: 'error' },
  },
  // font-display: swap で途中から書体が替わると、幅を測る検査が揺れるので、描く前に読み込んでおく
  loaders: [
    async () => {
      await document.fonts.load('16px "Atkinson Hyperlegible Next"', 'A');
    },
  ],
};

export default preview;
