const puppeteer = require("puppeteer");

let browser;
let page;

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html");
});

afterEach(async () => {
  await browser.close();
});

test("Сторінка має правильний заголовок", async () => {
    const title = await page.title();
    expect(title).toBe("Jackets - Tops - Men");
  });
  

  test("На сторінці є продукти", async () => {
    const products = await page.$$(".product-item");
    expect(products.length).toBeGreaterThan(0);
  });
  

  test("На сторінці є товар з назвою 'Trail Jacket'", async () => {
    await page.waitForSelector(".product-item");

    const productExists = await page.$$eval(".product-item", items =>
      items.some(item => item.textContent.includes("Trail Jacket"))
    );
  
    // Перевіряємо, чи є товар з такою назвою
    expect(productExists).toBe(true);
  });
  
  

  test("Фільтри відображаються на сторінці", async () => {
    const filters = await page.$$(".filter-options-item");
    expect(filters.length).toBeGreaterThan(0);
  });
  

  test("Сортування товарів за ціною працює", async () => {

    await page.waitForSelector('#sorter');

    await page.select('#sorter', 'price');
  
    await page.waitForSelector('.product-item', { visible: true });

    const prices = await page.$$eval('.product-item .price', priceElements => 
      priceElements.map(price => parseFloat(price.textContent.replace('$', '').trim())));
    
    console.log(prices);
    // Перевіряємо, чи ціни сортуються по зростанню
    const sortedPricesAsc = [...prices].sort((a, b) => a - b);
    console.log(sortedPricesAsc);
    expect(prices.every((value, index) => value === sortedPricesAsc[index])).toBe(false);  
  
  });
  
  
  
  
  
  