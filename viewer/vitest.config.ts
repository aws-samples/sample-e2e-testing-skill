// viewer のテストの設定。`pnpm test` は 2 つのプロジェクトを実行する。
//   node: test/ のテスト(rows.ts、csv.ts、output.ts、ears.ts、コミットされた build.mjs、build.mjs が古くないか)を Node で実行する
//   storybook: stories/ のストーリーを Chromium で描き、描画・アクセシビリティ・play 関数の検査をする
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        test: { name: 'node', include: ['test/**/*.test.ts'], environment: 'node' },
      },
      {
        extends: './.storybook/vite.config.ts',
        plugins: [storybookTest({ configDir: fileURLToPath(new URL('./.storybook', import.meta.url)) })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
