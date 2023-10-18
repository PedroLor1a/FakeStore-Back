const { Router } = require("express");
const {
  getCategory,
  createCategory,
  getCategoryByName,
} = require("../controllers/categoryController");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.params;
  try {
    const response = name ? await getCategoryByName(name) : await getCategory();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: error.message });
  }
});

router.post("/create", async (req, res) => {
  const { name } = req.body;
  try {
    const response = await createCategory(name);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
