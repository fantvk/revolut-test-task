import React from 'react';
import PropTypes from 'prop-types';

/**
 * @return {string}
 */
const CurrencyFormat = React.memo(function CurrencyFormat({ locale, value, currency }) {
  const intl = new Intl.NumberFormat(locale, { style: 'currency', currency });

  return intl.format(value);
});

CurrencyFormat.propTypes = {
  locale: PropTypes.string,
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

CurrencyFormat.defaultProps = {
  locale: 'en-UK',
};

export { CurrencyFormat };
