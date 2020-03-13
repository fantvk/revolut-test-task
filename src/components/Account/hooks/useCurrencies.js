import { useState, useCallback } from 'react';

export function useCurrencies(currencies) {
  const [currentCurrency, setCurrency] = useState(currencies[0]);
  const handleCurrencyChange = useCallback(
    (e) => {
      setCurrency(e.target.value);
    },
    [setCurrency]
  );

  return [currentCurrency, handleCurrencyChange];
}