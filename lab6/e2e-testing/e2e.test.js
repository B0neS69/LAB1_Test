import puppeteer from 'puppeteer';

describe('Тести для Demo Web Shop', () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(10000); 
    browser = await puppeteer.launch({
      headless: false, 
      slowMo: 50, 
      defaultViewport: null,
      args: ['--start-maximized'], 
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  jest.setTimeout(10000);

  test('Вхід користувача', async () => {
    await page.goto('https://demowebshop.tricentis.com/login');
  
    await page.type('#Email', 'qwe@example.com');
    await page.type('#Password', 'password123');
  
    await Promise.all([
      page.click('input.login-button'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);
  
    const logoutLink = await page.$('a[href="/logout"]');
    expect(logoutLink).toBeTruthy();
  }, 15000); 
  
  

  test('Додавання подарункової картки у кошик з заповненням форми', async () => {
    await page.goto('https://demowebshop.tricentis.com/');
  
    // Клік по подарунковій картці
    const giftCardLink = await page.$('a[href="/25-virtual-gift-card"]');
    if (!giftCardLink) {
      throw new Error('Посилання на подарункову картку не знайдено');
    }
  
    await Promise.all([
      giftCardLink.click(),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);
  
    // Заповнюємо форму подарункової картки
    await page.type('#giftcard_2_RecipientName', 'Одержувач Тест');
    await page.type('#giftcard_2_RecipientEmail', 'recipient@example.com');
 
    // Додаємо у кошик
    const addToCartButton = await page.$('#add-to-cart-button-2');
    if (!addToCartButton) {
      throw new Error('Кнопка додавання в кошик не знайдена');
    }
  
    await Promise.all([
      page.waitForResponse(response =>
        response.url().includes('/addproducttocart') && response.status() === 200
      ),
      addToCartButton.click(),
    ]);
  
    // Чекаємо, поки оновиться індикатор кошика
    await page.waitForSelector('.cart-qty');
    const cartCount = await page.$eval('.cart-qty', el => el.textContent.trim());
  
    console.log("Кількість товарів у кошику:", cartCount);
    expect(cartCount).toContain('1');
  }, 15000);
  
  
  
  

  test('Пошук товару', async () => {
    await page.goto('https://demowebshop.tricentis.com/');

    await page.type('#small-searchterms', 'Laptop');
    await page.click('.search-box-button');
    await page.waitForSelector('.product-item');
    
    const products = await page.$$eval('.product-item', items => items.length);
    expect(products).toBeGreaterThan(0);
  });
});
