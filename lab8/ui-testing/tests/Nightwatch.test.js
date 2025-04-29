module.exports = {
  // Тест 1: Логотип має бути видимим
  'Логотип має бути видимим': function (browser) {
    browser
      .url('https://demowebshop.tricentis.com/')
      .waitForElementVisible('img[alt="Tricentis Demo Web Shop"]', 1000)
      .end();
  },

  // Тест 2: Авторизація користувача
  'Авторизація користувача': function (browser) {
    browser
      .url('https://demowebshop.tricentis.com/')
      .click('a[href="/login"]')
      .setValue('input#Email', 'qwe@example.com')
      .setValue('input#Password', 'password123')
      .click('input[value="Log in"]')
      .waitForElementVisible('a.account', 3000)
      .assert.containsText('a.account', 'qwe@example.com')
      .end();
  },

  // Тест 3: Пошук товару "Laptop"
  'Пошук товару Laptop': function (browser) {
    browser
      .url('https://demowebshop.tricentis.com/')
      .setValue('input#small-searchterms', 'Laptop')
      .click('input[value="Search"]')
      .waitForElementVisible('h2.product-title', 3000)
      .assert.containsText('h2.product-title', 'Laptop')
      .end();
  }
};
