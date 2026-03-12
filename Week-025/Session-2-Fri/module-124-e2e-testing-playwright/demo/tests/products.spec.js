const { test, expect } = require("@playwright/test");

test("page loads and displays title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.locator("h1")).toHaveText("Product List");
});

test("displays all products", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.locator(".product-card")).toHaveCount(3);
});

test("displays product names and prices", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.locator(".product-name").first()).toHaveText("Laptop");
  await expect(page.locator(".product-price").first()).toHaveText("$999");
});
