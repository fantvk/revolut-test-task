import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { exchangeCurrency } from '../app';

const mockStore = configureMockStore([thunk]);

jest.mock('antd', () => ({
  message: {
    warning: jest.fn().mockImplementation(() => null),
    success: jest.fn().mockImplementation(() => null),
  },
}));

const { message } = require('antd');
const history = {
  push: jest.fn().mockImplementation(() => null),
};

describe('app actions', () => {
  beforeEach(() => {
    message.warning.mockClear();
    message.success.mockClear();
    history.push.mockClear();
  });

  describe('exchangeCurrency', () => {
    const { message } = require('antd');
    const store = mockStore({ app: { balance: { EUR: 1000, USD: 0.1 } } });


    test('exchange to same currency', () => {
      store.dispatch(exchangeCurrency({
        fromCurrency: 'EUR',
        toCurrency: 'EUR',
        from: 1,
        to: 1,
      }, history));

      expect(store.getActions()).toEqual([]);
      expect(message.warning).toBeCalled();
      expect(history.push).not.toBeCalled();
    });

    test('exchange currency', () => {
      store.dispatch(exchangeCurrency({
        fromCurrency: 'EUR',
        toCurrency: 'USD',
        from: 19.73,
        to: 0.2,
      }, history));

      expect(store.getActions()).toEqual( [
        {
          type: 'app/setBalance',
          payload: { currency: 'EUR', value: 980.27 }
        },
        {
          type: 'history/createEntity',
          payload: { type: 'cost', currency: 'EUR', amount: 19.73, title: 'Currency exchange to USD', balance: 980.27 }
        },
        {
          type: 'app/setBalance',
          payload: { currency: 'USD', value: 0.3 }
        },
        {
          type: 'history/createEntity',
          payload: { currency: 'USD', amount: 0.2, title: 'Currency exchange from EUR', balance: 0.3 }
        }
      ]);
      expect(message.warning).not.toBeCalled();
      expect(message.success).toBeCalled();
      expect(history.push).toBeCalled();
    });
  });
});