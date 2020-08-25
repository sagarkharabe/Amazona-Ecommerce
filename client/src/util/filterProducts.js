export const filter = (products, category, keyword, price) => {
  const arr = products.filter(
    (prod) => prod.category.includes(category) && filterBySearchKeyword(prod, keyword),
  );
  if (price === 'asc') {
    arr.sort((a, b) => a.price - b.price);
  }
  if (price === 'desc') {
    arr.sort((a, b) => b.price - a.price);
  }
  return arr;
};

const filterBySearchKeyword = (product, keyword) => {
  if (
    product.name.toLowerCase().includes(keyword.toLowerCase()) ||
    product.description.toLowerCase().includes(keyword.toLowerCase()) ||
    product.brand.toLowerCase().includes(keyword.toLowerCase())
  ) {
    return true;
  }
  {
    return false;
  }
};
