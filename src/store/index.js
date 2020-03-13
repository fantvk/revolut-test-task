import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import appReducer from 'reducers/app';
import historyReducer from 'reducers/history';

export default configureStore({
  reducer: {
    app: appReducer,
    history: historyReducer,
  },
  middleware: [thunk],
});