import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { act, render } from '@testing-library/react';

import { HISTORY_TYPE_COST } from 'constants/history';
import { Account } from '../index';

const mockStore = configureMockStore();
const store = mockStore({
  app: { balance: { EUR: 500000 } },
  history: {
    entities: [{
      id: 1,
      type: HISTORY_TYPE_COST,
      timestamp: 1584183448921,
      currency: 'EUR',
      amount: 10,
      title: 'Title',
      balance: 0,
    }]
  }
});

describe('Account component', () => {
  it('should render ok', async () => {
    await act(async () => {
      const { container } = render(
        <Provider store={store}>
          <Account currencies={['EUR', 'USD']} />
        </Provider>
      );

      expect(container).toMatchSnapshot();
    });
  });
});

