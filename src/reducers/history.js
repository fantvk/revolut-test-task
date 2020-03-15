import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash/fp';

import { HISTORY_TYPE_REVENUE } from 'constants/history';

export const slice = createSlice({
  name: 'history',
  initialState: {
    entities: [],
  },
  reducers: {
    createEntity: (state, action) => {
      const { id, timestamp, type, currency, amount, title, balance } = action.payload;
      const entity = {
        id: id || uniqueId(),
        type: type || HISTORY_TYPE_REVENUE,
        timestamp: timestamp || Date.now(),
        currency,
        amount,
        title,
        balance,
      };

      state.entities.push(entity);
    },
  },
});

export const { createEntity } = slice.actions;

export default slice.reducer;