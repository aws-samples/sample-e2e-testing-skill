// feature: features/login.feature
// scenario: REQ-009-1 パスワードを再設定できる
import { test, expect } from '@playwright/test';

// 名前と tag の ID は一致しているが、その ID を持つ有効な Scenario がどの .feature にも無い → 不明 ID 参照
test('REQ-009-1 パスワードを再設定できる', { tag: '@REQ-009-1' }, async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('link', { name: 'パスワードを忘れた' }).click();
  await page.getByLabel('メールアドレス').fill('user@example.com');
  await page.getByRole('button', { name: '送信' }).click();
  await expect(page.getByText('再設定メールを送信しました')).toBeVisible();
});
