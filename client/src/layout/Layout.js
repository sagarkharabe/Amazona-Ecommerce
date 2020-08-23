import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './styles.css';
const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 'calc(100vh - 160px)',
          background: '#fff',
        }}
      >
        {children}
      </Content>
      <Footer />
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
