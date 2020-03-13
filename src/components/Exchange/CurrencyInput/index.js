import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Form, Input } from 'antd';

import { CurrencyFormat } from 'components/Intl';
import { getCurrencyBalance } from 'selectors/app';

export function normalize(value, prevValue) {
  if (!value) {
    return value;
  }

  const decimal = value.toString().split('.')[1];
  if (decimal && decimal.length > 2) {
    return prevValue;
  }

  const number = Number(value);

  return isNaN(number) ? value : number;
}

function CurrencyInput({ currency, name, label, max, addonBefore, ...rest }) {
  const balance = useSelector(state => getCurrencyBalance(state, currency));

  return (
    <Form.Item
      name={name}
      label={label}
      normalize={normalize}
      rules={[{ required: true, type: 'number', min: 0.01, max: max ? balance : null }]}
      extra={(
        <>
          You have <CurrencyFormat value={balance} currency={currency}/>
        </>
      )}
    >
      <Input
        addonBefore={addonBefore}
        type="number"
        step={0.01}
        min={0.01}
        max={max && balance}
        {...rest}
      />
    </Form.Item>
  );
}

CurrencyInput.propTypes = {
  name: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  label: PropTypes.string,
  max: PropTypes.bool,
  addonBefore: PropTypes.node,
};

export { CurrencyInput };
