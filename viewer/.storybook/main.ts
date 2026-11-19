// 表のページ(ViewerPage)を描く Storybook の設定。開発用で、bundle.mts は読まない
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/*.stories.tsx'],
  addons: ['@storybook/addon-vitest', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    // @storybook/react-vite は React のプラグインを足さないので、それを足す .storybook/vite.config.ts を読ませる。Vite は相対パスをカレントディレクトリから解決するので、絶対パスにする
    options: { builder: { viteConfigPath: fileURLToPath(new URL('./vite.config.ts', import.meta.url)) } },
  },
  core: { disableTelemetry: true },
};

export default config;
