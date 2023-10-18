const axios = require("axios");
const { Products, Category } = require("../db");

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
    include: {
      model: Category,
      attributes: ["name"],
      through: {
        attributes: [],
      },
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
    include: {
      model: Category,
      attributes: ["name"],
      through: {
        attributes: [],
      },
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

const createProducts = async (title, price, category, image, idCategory) => {
  const createProduct = await Products.create({
    title,
    price,
    category,
    image,
    idCategory,
  });
  if (!createProduct) {
    throw new Error("No se pudo crear un nuevo producto");
  }
  const categorys = await Category.findByPk(idCategory);
  if (!category) {
    throw new Error("No se encontro category");
  }
  await createProduct.addCategory(categorys);
  return createProduct;
};

module.exports = {
  getProducts,
  getProductsById,
  getProductsByName,
  putProducts,
  createProducts,
};
