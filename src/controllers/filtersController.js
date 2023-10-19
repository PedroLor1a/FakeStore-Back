const { Products, Category } = require("../db");

const filterByCategory = async (category) => {
  const filters = await Products.findAll({
    where: {
      category,
    },
  });
  if (!filters) {
    throw new Error("No se encontraron con esa category");
  }
  return filters;
};

module.exports = {
  filterByCategory,
};
