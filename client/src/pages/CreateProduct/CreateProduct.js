import React from 'react';
import axios from 'axios';
import Layout from '../../layout/Layout';
import { Form, Select, InputNumber, Button, Upload, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { categories } from '../../constants/categories';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { uploadImage } from '../../store/actions/imageActions';
import { createProduct } from '../../store/actions/productActions';

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

const CreateProduct = ({ createProduct }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    createProduct(values);
  };

  //   const onUploadImage = async ({ file, onSuccess }) => {
  //     uploadImage(file);
  //   };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const initialState = {
    name: '',
    category: '',
    price: '',
    brand: '',
    description: '',
    image: '',
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
          <TextArea label="name" placeholder="Product name" rows={1} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea value={'adfs'} placeholder="Product name" rows={3} />
        </Form.Item>
        <Form.Item
          name="category"
          label="Select"
          hasFeedback
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder="Please select a Category">
            {categories.map((item) => (
              <Option value={item}>{item}</Option>
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
            placeholder={20}
            min={0.01}
            precision={2}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            hasFeedback
            rules={[{ required: true, message: 'Please enter the price!' }]}
          />
        </Form.Item>
        <Form.Item
          name="image"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="logo"
            action={process.env.CLOUDINARY_UPLOAD_URL}
            listType="picture"
            customRequest={dummyRequest}
          >
            <Button>
              <UploadOutlined /> Click to upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default compose(connect(mapStateToProps, { createProduct }))(CreateProduct);
