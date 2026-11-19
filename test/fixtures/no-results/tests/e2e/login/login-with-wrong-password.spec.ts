// feature: features/login.feature
// scenario: REQ-001-2 誤ったパスワードではエラーが表示される
// 引用元: docs/requirements.md > 3.2.1 エラー表示
import { test, expect } from '@playwright/test';

const ERROR_MESSAGE = 'メールアドレスまたはパスワードが違います';

test.describe('ログイン', () => {
  test.beforeEach(async ({ request }) => {
    // このシナリオが前提とするユーザーを投入(このファイル専用)
    await request.post('/api/test-data/users', {
      data: { email: 'user@example.com', password: 'correct-password' },
    });
  });

  test.afterEach(async ({ request }) => {
    // 失敗・タイムアウト時も実行される後始末
    await request.delete('/api/test-data/users?email=user@example.com');
  });

  test(`REQ-001-2 誤ったパスワードでは「${ERROR_MESSAGE}」と表示される`, { tag: '@REQ-001-2' }, async ({ page }) => {
    // Given: ログインページを表示している
    await page.goto('/login');

    // When: 正しいメールアドレスと誤ったパスワードを入力して送信する
    await page.getByLabel('メールアドレス').fill('user@example.com');
    await page.getByLabel('パスワード').fill('wrong-password');
    await page.getByRole('button', { name: 'ログイン' }).click();

    // Then: 「メールアドレスまたはパスワードが違います」と表示される
    await expect(page.getByRole('alert')).toHaveText(ERROR_MESSAGE);
  });
});
