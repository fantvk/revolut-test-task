import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';

import { Content } from 'components/Layout'
import { CurrencyInput } from './CurrencyInput';
import { CurrencyAddon } from './CurrencyAddon';
import { CurrentRate } from './CurrentRate';
import { useExchange, useSubmit } from './hooks';

const layout = {
  labelCol: { offset: 4, span: 4 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

function Exchange({ currencies }) {
  const [form] = Form.useForm();
  const handleSubmit = useSubmit();
  const [
    initialValues,
    handleChange,
    rates,
    fromCurrency,
    toCurrency,
  ] = useExchange(form, currencies);

  return (
    <Content breadcrumbItems={['App', 'Exchange']}>
      <Form
        {...layout}
        form={form}
        initialValues={initialValues}
        onFinish={handleSubmit}
        onValuesChange={handleChange}
        noValidate
      >
        <Form.Item {...tailLayout}>
          <CurrentRate {...{ fromCurrency, toCurrency, rates }} />
        </Form.Item>
        <CurrencyInput
          name="from"
          label="From"
          currency={fromCurrency}
          addonBefore={<CurrencyAddon name="fromCurrency" currencies={currencies} />}
          autoFocus
          max
        />
        <CurrencyInput
          name="to"
          label="To"
          currency={toCurrency}
          addonBefore={<CurrencyAddon name="toCurrency" currencies={currencies} />}
        />
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Exchange
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
}

Exchange.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export { Exchange };
