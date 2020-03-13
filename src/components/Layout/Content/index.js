import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Breadcrumb } from 'antd';

import cn from './styles.module.scss';

function Content({ breadcrumbItems, children }) {
  return (
    <Layout.Content className={cn.wrapper}>
      <Breadcrumb className={cn.breadcrumb}>
        {breadcrumbItems.map((item, i) =>
          <Breadcrumb.Item key={i} children={item} />
        )}
      </Breadcrumb>
      <div className={cn.content}>
        {children}
      </div>
    </Layout.Content>
  );
}

Content.propTypes = {
  breadcrumbItems: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
};

Content.defaultProps = {
  breadcrumbItems: [],
};

export { Content };