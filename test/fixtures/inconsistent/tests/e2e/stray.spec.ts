import { test, expect } from '@playwright/test';

// tests/e2e/ 直下に置かれたテスト(規約は tests/e2e/<機能スラッグ>/ 配下)。slug が無いので機能欄は — になる
test('商品一覧を表示できる', async ({ page }) => {
  await page.goto('/products');
  await expect(page.getByRole('heading', { name: '商品一覧' })).toBeVisible();
});
