// feature: features/login.feature
// scenario: REQ-002-1 5回失敗するとロックされる
// 引用元: docs/requirements.md > 3.3 アカウントロック
import { test, expect } from '@playwright/test';

// 既知バグ(ユーザー判断後): test.fail で宣言し、issue アノテーションに判断日と根拠を書く。tag は annotation より前に置く
test.fail(
  'REQ-002-1 5回失敗するとロックされる',
  { tag: '@REQ-002-1', annotation: { type: 'issue', description: '2026-09-01 ユーザー判断: ロックが掛からない。#123' } },
  async ({ page }) => {
    // Given: ログインページを表示している
    await page.goto('/login');

    // When: 誤ったパスワードで5回連続してログインを試みる
    for (let i = 0; i < 5; i++) {
      await page.getByLabel('メールアドレス').fill('user@example.com');
      await page.getByLabel('パスワード').fill(`wrong-password-${i}`);
      await page.getByRole('button', { name: 'ログイン' }).click();
    }

    // Then: 「アカウントがロックされました。15分後に再試行してください」と表示される
    await expect(page.getByRole('alert')).toHaveText('アカウントがロックされました。15分後に再試行してください');
  },
);
