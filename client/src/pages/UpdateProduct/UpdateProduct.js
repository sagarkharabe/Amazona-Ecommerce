import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../layout/Layout';
import { Form, Select, InputNumber, Button, Upload, Input, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { categories } from '../../constants/categories';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { editProduct, getProduct } from '../../store/actions/productActions';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const UpdateProduct = ({
  editProduct,
  product: { isLoading, product },
  history,
  getProduct,
  match,
}) => {
  useEffect(() => {
    getProduct(match.params.id, history);
  }, []);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let formData = new FormData();
    formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);
    formData.append('file', values.image[0].originFileObj);
    formData.append('public_id', `${uuidv4()}`);
    formData.append('timestamp', `${Date.now()}`);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    axios
      .post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, formData)
      .then((res) => editProduct(product._id, { ...values, image: res.data.secure_url }, history))
      .catch((err) => console.log(err));
  };
  const initialState = {
    name: product?.name || '',
    category: product?.category || 'Others',
    price: product?.price || '',
    brand: product?.brand || '',
    description: product?.description || '',
    image: '',
  };

  useEffect(() => {
    form.resetFields();
  }, [initialState]);
  return (
    <Layout>
      <Typography.Title level={3}>Update Product</Typography.Title>
      <div
        style={{
          width: '500px',
          height: '400px',
          display: 'flex',
          margin: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: '#f2f2f2',
          marginBottom: '20px',
        }}
      >
        <img
          alt="example"
          width="auto"
          height="auto"
          style={{ maxWidth: '100%', maxHeight: '280px' }}
          src={product?.image || 'https://www.freeiconspng.com/uploads/no-image-icon-4.png'}
        />
      </div>
      <Form
        name="validate_other"
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={initialState}
        style={{
          display: 'grid',
          placeItems: 'auto center',
          alignItems: 'stretch',
        }}
      >
        <Form.Item
          name="image"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="image"
            multiple={false}
            action={process.env.CLOUDINARY_UPLOAD_URL}
            listType="picture"
            beforeUpload={() => false}
          >
            <Button disabled={false}>
              <EditOutlined /> Change Image
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="name"
          label="name"
          hasFeedback
          rules={[{ required: true, message: 'Please enter a product name!' }]}
        >
          <TextArea label="name" placeholder="Product name" rows={1} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea placeholder="Description" rows={3} />
        </Form.Item>
        <Form.Item
          name="category"
          label="Select"
          hasFeedback
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder="Please select a Category">
            {categories.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="brand"
          label="Brand"
          hasFeedback
          rules={[{ required: true, message: 'Please enter the brand!' }]}
        >
          <TextArea placeholder="Product name" rows={1} />
        </Form.Item>

        <Form.Item name="price" label="Price (Rs)">
          <InputNumber
            size="small"
            placeholder={20}
            min={0.01}
            precision={2}
            inputMode={'decimal'}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            hasFeedback
            rules={[{ required: true, message: 'Please enter the price!' }]}
            style={{ width: 150 }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  product: state.product,
});
export default compose(
  withRouter,
  connect(mapStateToProps, { getProduct, editProduct }),
)(UpdateProduct);
