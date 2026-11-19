// feature: features/product-search.feature
// scenario: REQ-003-2 一致する商品が無いときはメッセージが表示される
import { test, expect } from '@playwright/test';

// Given: ログインしていない(未認証ロール)
test.use({ storageState: { cookies: [], origins: [] } });

// issue アノテーションの無い test.fail(規約違反。照合ツールは読み取れるが、既知バグの理由は「理由なし」になる)
test.fail('REQ-003-2 一致する商品が無いときはメッセージが表示される', { tag: '@REQ-003-2' }, async ({ page }) => {
  // Given: 商品一覧を表示している
  await page.goto('/products');

  // When: 検索欄に「存在しない商品」と入力して検索する
  await page.getByRole('searchbox', { name: '商品を検索' }).fill('存在しない商品');
  await page.getByRole('button', { name: '検索' }).click();

  // Then: 「該当する商品はありません」と表示される
  await expect(page.getByText('該当する商品はありません')).toBeVisible();
});
