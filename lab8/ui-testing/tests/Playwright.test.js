const { test, expect } = require('@playwright/test');

// Тест 1: Перевірка логотипу
test('Логотип має бути видимим', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await expect(page.locator('img[alt="Tricentis Demo Web Shop"]')).toBeVisible();
});

// Тест 2: Авторизація користувача
test('Авторизація користувача', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await page.click('a[href="/login"]'); // Натискаємо на кнопку "Login"
  await page.fill('input#Email', 'qwe@example.com');
  await page.fill('input#Password', 'password123');
  await page.click('input[value="Log in"]');
  await expect(page.getByRole('link', { name: 'qwe@example.com' })).toBeVisible();
 
});

// Тест 3: Пошук товару "Laptop"
test('Пошук товару Laptop', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await page.fill('input#small-searchterms', 'Laptop');
  await page.click('input[value="Search"]');
  await expect(page.locator('.product-item')).toContainText('Laptop'); // Перевірка, що знайшлися товари з назвою "Laptop"
});
