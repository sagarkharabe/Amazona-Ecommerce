export const filter = (products, category, name, price) => {
  const arr = products.filter(
    (prod) =>
      prod.category.includes(category) && prod.name.toLowerCase().includes(name.toLowerCase()),
  );
  if (price === 'asc') {
    arr.sort((a, b) => a.price - b.price);
  }
  if (price === 'desc') {
    arr.sort((a, b) => b.price - a.price);
  }
  return arr;
};
