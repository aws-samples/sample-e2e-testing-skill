// feature: features/login.feature
// scenario: 正しい資格情報でログインできる
import { test, expect } from '@playwright/test';

// シナリオ ID 導入前の古いテスト。名前にも tag にも ID が無い → 孤立テスト
test('ログインできる', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('メールアドレス').fill('user@example.com');
  await page.getByLabel('パスワード').fill('correct-password');
  await page.getByRole('button', { name: 'ログイン' }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
});
