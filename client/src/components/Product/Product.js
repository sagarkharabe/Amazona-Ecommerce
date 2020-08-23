import React from 'react';
import { Card, Button, Rate, Typography, Space } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getProduct } from '../../store/actions//productActions';
import { withRouter, Link } from 'react-router-dom';
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
        width: 280,
        height: 560,
        flexDirection: 'column',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 5,
        margin: 20,
      }}
      title={item.name.length > 24 ? (item.name + " ").substr(0, 22).concat('...') : item.name}
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
          alignItems: 'left',
          paddingTop: 12,
          paddingBottom: 12
        }}
      >
        <Space direction="vertical">
          <Text strong>Rs.{item.price}</Text>
          <Text>Brand: {item.brand}</Text>
          <Text style={{ fontWeight: 300 }}>{item.category}</Text>
        </Space>
        <div>
          <Typography.Text>{item.avgRating?.toFixed(1)}{' '}</Typography.Text>
          <Rate allowHalf value={item.avgRating} />
        </div>
        <br />
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
          >
            Add to Cart
        </Button>
          <Button
            style={{ fontSize: 12 }}
            type="link"
            onClick={(e) => {
              e.stopPropagation();
              history.push(`/seller/${item.seller}`)
            }}
          >
            More from seller
          </Button>
        </div>
      </div>
    </Card >
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { getProduct, addToCart }))(Product);
