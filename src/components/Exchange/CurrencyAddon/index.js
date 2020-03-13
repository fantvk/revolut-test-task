import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

import cn from './styles.module.scss';

function CurrencyAddon({ name, currencies }) {
  return (
    <Form.Item name={name} noStyle>
      <Select className={cn.select}>
        {currencies.map(value =>
          <Select.Option key={value} value={value}>{value}</Select.Option>
        )}
      </Select>
    </Form.Item>
  );
}

CurrencyAddon.propTypes = {
  name: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export { CurrencyAddon };
