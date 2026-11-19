// feature: features/login.feature
// scenario: REQ-001-3 必須項目が空のときはエラーが表示される
// 引用元: docs/requirements.md > 3.2 認証
import { test, expect } from '@playwright/test';

// Scenario Outline の Examples 行ごとに test を展開する。全 test に同一のシナリオ ID を付ける

test('REQ-001-3 必須項目が空のときはエラーが表示される: メールアドレス', { tag: '@REQ-001-3' }, async ({ page }) => {
  // Given: ログインページを表示している
  await page.goto('/login');

  // When: メールアドレス を空にして送信する
  await page.getByLabel('パスワード').fill('correct-password');
  await page.getByRole('button', { name: 'ログイン' }).click();

  // Then: 「メールアドレスを入力してください」と表示される
  await expect(page.getByText('メールアドレスを入力してください')).toBeVisible();
});

test(
  'REQ-001-3 必須項目が空のときはエラーが表示される: パスワード',
  { tag: '@REQ-001-3' },
  async ({ page }) => {
    // Given: ログインページを表示している
    await page.goto('/login');

    // When: パスワード を空にして送信する
    await page.getByLabel('メールアドレス').fill('user@example.com');
    await page.getByRole('button', { name: 'ログイン' }).click();

    // Then: 「パスワードを入力してください」と表示される
    await expect(page.getByText('パスワードを入力してください')).toBeVisible();
  },
);
