import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'app',
  initialState: {
    balance: {
      USD: 1000,
    },
  },
  reducers: {
    setBalance: (state, action) => {
      const { currency, value } = action.payload;

      state.balance[currency] = value;
    },
  },
});

export const { setBalance } = slice.actions;

export default slice.reducer;