import React, { useState, useEffect } from 'react';
import { Carousel, Rate, Comment, Avatar, Form, Button, Input, Card, Typography } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getProduct } from '../../store/actions//productActions';
import { withRouter } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { addToCart } from '../../store/actions/cartActions';
import './styles.css';
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value, addToCart }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const Product = ({ auth, getProduct, history, match, product }) => {
  const [comment, setComment] = useState('');

  //comment this out if you wnat to stay on this page
  useEffect(() => {
    getProduct(match.params.id, history);
  }, []);

  const onChangeRating = () => {
    auth.isAuthenticated ? console.log('call rating post api here') : history.push('/login');
  };

  const onSubmitComment = () => {
    auth.isAuthenticated ? console.log('call comment posting api here') : history.push('/login');
  };

  const onAddToCart = () => addToCart(product);
  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'flex-start',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >

        <div style={{ display: 'flex', flexDirection: 'row', width: '70%', marginTop: 32, marginBottom: 24, justifyContent: 'space-between' }}>
          <div style={{ marginRight: 32 }}>
            <Card style={{ height: '500px', width: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  alt="example"
                  height="auto"
                  width="auto"
                  style={{ maxWidth: '350px', maxHeight: '70%' }}
                  src={product.image || 'https://www.freeiconspng.com/uploads/no-image-icon-4.png'}
                />
              </div>
            </Card>
          </div>
          <div>
            <Typography.Title level={3} style={{}}>{product.name}</Typography.Title>
            <Typography.Title level={4} style={{}}>{product.description}</Typography.Title>
            <Typography.Text strong style={{ fontSize: 14 }}>Brand: {product.brand}</Typography.Text> <br />
            <Typography.Text strong style={{ fontSize: 14 }}>Category: {product.category}</Typography.Text> <br />
            <Typography.Text style={{ fontSize: 16 }}>{product.avgRating?.toFixed(1)}{' '}</Typography.Text>
            <Rate allowHalf value={product.avgRating} onChange={onChangeRating} />
            <Typography.Text style={{ fontSize: 16 }}>{` (${product.numRatings})`}</Typography.Text>

          </div>
        </div>
        <div>
          {/* {auth.isAuthenticated ? (
            <Button type="primary" onClick={onAddToCart}>
              Add to Cart
            </Button>

            
          ) : null} */}
          <Typography.Title level={3}>Comments</Typography.Title>
          {(product.comments || []).map((x) => (
            <Comment
              author={<Typography.Text strong>{x.user.name}</Typography.Text>}
              avatar={
                <Avatar
                  src={x.user.avatar}
                  alt="Han Solo"
                />
              }
              content={<Typography.Text>{x.comment}</Typography.Text>}
            />
          ))}

          <Comment
            author={<Typography.Text strong>{auth.me?.username}</Typography.Text>}
            avatar={
              <Avatar src={auth.me?.avatar} alt="Han Solo" />
            }
            content={
              <Editor
                onChange={(e) => setComment(e.target.value)}
                onSubmit={onSubmitComment}
                value={comment}
              />
            }
          />
        </div>
      </div>
    </Layout >
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  product: state.product.product,
});

export default compose(withRouter, connect(mapStateToProps, { getProduct, addToCart }))(Product);
