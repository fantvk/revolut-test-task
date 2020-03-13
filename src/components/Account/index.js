import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Radio, Tag } from 'antd';

import { Content } from 'components/Layout';
import { CurrencyFormat } from 'components/Intl';
import { getCurrencyBalance } from 'selectors/app';
import { History } from './History';
import { useCurrencies } from './hooks';
import cn from './styles.module.scss';

function Account({ currencies }) {
  const [currentCurrency, handleCurrencyChange] = useCurrencies(currencies);
  const balance = useSelector(state => getCurrencyBalance(state, currentCurrency));

  return (
    <Content breadcrumbItems={['App', 'Account']}>
      <Row>
        <Col span={24} className={cn.col}>
          <Radio.Group value={currentCurrency} onChange={handleCurrencyChange}>
            {currencies.map(item =>
              <Radio.Button key={item} value={item}>{item}</Radio.Button>
            )}
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Col span={24} className={cn.col}>
          <Tag color="blue" className={cn.balance}>
            <CurrencyFormat currency={currentCurrency} value={balance} />
          </Tag>
        </Col>
      </Row>
      <Row>
        <Col offset={6} span={12} className={cn.col}>
          <History currency={currentCurrency} />
        </Col>
      </Row>
    </Content>
  );
}

Account.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export { Account };
