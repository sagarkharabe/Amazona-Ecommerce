import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../layout/Layout';
import { Form, Select, InputNumber, Button, Upload, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { categories } from '../../constants/categories';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createProduct } from '../../store/actions/productActions';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router-dom';
import { getProduct } from '../../store/actions//productActions';

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
  createProduct,
  product: { isLoading, product },
  history,
  getProduct,
  match,
}) => {
  console.log('asdasd', product);
  useEffect(() => {
    getProduct(match.params.id, history);
  }, []);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const onFinish = (values) => {
    let formData = new FormData();
    formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);
    formData.append('file', fileList[0].originFileObj);
    formData.append('public_id', `${uuidv4()}`);
    formData.append('timestamp', `${Date.now()}`);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    axios
      .post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, formData)
      .then((res) => createProduct({ ...values, image: res.data.secure_url }, history))
      .catch((err) => console.log(err));
  };

  const initialState = {
    name: product.name,
    category: product.category,
    price: product.price,
    brand: product.brand,
    description: product.description,
    image: product.image || 'https://www.freeiconspng.com/uploads/no-image-icon-4.png',
  };

  return (
    <Layout>
      <Form
        name="validate_other"
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={initialState}
        style={{ diplay: 'flex', flexDirection: 'column', alignItems: 'center', width: '60%' }}
      >
        <h1>Fill all relevant fields to upload a new product</h1>
        <Form.Item
          name="name"
          label="name"
          hasFeedback
          rules={[{ required: true, message: 'Please enter a product name!' }]}
        >
          <TextArea defaultValue={product.name} label="name" placeholder="Product name" rows={1} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea defaultValue={product.description} placeholder="Description" rows={3} />
        </Form.Item>
        <Form.Item
          name="category"
          label="Select"
          hasFeedback
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder="Please select a Category" defaultValue={product.category}>
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
        <Form.Item
          name="image"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="image"
            action={process.env.CLOUDINARY_UPLOAD_URL}
            listType="picture"
            onChange={(info) => setFileList(info.fileList)}
            beforeUpload={() => false}
          >
            <Button disabled={fileList.length === 1}>
              <UploadOutlined /> Click to upload
            </Button>
          </Upload>
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
  connect(mapStateToProps, { createProduct, getProduct }),
)(UpdateProduct);
