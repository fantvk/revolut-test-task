import { createSelector } from '@reduxjs/toolkit';
import { flow, get, filter, orderBy } from 'lodash/fp';

export const getHistory = get(['history']);
export const getEntities = flow(getHistory, get(['entities']));

export const getCurrencyEntities = createSelector(
  getEntities,
  (_, currency) => currency,
  (entities, currency) => flow(
    filter({ currency }),
    orderBy('timestamp', 'desc'),
  )(entities),
);
