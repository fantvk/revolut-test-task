import { getApp, getBalance, getCurrencyBalance } from '../app';

describe('app selectors', () => {
  const state = {
    app: {
      balance: {
        USD: 1000,
      },
    },
    foo: {
      bar: true,
    }
  };

  test('getApp', () => {
    expect(getApp(state)).toEqual({
      balance: {
        USD: 1000,
      },
    });
  });

  test('getBalance', () => {
    expect(getBalance(state)).toEqual({
      USD: 1000,
    });
  });

  describe('getCurrencyBalance', () => {
    it('returns default 0', () => {
      expect(getCurrencyBalance(state, 'EUR')).toEqual(0);
    });

    it('returns expected result', () => {
      expect(getCurrencyBalance(state, 'USD')).toEqual(1000);
    });
  });
});