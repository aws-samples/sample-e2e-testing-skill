// feature: features/login.feature
// scenario: REQ-002-1 5 回失敗するとロックされる
import { expect, test } from '../../fixtures';

test('REQ-002-1 5 回失敗するとロックされる', { tag: '@REQ-002-1' }, async ({ page }) => {
  // When: 誤ったパスワードで 5 回送信する
  await page.goto('/login');
  // Then: 次の通知が表示される
  await expect(page.getByText('アカウントをロックしました。')).toBeVisible();
});
