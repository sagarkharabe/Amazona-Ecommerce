import React, { useEffect, useState, useMemo } from 'react';
import { Typography, Input, Select } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getProducts } from '../../store/actions/productsActions';
import ProductCard from '../../components/Product/Product';
import { categories } from '../../constants/categories';
import { filter } from '../../util/filterProducts';
import { openNotificationWithIcon } from '../../components/Notification/Notification';
import Cart from '../../components/Cart/Cart';

import Layout from '../../layout/Layout';
import './styles.css';

const { Option } = Select;
const { Search } = Input;

const Home = ({ products: { products, error }, getProducts, removeOneQuantity, cartItems }) => {
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (error)
      openNotificationWithIcon({
        type: 'error',
        message: error || 'Oops, Something went wrong!',
      });
  }, [error]);

  const [categoryFilter, setCategoryFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  const filteredProducts = useMemo(
    () => filter(products, categoryFilter, nameFilter, priceFilter),
    [categoryFilter, nameFilter, priceFilter, products],
  );

  return (
    <Layout>
      <div className="home">
        <div className="home-page">
          <Typography.Title level={2}>Amazona E-Commerce</Typography.Title>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: 1000,
            }}
          >
            <Typography.Text strong>Filter By : &nbsp;</Typography.Text>
            <Select
              defaultValue="Select a Category"
              value={categoryFilter}
              onChange={setCategoryFilter}
              style={{ width: 200 }}
            >
              <Option value={''}>All Categories</Option>
              {categories.map((x) => (
                <Option value={x}>{x}</Option>
              ))}
            </Select>
            <Search
              placeholder="Search..."
              onSearch={setNameFilter}
              style={{ width: 400 }}
              enterButton
            />
            <Select
              defaultValue="Sort Price by"
              value={priceFilter}
              onChange={setPriceFilter}
              style={{ marginRight: 20, width: 200 }}
            >
              <Option value={''}>Sort By: All</Option>
              <Option value={'asc'}>Price: Lowest to Highest</Option>
              <Option value={'desc'}>Price: Highest to Lowest</Option>
            </Select>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', paddingTop: 16 }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => <ProductCard key={product._id} item={product} />)
            ) : (
              <Typography.Text strong>No Results found.. &#128533; </Typography.Text>
            )}
          </div>
        </div>
        <Cart />
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  products: state.products,
});

export default compose(connect(mapStateToProps, { getProducts }))(Home);
