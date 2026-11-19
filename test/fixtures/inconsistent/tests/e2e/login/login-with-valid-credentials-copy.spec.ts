// feature: features/login.feature
// scenario: REQ-001-2 正しい資格情報でログインできる
// 引用元: docs/requirements.md > 3.2 認証
import { test, expect } from '@playwright/test';

// 同じシナリオ ID(REQ-001-2)を持つ 2 つ目のテストファイル(「1 シナリオ 1 ファイル」の違反 → 重複 ID)
test('REQ-001-2 正しい資格情報でログインできる', { tag: '@REQ-001-2' }, async ({ page }) => {
  // Given: ログインページを表示している
  await page.goto('/login');

  // When: 正しいメールアドレスとパスワードを入力して送信する
  await page.getByLabel('メールアドレス').fill('user@example.com');
  await page.getByLabel('パスワード').fill('correct-password');
  await page.getByRole('button', { name: 'ログイン' }).click();

  // Then: ダッシュボードに「ようこそ」と表示される
  await expect(page).toHaveURL(/\/dashboard$/);
});
