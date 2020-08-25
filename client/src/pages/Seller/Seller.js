import React, { useEffect } from 'react';
import { Typography } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Layout from '../../layout/Layout';
import Cart from '../../components/Cart/Cart';
import { getSellerProducts } from '../../store/actions/productsActions';
import ProductCard from '../../components/Product/Product';

const Seller = ({ seller, products, getSellerProducts, cartItems, match }) => {
  useEffect(() => {
    getSellerProducts(match.params.id);
  }, []);

  return (
    <Layout>
      <div>
        <Typography.Text strong>
          Viewing results for store <span style={{ color: '#C35600' }}>"{seller?.storeName}"</span>
        </Typography.Text>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {products?.map((product) => (
            <ProductCard item={product} />
          ))}
        </div>
      </div>
      {cartItems.length ? <Cart /> : null}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cartItems: state.cart.cartItems,
  seller: state.products.sellerProducts.seller,
  products: state.products.sellerProducts.products,
});

export default compose(withRouter, connect(mapStateToProps, { getSellerProducts }))(Seller);
