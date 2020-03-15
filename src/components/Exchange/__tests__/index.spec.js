import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { render, act } from '@testing-library/react';

import { Exchange } from '../index';

const mockStore = configureMockStore();
const store = mockStore({});

describe('Exchange component', () => {
  it('should render ok', async () => {
    jest.useFakeTimers();
    fetch.mockResponse(JSON.stringify({ rates: { USD: 1.1 } }));

    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Exchange currencies={['EUR', 'USD']} />
        </Provider>
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
    await act(async () => {});
    expect(container).toMatchSnapshot();
  });
});
