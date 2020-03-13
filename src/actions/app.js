import { batch } from 'react-redux';
import { message } from 'antd';
import currency from 'currency.js';

import { HISTORY_TYPE_COST } from 'constants/history';
import { setBalance } from 'reducers/app';
import { createEntity as createHistoryEntity } from 'reducers/history';
import { getCurrencyBalance } from 'selectors/app';

export const exchangeCurrency = (form, history) => function (dispatch, getState) {
  const { fromCurrency, toCurrency, from, to } = form;

  if (fromCurrency === toCurrency) {
    message.warning('Can\'t exchange to same currency');
    return;
  }

  const fromBalance = getCurrencyBalance(getState(), fromCurrency);
  const toBalance = getCurrencyBalance(getState(), toCurrency);

  const newFromBalance = currency(fromBalance).subtract(from).value;
  const newToBalance = currency(toBalance).add(to).value;

  batch(() => {
    dispatch(setBalance({ currency: fromCurrency, value: newFromBalance }));
    dispatch(createHistoryEntity({
      type: HISTORY_TYPE_COST,
      currency: fromCurrency,
      amount: from,
      title: `Currency exchange to ${toCurrency}`,
      balance: newFromBalance,
    }));

    dispatch(setBalance({ currency: toCurrency, value: newToBalance }));
    dispatch(createHistoryEntity({
      currency: toCurrency,
      amount: to,
      title: `Currency exchange from ${fromCurrency}`,
      balance: newToBalance,
    }));
  });

  history.push('/');
  message.success('Successfully exchanged currency');
};