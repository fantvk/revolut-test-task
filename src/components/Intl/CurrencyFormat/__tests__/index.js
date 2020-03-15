import React from 'react';
import { render } from '@testing-library/react';

import { CurrencyFormat } from '../index';

describe('CurrencyFormat component', () => {
  it('should render ok', () => {
    const { getByText } = render(
      <CurrencyFormat currency="EUR" value={2000} />
    );

    expect(getByText(/€2,000.00/i)).toBeInTheDocument();
  });

  test('mock Intl', () => {
    jest.spyOn(Intl, 'NumberFormat').mockImplementation(() => ({
      format: () => 'test mock',
    }));

    const { getByText } = render(
      <CurrencyFormat currency="EUR" value={2000} />
    );

    expect(getByText(/test mock/i)).toBeInTheDocument();
  });
});

