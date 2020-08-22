import React, { useState, useEffect } from 'react';
import { Carousel, Rate, Comment, Avatar, Form, Button, List, Input } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getProduct } from '../../store/actions//productActions';
import { withRouter } from 'react-router-dom';
import Layout from '../../layout/Layout';
import './styles.css';
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
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
        <h1 style={{ textAlign: 'center' }}>{product.name || 'Product Page'}</h1>
        <h2 style={{ textAlign: 'center' }}>{product.description || ''}</h2>
        <Carousel>
          <div
            style={{
              height: '600px',
              width: '500px',
              backgroundColor: '#364d79',
              overflow: 'hidden',
            }}
          >
            <img
              alt="example"
              height="auto"
              width="auto"
              style={{ maxWidth: '300px', maxHeight: '100%' }}
              src={product.image || 'https://www.freeiconspng.com/uploads/no-image-icon-4.png'}
            />
          </div>
        </Carousel>
        <div>
          <h3>Category: {product.category}</h3>
          <h3>Brand: {product.brand}</h3>
          {product.avgRating ? (
            <Rate allowHalf value={product.avgRating} onChange={onChangeRating} />
          ) : null}
          {(product.comments || []).map((x) => (
            <Comment
              author={<a>{x.user}</a>}
              avatar={
                <Avatar
                  src="https://www.iconfinder.com/icons/172626/male_user_icon"
                  alt="Han Solo"
                />
              }
              content={<p>{x.comment}</p>}
            />
          ))}
          <Comment
            author={auth.isAuthenticated ? auth.me.username : ''}
            avatar={
              <Avatar src="https://www.iconfinder.com/icons/172626/male_user_icon" alt="Han Solo" />
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
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  product: state.product.product,
});

export default compose(withRouter, connect(mapStateToProps, { getProduct }))(Product);
