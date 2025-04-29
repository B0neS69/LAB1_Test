import { Selector } from 'testcafe';

fixture('Demo Web Shop').page('https://demowebshop.tricentis.com/');

// Тест 1: Перевірка логотипу
test('Перевірити наявність логотипу', async t => {
  await t.expect(Selector('img[alt="Tricentis Demo Web Shop"]').exists).ok();
});

// Тест 2: Авторизація користувача
test('Авторизація користувача', async t => {
  await t
    .click(Selector('a[href="/login"]'))                      
    .typeText('#Email', 'qwe@example.com')                  
    .typeText('#Password', 'password123')                   
    .click('input[value="Log in"]')                            
    .expect(Selector('a.account').withText('qwe@example.com').exists).ok(); 
});

// Тест 3: Пошук товару "Laptop"
test('Пошук товару Laptop', async t => {
  await t
    .typeText('input#small-searchterms', 'Laptop')            
    .click('input[value="Search"]')                           
    .expect(Selector('h2.product-title').innerText).contains('Laptop'); 
});
