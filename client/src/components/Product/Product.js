import React from 'react';
import { Card, Button, Rate, Typography, Space, Modal } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { deleteProduct } from '../../store/actions//productActions';
import { withRouter } from 'react-router-dom';
import { addToCart } from '../../store/actions/cartActions';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const { Text } = Typography;

const Product = ({ item, history, auth, addToCart, type, deleteProduct }) => {
  const onAddToCart = () => {
    auth.isAuthenticated ? addToCart(item) : history.push('/login');
  };

  const onConfirmDelete = (product) => {
    confirm({
      title: `Are you sure you want to delete ${product.name}?`,
      icon: <ExclamationCircleOutlined />,
      onOk: () => deleteProduct(product._id),
      onCancel: () => {},
    });
  };

  const onClickCard = () => {
    if (type !== 'admin') {
      history.push(`/product/${item._id}`);
    } else return;
  };

  return (
    <Card
      hoverable
      style={{
        width: '300px',
        height: '580px',
        flexDirection: 'column',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 5,
        margin: 20,
      }}
      title={
        <Typography.Title level={4}>
          {item.name.length > 24 ? (item.name + ' ').substr(0, 22).concat('...') : item.name}
        </Typography.Title>
      }
      headStyle={{ textOverflow: 'ellipsis' }}
      onClick={() => onClickCard()}
    >
      <div
        style={{
          width: '100%',
          height: '280px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          alt="example"
          width="auto"
          height="auto"
          style={{ maxWidth: '100%', maxHeight: '280px' }}
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
          paddingBottom: 12,
        }}
      >
        <Space direction="vertical">
          <Text strong>Rs.{item.price}</Text>
          <Text>Brand: {item.brand}</Text>
          <Text style={{ fontWeight: 300 }}>{item.category}</Text>
        </Space>
        {type !== 'admin' && (
          <div>
            <Typography.Text>{item.avgRating?.toFixed(1)} </Typography.Text>
            <Rate disabled={!auth.isAuthenticated} allowHalf value={item.avgRating} />
          </div>
        )}
        <br />
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {type === 'admin' ? (
            <>
              <Button
                block
                style={{ background: '#000', color: '#fff' }}
                onClick={() => history.push(`/seller-product/${item._id}`)}
              >
                <EditOutlined />
                Edit
              </Button>
              <Button block type="secondary" onClick={() => onConfirmDelete(item)}>
                <DeleteOutlined /> Delete
              </Button>
            </>
          ) : (
            <>
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
                  history.push(`/seller/${item.seller}`);
                }}
              >
                More from seller
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { addToCart, deleteProduct }))(Product);
