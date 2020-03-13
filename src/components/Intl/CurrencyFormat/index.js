import React from 'react';
import PropTypes from 'prop-types';

/**
 * @return {string}
 */
const CurrencyFormat = React.memo(function CurrencyFormat({ value, currency }) {
  const intl = new Intl.NumberFormat('en-UK', { style: 'currency', currency });

  return intl.format(value);
});

CurrencyFormat.propTypes = {
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export { CurrencyFormat };
