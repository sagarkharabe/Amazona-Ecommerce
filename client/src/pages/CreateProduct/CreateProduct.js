import React, { useEffect } from 'react';
import Layout from '../../layout/Layout';
import { Form, Select, InputNumber, Button, Upload, Input, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { categories } from '../../constants/categories';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createProduct } from '../../store/actions/productActions';
import { withRouter } from 'react-router-dom';
import { openNotificationWithIcon } from '../../components/Notification/Notification';

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

const CreateProduct = ({ createProduct, product: { isLoading, error }, history }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    createProduct(values, history);
  };

  useEffect(() => {
    if (error) {
      openNotificationWithIcon({
        type: 'error',
        message: error,
      });
    }
  }, [error]);

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
        style={{
          diplay: 'grid',
          placeItems: 'center',
          width: '60%',
          margin: 'auto',
        }}
      >
        <Typography.Title style={{ textAlign: 'center' }}>Create a New Product</Typography.Title>
        <Form.Item
          name="name"
          label="name"
          hasFeedback
          rules={[{ required: true, message: 'Please enter a product name!' }]}
        >
          <TextArea label="name" placeholder="Product name" rows={1} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          hasFeedback
          rules={[{ required: true, message: 'Please enter a Description!' }]}
        >
          <TextArea value={'adfs'} placeholder="Product Description" rows={3} />
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
          <TextArea placeholder="Brand name" rows={1} />
        </Form.Item>

        <Form.Item name="price" label="Price (Rs)">
          <InputNumber
            size="small"
            placeholder={1200}
            min={0.01}
            precision={2}
            inputMode={'decimal'}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            hasFeedback
            rules={[{ required: true, message: 'Please enter the price!' }]}
            style={{ width: 150 }}
            required
          />
        </Form.Item>
        <Form.Item
          name="image"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          hasFeedback
          rules={[{ type: 'array', len: 1, message: 'Upload 1 image!' }]}
        >
          <Upload
            name="image"
            action={process.env.CLOUDINARY_UPLOAD_URL}
            listType="picture"
            beforeUpload={() => false}
          >
            <Button>
              <UploadOutlined /> Click to upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Submit
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
export default compose(withRouter, connect(mapStateToProps, { createProduct }))(CreateProduct);
