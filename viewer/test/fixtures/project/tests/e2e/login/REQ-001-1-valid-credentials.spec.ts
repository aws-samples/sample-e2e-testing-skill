// feature: features/login.feature
// scenario: REQ-001-1 正しい資格情報でログインできる
// 引用元: docs/requirements.md > 3.2 認証
import { expect, test } from '../../fixtures';

test('REQ-001-1 正しい資格情報でログインできる', { tag: '@REQ-001-1' }, async ({ page }) => {
  // When: 次の資格情報を入力して送信する
  await page.goto('/login');
  // Then: ダッシュボードに「ようこそ」と表示される
  await expect(page.getByRole('heading', { name: 'ようこそ' })).toBeVisible();
});
