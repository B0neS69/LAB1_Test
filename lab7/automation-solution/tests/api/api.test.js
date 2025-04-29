import axios from 'axios';

const baseURL = 'https://demowebshop.tricentis.com';

describe('API тести Demo Web Shop', () => {
  test('Отримати головну сторінку', async () => {
    const response = await axios.get(`${baseURL}`);
    expect(response.status).toBe(200);
    expect(response.data).toContain('Demo Web Shop');
  });

  test('Спроба входу з некоректними даними', async () => {
    const response = await axios.post(`${baseURL}/login`, new URLSearchParams({
      Email: 'wrong@email.com',
      Password: 'wrongpass'
    }));
    expect(response.data).toContain('Login was unsuccessful');
  });

  test('Отримати список категорій', async () => {
    const response = await axios.get(`${baseURL}/books`);
    expect(response.status).toBe(200);
    expect(response.data).toContain('Books');
  });

  test('Додати продукт до корзини без авторизації', async () => {
    const response = await axios.post(`${baseURL}/addproducttocart/details/13/1`, new URLSearchParams({
        ['product_attribute_13_1_4']: 14,
        ['addtocart_13.EnteredQuantity']: 1
      }));
      
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('success');
  });

  test('Спроба перейти до сторінки оплати без логіну', async () => {
    const response = await axios.get(`${baseURL}/checkout`, {
      maxRedirects: 0,
      validateStatus: status => status < 400 
    }).catch(error => error.response); 
  
    expect(response.status).toBe(302);
    expect(response.headers.location).toContain('/cart');
  });
});
