import { useCallback, useMemo, useState, useEffect } from 'react';
import { has, get } from 'lodash/fp';
import currency from 'currency.js';

function useValueChange(form) {
  return useCallback(
    (from, to, rate = 0, allValues = {}) => {
      const newValue = allValues[from];

      if (!newValue || newValue < 0) {
        return form.setFieldsValue({ [to]: null });
      }

      form.setFieldsValue({ [to]: currency(newValue).multiply(rate).value });
    },
    [form]
  );
}

function useInitialValues(currencies) {
  return useMemo(
    () => ({
      fromCurrency: currencies[0],
      toCurrency: currencies[1],
    }),
    [currencies]
  );
}

function useRates(currentCurrency) {
  const [rates, setRates] = useState(null);

  useEffect(
    () => {
      const fetchRates = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_RATES_API_URL}/latest?base=${currentCurrency}`);
          const json = await response.json();
          const rawRates = get(['rates'], json);

          if (currentCurrency === 'EUR') {
            rawRates.EUR = 1;
          }

          setRates(rawRates);
        } catch (e) {
          console.error(e);
        }
      };
      const intervalId = global.setInterval(fetchRates, process.env.REACT_APP_RATES_REFRESH_INTERVAL);

      fetchRates();

      return () => {
        setRates(null);
        global.clearInterval(intervalId);
      };
    },
    [currentCurrency]
  );

  return rates;
}

function useRefresh(rates, form, handleValueChange) {
  return useEffect(
    () => {
      if (rates) {
        const allValues = form.getFieldsValue();

        handleValueChange('from', 'to', rates[allValues.toCurrency], allValues);
      }
    },
    [rates, form, handleValueChange]
  );
}

function useFormChange(handleValueChange, rates, setFromCurrency, setToCurrency) {
  return useCallback(
    (changedValues, allValues) => {
      if (!rates) {
        return;
      }

      if (has('from', changedValues) || has('toCurrency', changedValues)) {
        handleValueChange('from', 'to', rates[allValues.toCurrency], allValues);
      }

      if (has('to', changedValues)) {
        const rate =  1 / rates[allValues.toCurrency];

        handleValueChange('to', 'from', rate, allValues);
      }

      if (has('fromCurrency', changedValues)) {
        setFromCurrency(changedValues.fromCurrency);
        handleValueChange('from', 'to', null);
      }

      if (has('toCurrency', changedValues)) {
        setToCurrency(changedValues.toCurrency);
      }
    },
    [handleValueChange, rates, setFromCurrency, setToCurrency]
  );
}

export function useExchange(form, currencies) {
  const initialValues = useInitialValues(currencies);
  const [fromCurrency, setFromCurrency] = useState(initialValues.fromCurrency);
  const [toCurrency, setToCurrency] = useState(initialValues.toCurrency);

  const rates = useRates(fromCurrency);
  const handleValueChange = useValueChange(form);
  const handleChange = useFormChange(handleValueChange, rates, setFromCurrency, setToCurrency);

  useRefresh(rates, form, handleValueChange);

  return [initialValues, handleChange, rates, fromCurrency, toCurrency];
}
