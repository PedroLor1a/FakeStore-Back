const { Category } = require("../db");

const createCategory = async (name) => {
  const create = await Category.create({ name });
  if (!create) {
    throw new Error("Hubo un error al crear category");
  }
  return create;
};

const getCategory = async () => {
  const response = await Category.findAll();
  if (!response) {
    throw new Error("No existen categorys");
  }
  return response;
};

const getCategoryByName = async (name) => {
  const response = await Category.findAll({
    where: {
      name,
    },
  });
  if (!response) {
    throw new Error("No existe category con ese name");
  }
  return response;
};

module.exports = {
  createCategory,
  getCategory,
  getCategoryByName,
};
