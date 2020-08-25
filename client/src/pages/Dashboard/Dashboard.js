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
    getSellerProducts(auth.me?.id);
  }, []);

  if (!auth.me?.isSeller) return <Redirect to="/register-seller" />;
  return (
    <Layout>
      <div style={{ padding: 20 }}>
        <Button
          type="primary"
          style={{ float: 'right' }}
          onClick={() => history.push('/seller/product/add-new')}
        >
          Add New Product
        </Button>
        <Typography.Text strong>
          <span style={{ color: '#C35600', fontSize: 20 }}>{auth.me.storeName}'s </span>store
          dashboard
        </Typography.Text>
        <br />
        <Typography.Text type="secondary">Manage all your products here.</Typography.Text>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products?.length > 0 ? (
          products?.map((product) => (
            <ProductCard key={product._id} item={product} type={'admin'} />
          ))
        ) : (
          <Typography.Text strong>No Results found.. &#128533; </Typography.Text>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  products: state.products.sellerProducts.products,
});

export default compose(withRouter, connect(mapStateToProps, { getSellerProducts }))(Dashboard);
