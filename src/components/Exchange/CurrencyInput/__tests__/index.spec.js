import { normalize } from '../index';

describe('CurrencyInput normalize', () => {
  test('Empty values', () => {
    expect(normalize('')).toEqual('');
    expect(normalize(null)).toEqual(null);
  });

  test('String numbers', () => {
    expect(normalize('224')).toEqual(224);
    expect(normalize('24.4')).toEqual(24.4);
  });

  test('Broken string numbers', () => {
    expect(normalize('224.34.5')).toEqual('224.34.5');
    expect(normalize('ee.4')).toEqual('ee.4');
  });

  test('Prev value when more than two digits after dot', () => {
    expect(normalize('224.34')).toEqual(224.34);
    expect(normalize('45.453', 45.45)).toEqual(45.45);
    expect(normalize('5.336', 5.33)).toEqual(5.33);
    expect(normalize(4.336, 5.33)).toEqual(5.33);
  });
});