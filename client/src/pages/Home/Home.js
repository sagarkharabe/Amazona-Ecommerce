import React, { useEffect } from 'react';
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
        <h1>Amazona E-Commerce</h1>
        <h2>Buy from sellers across the globe!</h2>
        <div>
          <p>Welcome {auth.isAuthenticated ? `${auth.me.name}` : 'guest'}! </p>
          <div style={{ display: 'flex', flexWrap: 'wrap ' }}>
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
