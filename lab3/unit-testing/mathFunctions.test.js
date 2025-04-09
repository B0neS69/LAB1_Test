import { sign, logc, log10 } from './mathFunctions.js';

describe('sign function', () => {
  test('should return 1 for positive numbers', () => {
    expect(sign(10)).toBe(1);
  });

  test('should return -1 for negative numbers', () => {
    expect(sign(-5)).toBe(-1);
  });

  test('should return 0 for zero', () => {
    expect(sign(0)).toBe(0);
  });

  test('should return NaN for NaN input', () => {
    expect(sign(NaN)).toBeNaN();
  });

  test('should return 1 for positive float numbers', () => {
    expect(sign(3.14)).toBe(1);
  });
});

describe('logc function (natural logarithm)', () => {
    test('should return 0 for log(1)', () => {
      expect(logc(1)).toBe(0);
    });
  
    test('should return a positive number for log(e)', () => {
      expect(logc(Math.E)).toBeCloseTo(1, 5);
    });
  
    test('should return a negative number for log(0.5)', () => {
      expect(logc(0.5)).toBeLessThan(0);
    });
  
    test('should return -Infinity for log(0)', () => {
      expect(logc(0)).toBe(-Infinity);
    });
  
    test('should return NaN for log of a negative number', () => {
      expect(logc(-5)).toBeNaN();
    });
  });
  

describe('log10 function (log base 10)', () => {
  test('should return 0 for log10(1)', () => {
    expect(log10(1)).toBe(0);
  });

  test('should return 1 for log10(10)', () => {
    expect(log10(10)).toBe(1);
  });

  test('should return 2 for log10(100)', () => {
    expect(log10(100)).toBe(2);
  });

  test('should return a negative number for log10(0.1)', () => {
    expect(log10(0.1)).toBeCloseTo(-1, 5);
  });

  test('should return NaN for log10 of a negative number', () => {
    expect(log10(-1)).toBeNaN();
  });
});
