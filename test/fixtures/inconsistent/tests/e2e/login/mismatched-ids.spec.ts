// feature: features/login.feature
// scenario: REQ-001-2 正しい資格情報でログインできる
import { test, expect } from '@playwright/test';

// ID 不一致の 4 パターン(1 ファイルにまとめる)

// (1) 名前にだけ ID がある(tag 無し)
test('REQ-001-2 名前だけに ID がある', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'ログイン' })).toBeVisible();
});

// (2) tag にだけ ID がある(名前先頭に ID 無し)
test('tag だけに ID がある', { tag: '@REQ-001-2' }, async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'ログイン' })).toBeVisible();
});

// (3) 両方にあるが文字列が異なる
test('REQ-001-2 名前と tag の ID が異なる', { tag: '@REQ-001-3' }, async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'ログイン' })).toBeVisible();
});

// (4) tag の ID が 2 つある
test('REQ-001-2 tag が 2 つある', { tag: ['@REQ-001-2', '@REQ-001-3'] }, async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'ログイン' })).toBeVisible();
});
