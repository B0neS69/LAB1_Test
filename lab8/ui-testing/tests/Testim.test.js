import { Testim } from '@testim/testim-cli';

describe('Demo Web Shop - Логотип', () => {
  it('Логотип має бути видимим', async () => {
    const testim = new Testim();
    await testim.open('https://demowebshop.tricentis.com/');
    const logo = await testim.getElementByAltText('Tricentis Demo Web Shop');
    await logo.shouldBeVisible();
  });
});

describe('Demo Web Shop - Авторизація', () => {
  it('Авторизуватися та перевірити', async () => {
    const testim = new Testim();
    await testim.open('https://demowebshop.tricentis.com/');
    const loginButton = await testim.getElementByCssSelector('a[class="ico-login"]');
    await loginButton.click();
    await testim.type('#Email', 'qwe@example.com');
    await testim.type('#Password', 'password123');
    await testim.click('input[value="Log in"]');
    const accountLink = await testim.getElementByCssSelector('a.account');
    await accountLink.shouldBeVisible();
  });
});

describe('Demo Web Shop - Пошук товару', () => {
  it('Шукати товар "Laptop"', async () => {
    const testim = new Testim();
    await testim.open('https://demowebshop.tricentis.com/');
    await testim.type('#small-searchterms', 'Laptop');
    const searchButton = await testim.getElementByCssSelector('.button-1');
    await searchButton.click();
    const productItem = await testim.getElementByCssSelector('.product-item');
    await productItem.shouldContainText('Laptop');
  });
});
