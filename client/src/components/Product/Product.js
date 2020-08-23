import React from 'react';
import { Card, Button, Rate, Typography, Space } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getProduct } from '../../store/actions//productActions';
import { withRouter } from 'react-router-dom';
import { addToCart } from '../../store/actions/cartActions';

const { Text } = Typography;

const Product = ({ item, history, auth, addToCart }) => {
  const onAddToCart = () => {
    auth.isAuthenticated ? console.log('add to cart') : history.push('/login');
    // cart action
    addToCart(item);
  };
  return (
    <Card
      hoverable
      style={{
        width: 250,
        height: 550,
        flexDirection: 'column',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 5,
        margin: 20,
      }}
      title={item.name}
      onClick={() => history.push(`/product/${item._id}`)}
    >
      <div
        style={{
          height: '300px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          alt="example"
          width="auto"
          height="auto"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          src={item.image || 'https://www.freeiconspng.com/uploads/no-image-icon-4.png'}
        />
      </div>
      <div
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Space direction="vertical">
          <Text>Rs.{item.price}</Text>
          <Text>{item.brand}</Text>
          <Text>{item.category}</Text>
        </Space>
        <Rate allowHalf value={item.rating || 3.5} />
        <br />
        <Button
          style={{ position: 'absolute', bottom: 10 }}
          type="primary"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { getProduct, addToCart }))(Product);
