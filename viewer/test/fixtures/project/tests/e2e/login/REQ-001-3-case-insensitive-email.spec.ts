// feature: features/login.feature
// scenario: REQ-001-3 メールアドレスの大文字小文字を区別せずにログインできる
// 引用元: docs/requirements.md > 3.2 認証
import { expect, test } from '../../fixtures';

test.fail(
  'REQ-001-3 メールアドレスの大文字小文字を区別せずにログインできる',
  { tag: '@REQ-001-3', annotation: { type: 'issue', description: '2026-09-20 ユーザー判断: 大文字のメールアドレスを拒む。#120' } },
  async ({ page }) => {
    // When: メールアドレスを大文字で入力して送信する
    await page.goto('/login');
    // Then: ダッシュボードに「ようこそ」と表示される
    await expect(page.getByRole('heading', { name: 'ようこそ' })).toBeVisible();
  },
);
