// feature: features/product-search.feature
// scenario: REQ-003-1 キーワードで商品を検索できる
import { expect, test } from '../../fixtures';

test('REQ-003-1 キーワードで商品を検索できる', { tag: '@REQ-003-1' }, async ({ page }) => {
  // Given: ログインしている
  // And: 商品一覧を表示している
  await page.goto('/products');
  // When: 「りんご」で検索する
  await page.getByRole('searchbox').fill('りんご');
  // Then: 「りんごジュース」が表示される
  await expect(page.getByText('りんごジュース')).toBeVisible();
  // But: 「みかん」は表示されない
  await expect(page.getByText('みかん')).toBeHidden();
});
