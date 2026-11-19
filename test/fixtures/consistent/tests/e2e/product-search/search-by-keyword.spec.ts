// feature: features/product-search.feature
// scenario: REQ-003-1 キーワードに一致する商品だけが表示される
import { test, expect } from '@playwright/test';

// Given: ログインしていない(未認証ロール)
test.use({ storageState: { cookies: [], origins: [] } });

test('REQ-003-1 キーワードに一致する商品だけが表示される', { tag: '@REQ-003-1' }, async ({ page }) => {
  // Given: 商品一覧を表示している
  await page.goto('/products');

  // When: 検索欄に「りんご」と入力して検索する
  await page.getByRole('searchbox', { name: '商品を検索' }).fill('りんご');
  await page.getByRole('button', { name: '検索' }).click();

  // Then: 商品名に「りんご」を含む商品だけが表示される
  const items = page.getByRole('list', { name: '検索結果' }).getByRole('listitem');
  await expect(items).not.toHaveCount(0);
  for (const name of await items.allInnerTexts()) {
    expect(name).toContain('りんご');
  }
});
