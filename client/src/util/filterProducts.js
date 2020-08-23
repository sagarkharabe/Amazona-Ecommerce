export const filter = (prods, cat, nam, price) => {
    const arr = prods.filter(
      (prod) => prod.category.includes(cat) && prod.name.toLowerCase().includes(nam.toLowerCase()),
    );
    if (price === 'asc') {
      arr.sort((a, b) => a.price - b.price);
    }
    if (price === 'desc') {
      arr.sort((a, b) => b.price - a.price);
    }
    return arr;
  };