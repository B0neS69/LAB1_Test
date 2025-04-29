import puppeteer from 'puppeteer';

describe('UI тести Demo Web Shop', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('https://demowebshop.tricentis.com/');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Завантаження головної сторінки', async () => {
    const title = await page.title();
    expect(title).toContain('Demo Web Shop');
  });

  test('Перехід до категорії Books', async () => {
    await page.click('a[href="/books"]');
    await page.waitForSelector('.page-title');
    const text = await page.$eval('.page-title', el => el.textContent);
    expect(text).toContain('Books');
  });

  test('Пошук товару', async () => {
    await page.type('#small-searchterms', 'computer');
    await page.click('input[value="Search"]');
    await page.waitForSelector('.product-item');
    const result = await page.$$eval('.product-item', items => items.length);
    expect(result).toBeGreaterThan(0);
  });

  test('Перевірка посилання на логін', async () => {
    const href = await page.$eval('.header-links a[href="/login"]', el => el.getAttribute('href'));
    expect(href).toBe('/login');
  });

  test('Кнопка реєстрації доступна', async () => {
    const registerExists = await page.$('a[href="/register"]') !== null;
    expect(registerExists).toBe(true);
  });
});
