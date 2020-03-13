import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';
import { SyncOutlined } from "@ant-design/icons";

import { CurrencyFormat } from 'components/Intl';
import { HISTORY_TYPE_COST, HISTORY_TYPE_REVENUE } from 'constants/history';
import { getCurrencyEntities } from 'selectors/history';
import cn from './styles.module.scss';

const getSign = type => {
  switch (type) {
    case HISTORY_TYPE_REVENUE:
      return '+';
    case HISTORY_TYPE_COST:
      return '-';

    default:
      return '';
  }
};

function History({ currency }) {
  const entities = useSelector(state => getCurrencyEntities(state, currency));

  return (
    <List
      dataSource={entities}
      renderItem={({ id, type, title, timestamp, currency, amount }) => (
        <List.Item key={id} className={cn.entity}>
          <List.Item.Meta
            avatar={<Avatar icon={<SyncOutlined />} />}
            title={title}
            description={new Date(timestamp).toLocaleString()}
          />
          <div>
            {getSign(type)} <CurrencyFormat value={amount} currency={currency} />
          </div>
        </List.Item>
      )}
    />
  );
}

History.propTypes = {
  currency: PropTypes.string.isRequired,
};

export { History };
