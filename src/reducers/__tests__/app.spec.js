import reducer, { setBalance, slice } from '../app';

describe('app reducer actions', () => {
  test('setBalance', () => {
    expect(setBalance({ currency: 'EUR', value: 10 })).toEqual({
      type: `${slice.name}/setBalance`,
      payload: { currency: 'EUR', value: 10 },
    });
  });
});

describe('app reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      balance: {
        USD: 1000,
      },
    });
  });

  it('should handle setBalance', () => {
    expect(reducer(undefined, setBalance({ currency: 'USD', value: 10 }))).toEqual({
      balance: {
        USD: 10,
      },
    });

    expect(reducer(undefined, setBalance({ currency: 'EUR', value: 15.4 }))).toEqual({
      balance: {
        USD: 1000,
        EUR: 15.4,
      },
    });

    expect(reducer(
      { balance: { USD: 10, EUR: 15 } },
      setBalance({ currency: 'GBP', value: 20 }),
    )).toEqual({
      balance: {
        USD: 10,
        EUR: 15,
        GBP: 20,
      },
    });
  });
});