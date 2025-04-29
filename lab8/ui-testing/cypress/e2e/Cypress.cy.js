// Тест 1: Перевірка наявності логотипу
describe('Demo Web Shop - Логотип', () => {
    it('Перевірити, що логотип видно', () => {
      cy.visit('https://demowebshop.tricentis.com/');
      cy.get('img[alt="Tricentis Demo Web Shop"]').should('be.visible');
    });
  });
  
// Тест 2: Авторизація
describe('Demo Web Shop - Авторизація', () => {
  it('Увійти в акаунт користувача', () => {
    cy.visit('https://demowebshop.tricentis.com/');
    cy.get('.header-links .ico-login').click(); // Клік по "Log in"
    cy.get('#Email').type('qwe@example.com');
    cy.get('#Password').type('password123');
    cy.get('input.button-1.login-button').click();
    cy.get('.account').should('contain', 'qwe@example.com'); // Перевірка що залогінились
  });
});

// Тест 3: Пошук товару Laptop
describe('Demo Web Shop - Пошук товару', () => {
  it('Пошук товару "Laptop"', () => {
    cy.visit('https://demowebshop.tricentis.com/');
    cy.get('#small-searchterms').type('Laptop{enter}');
    cy.url().should('include', 'search');
    cy.get('.product-item').should('exist'); // Перевірка що знайдено товари
  });
});