const axios = require("axios");
const { Products } = require("../db");

const getProducts = async () => {
  //   const response = await axios("https://fakestoreapi.com/products");
  //   const data = response.data;
  //   if (!data) {
  //     throw new Error("No existen productos");
  //   }
  //   return data;
  if ((await Products.count()) > 0) {
    const response = await Products.findAll();
    return response;
  } else {
    const infoApi = await axios("https://fakestoreapi.com/products");
    const data = infoApi.data;
    const createInDb = data.map((e) => {
      Products.create({
        title: e.title,
        price: e.price,
        category: e.category,
        image: e.image,
      });
      return {
        title: e.title,
        price: e.price,
        category: e.category,
        image: e.image,
      };
    });
  }
};

const getProductsById = async (id) => {
  const response = await Products.findAll({
    where: {
      id: id,
    },
  });
  if (!response) {
    throw new Error("No existe producto con ese id");
  }
  return response;
};

const getProductsByName = async (name) => {
  const response = await Products.findAll({
    where: {
      title: name,
    },
  });
  if (!response) {
    throw new Error("No se encontro producto con ese nombre");
  }
  return response;
};

const putProducts = async (id, updateProduct) => {
  const product = await Products.findByPk(id);
  if (!product) {
    throw new Error("Product not found");
  }
  await product.update(updateProduct);
  return product;
};

module.exports = {
  getProducts,
  getProductsById,
  getProductsByName,
  putProducts,
};
