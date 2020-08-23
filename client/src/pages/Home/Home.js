import React, { useEffect } from 'react';
import { Typography, } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Cart from '../../components/Cart/Cart';
import { getProducts } from '../../store/actions/productsActions';
import ProductCard from '../../components/Product/Product';

import Layout from '../../layout/Layout';

import './styles.css';

const Home = ({ auth, products: { products }, getProducts, cartItems }) => {
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      <div className="home-page">
        <Typography.Title level={2}>Amazona E-Commerce</Typography.Title>
        <Typography.Title level={4}>Buy and Sell globally.</Typography.Title>
        <div>
          <Typography.Text strong >Welcome {auth.isAuthenticated ? `${auth.me.name}` : 'guest'}! </Typography.Text>
          <p></p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {products.map((product) => (
              <ProductCard item={product} />
            ))}
          </div>
        </div>
      </div>
      {cartItems.length ? <Cart /> : null}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cartItems: state.cart.cartItems,
  products: state.products,
});

export default compose(connect(mapStateToProps, { getProducts }))(Home);
