import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { App } from '../index';

jest.mock('components/Account', () => ({
  Account: jest.fn().mockImplementation(() => null),
}));

jest.mock('components/Exchange', () => ({
  Exchange: jest.fn().mockImplementation(() => null)
}));

const { Account } = require('components/Account');
const { Exchange } = require('components/Exchange');

describe('app component', () => {
  beforeEach(() => {
    Account.mockClear();
    Exchange.mockClear();
  });

  it('should render index route', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(Account).toBeCalled();
    expect(Exchange).not.toBeCalled();
    expect(container).toMatchSnapshot();
  });

  it('should render exchange route', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/exchange']}>
        <App />
      </MemoryRouter>
    );

    expect(Account).not.toBeCalled();
    expect(Exchange).toBeCalled();
    expect(container).toMatchSnapshot();
  });
});

