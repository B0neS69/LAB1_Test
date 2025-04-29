const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // headless: false для наочності
  const page = await browser.newPage();

  // Тест 1: Логотип видно
  await page.goto('https://demowebshop.tricentis.com/');
  const logo = await page.$('img[alt="Tricentis Demo Web Shop"]');
  if (logo) console.log('Логотип є на сторінці');

  // Тест 2: Авторизація користувача
  await page.click('a[href="/login"]');
  await page.type('#Email', 'qwe@example.com');
  await page.type('#Password', 'password123');
  await page.click('input[value="Log in"]');
  
  // Перевіряємо, що користувач увійшов
  await page.waitForSelector('a.account'); 
  const account = await page.$eval('a.account', el => el.textContent);
  if (account.includes('qwe@example.com')) {
    console.log(' Успішна авторизація');
  }

  // Тест 3: Пошук товару "Laptop"
  await page.type('input#small-searchterms', 'Laptop');
  await page.click('input[value="Search"]');
  
  // Перевіряємо, що знайдено товар
  await page.waitForSelector('h2.product-title');
  const searchResult = await page.$eval('h2.product-title', el => el.textContent);
  if (searchResult.includes('Laptop')) {
    console.log('Товар "Laptop" знайдено');
  }

  await browser.close();
})();
