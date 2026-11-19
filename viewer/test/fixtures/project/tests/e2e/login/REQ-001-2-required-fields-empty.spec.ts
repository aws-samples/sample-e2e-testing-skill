// feature: features/login.feature
// scenario: REQ-001-2 必須項目が空のときはエラーが表示される
// 引用元: docs/requirements.md > 3.2.2 エラー表示
import { expect, test } from '../../fixtures';

for (const { 項目, 期待メッセージ } of [
  { 項目: 'メールアドレス', 期待メッセージ: 'メールアドレスを入力してください' },
  { 項目: 'パスワード', 期待メッセージ: 'パスワードを入力してください' },
]) {
  test(`REQ-001-2 必須項目が空のときはエラーが表示される: ${項目}`, { tag: '@REQ-001-2' }, async ({ page }) => {
    // When: <項目> を空にして送信する
    await page.goto('/login');
    // Then: 「<期待メッセージ>」と表示される
    await expect(page.getByText(期待メッセージ)).toBeVisible();
  });
}
