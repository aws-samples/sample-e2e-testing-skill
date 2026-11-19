// feature: features/cart.feature
// scenario: 商品をカートに追加できる
import { test, expect } from '@playwright/test';

// 対応する features/cart.feature が無い slug のディレクトリに置かれたテスト。機能欄には slug(cart)がそのまま出る
test('商品をカートに追加できる', async ({ page }) => {
  await page.goto('/products/1');
  await page.getByRole('button', { name: 'カートに追加' }).click();
  await expect(page.getByRole('status')).toHaveText('カートに追加しました');
});
