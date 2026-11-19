// feature: features/login.feature
// scenario: REQ-001-10 メールアドレスの大文字小文字を区別せずにログインできる
// 引用元: docs/requirements.md > 3.2 認証
import { test, expect } from '@playwright/test';

// ID 以外の tag(@smoke)を併記した test。照合ツールは @REQ-… 形式の tag だけを読む(規約では ID 以外の tag は付けない)
test('REQ-001-10 メールアドレスの大文字小文字を区別せずにログインできる', { tag: ['@REQ-001-10', '@smoke'] }, async ({ page }) => {
  // Given: ログインページを表示している
  await page.goto('/login');

  // When: メールアドレスを大文字で入力し正しいパスワードで送信する
  await page.getByLabel('メールアドレス').fill('USER@EXAMPLE.COM');
  await page.getByLabel('パスワード').fill('correct-password');
  await page.getByRole('button', { name: 'ログイン' }).click();

  // Then: ダッシュボードに「ようこそ」と表示される
  await expect(page.getByRole('heading', { name: 'ようこそ' })).toBeVisible();
});
