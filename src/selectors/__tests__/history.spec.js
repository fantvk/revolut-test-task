import { getHistory, getEntities, getCurrencyEntities } from '../history';

describe('history selectors', () => {
  const state = {
    history: {
      entities: [
        { id: 1, currency: 'USD', timestamp: 1584179106079 },
        { id: 2, currency: 'EUR', timestamp: 1584179106079 },
        { id: 3, currency: 'USD', timestamp: 1584179106081 },
      ],
    },
    foo: {
      bar: true,
    }
  };

  test('getHistory', () => {
    expect(getHistory(state)).toBe(state.history);
  });

  test('getEntities', () => {
    expect(getEntities(state)).toBe(state.history.entities);
  });

  describe('getCurrencyEntities', () => {
    it('returns default []', () => {
      expect(getCurrencyEntities(state, 'PLN')).toEqual([]);
    });

    it('returns expected result', () => {
      expect(getCurrencyEntities(state, 'USD')).toEqual([
        { id: 3, currency: 'USD', timestamp: 1584179106081 },
        { id: 1, currency: 'USD', timestamp: 1584179106079 },
      ]);
    });

    it('do memoization', () => {
      const result1 = getCurrencyEntities(state, 'USD');
      const result2 = getCurrencyEntities(state, 'USD');

      expect(result1).toBe(result2);
      expect(getCurrencyEntities.recomputations()).toEqual(2);
    });
  });
});