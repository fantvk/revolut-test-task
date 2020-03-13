import { flow, get, getOr } from 'lodash/fp';

export const getApp = get(['app']);
export const getBalance = flow(getApp, get(['balance']));

export const getCurrencyBalance = (state, currency) =>
  flow(getBalance, getOr(0, [currency]))(state);
