const { Router } = require("express");
const {
  getProducts,
  getProductsById,
  getProductsByName,
  putProducts,
} = require("../controllers/productsController");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await getProducts();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: message.error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getProductsById(id);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: error.message });
  }
});

router.get("/byname/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const response = await getProductsByName(name);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/modify/:id", async (req, res) => {
  const { id } = req.params;
  const updateProduct = req.body;
  try {
    const product = await putProducts(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    await product.update(updateProduct);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
