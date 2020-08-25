import React from 'react';
import { removeFromCart } from '../../store/actions/cartActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';

const CartItem = ({ id, removeFromCart, cartItems }) => {
  const item = cartItems.find((x) => x._id === id);

  return (
    <div
      style={{
        margin: 10,
        paddingBottom: 20,
        paddingLeft: 20, 
        borderBottomWidth: '2px',
        borderBottomStyle: 'solid',
        borderBottomColor: '#e5e5e5',
        height: '100px',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <img
        height="auto"
        width="auto"
        style={{ maxHeight: '100%', maxWidth: '20%' }}
        src={item.image}
        alt={item.name}
      ></img>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <span>{item.name}</span>
        <span>
          Rs.{item.price} x {item.count}
        </span>
        <Button onClick={() => removeFromCart(item)}>Remove</Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

export default compose(connect(mapStateToProps, { removeFromCart }))(CartItem);
