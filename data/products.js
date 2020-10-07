let products = [
  {
    id: 1,
    name: "laptop",
    price: "1234",
    vendorInfo: "Apple",
  },
  {
    id: 2,
    name: "phone",
    price: "5678",
    vendorInfo: "Android",
  },
  {
    id: 3,
    name: "Monitor",
    price: "9012",
    vendorInfo: "Dell",
  },
  {
    id: 4,
    name: "Sneakers",
    price: "3145",
    vendorInfo: "Nike",
  },
];

const addProduct = (name, price, vendorInfo) => {
  const id = products[products.length - 1].id + 1;
  const newProduct = { id, name, price, vendorInfo };
  products = [...products, newProduct];
  return { ...newProduct };
};

const getProducts = () => {
  return products;
};

const deleteProduct = (id) => {
	const newProducts = products.filter(product => product.id != id)
	products = [...newProducts]
	return true
}

module.exports = {
  getProducts,
	addProduct,
	deleteProduct
};
