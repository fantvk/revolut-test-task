import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { exchangeCurrency } from 'actions/app';

export function useSubmit() {
  const history = useHistory();
  const dispatch = useDispatch();

  return useCallback(
    data => {
      dispatch(exchangeCurrency(data, history));
    },
    [dispatch, history]
  );
}
