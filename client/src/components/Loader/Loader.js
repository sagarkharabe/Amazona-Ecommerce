import React from 'react';

import './styles.css';
import { Spin } from 'antd';

const Loader = (props) => {
  return (
    <div className="loader-container loader" {...props}>
      <Spin size="large" tip="Loading.." />
    </div>
  );
};

export default Loader;
