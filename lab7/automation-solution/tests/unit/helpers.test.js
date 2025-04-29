import { validateEmail, formatPrice, isAdult, calculateDiscount, isEmpty } from '../../core/utils';

describe('Unit тести допоміжних функцій', () => {
  test('Перевірка email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('user@wrong')).toBe(false);
  });

  test('Форматування ціни', () => {
    expect(formatPrice(123.456)).toBe('123.46');
    expect(formatPrice(5)).toBe('5.00');
  });

  test('Перевірка віку користувача', () => {
    expect(isAdult(18)).toBe(true);
    expect(isAdult(15)).toBe(false);
  });

  test('Розрахунок знижки', () => {
    expect(calculateDiscount(100, 10)).toBe(90);
    expect(calculateDiscount(200, 25)).toBe(150);
  });

  test('Перевірка на порожнє значення', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty('test')).toBe(false);
  });
});
