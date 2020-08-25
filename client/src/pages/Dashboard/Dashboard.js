import React, { useEffect } from 'react';
import { Typography, Button } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { getSellerProducts } from '../../store/actions/productsActions';
import ProductCard from '../../components/Product/Product';

const Dashboard = ({ auth, products, getSellerProducts, history }) => {
  useEffect(() => {
    getSellerProducts(auth.me.id);
  }, [products]);

  if (!auth.me.isSeller) return <Redirect to="/register-seller" />;
  return (
    <Layout>
      <div>
        <span>
          <Typography.Text strong>
            <span style={{ color: '#C35600' }}>{auth.me.name}'s </span> Dashboard
          </Typography.Text>
          <Button
            type="primary"
            style={{ float: 'right' }}
            onClick={() => history.push('/seller/product/add-new')}
          >
            Add New Product
          </Button>
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {products?.map((product) => (
            <ProductCard key={product._id} item={product} type={'admin'} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  products: state.products.sellerProducts.products,
});

export default compose(withRouter, connect(mapStateToProps, { getSellerProducts }))(Dashboard);
