import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd'
import { split } from 'lodash/fp'

import { Sidebar } from 'components/Layout'
import { Account } from 'components/Account'
import { Exchange } from 'components/Exchange'
import cn from './styles.module.scss';

const YEAR = new Date().getFullYear();
const CURRENCIES = split(',', process.env.REACT_APP_CURRENCIES);

export function App() {
  return (
    <Layout className={cn.app}>
      <Sidebar />
      <Layout>
        <Layout.Header className={cn.header} />
        <Switch>
          <Route exact path="/">
            <Account currencies={CURRENCIES} />
          </Route>
          <Route path="/exchange">
            <Exchange currencies={CURRENCIES} />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Layout.Footer className={cn.footer}>
          Revolut &copy; {YEAR}
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}
