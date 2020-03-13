import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Spin } from 'antd';

import { CurrencyFormat } from 'components/Intl'

function CurrentRate({ fromCurrency, toCurrency, rates }) {
  return (
    <Tag color="blue">
      {rates ? (
        <>
          <CurrencyFormat value={1} currency={fromCurrency} />
          {' = '}
          <CurrencyFormat value={rates[toCurrency]} currency={toCurrency} />
        </>
      ) : <Spin size="small" />}
    </Tag>
  );
}

CurrentRate.propTypes = {
  fromCurrency: PropTypes.string.isRequired,
  toCurrency: PropTypes.string.isRequired,
  rates: PropTypes.object,
};

export { CurrentRate };
