const { Router } = require("express");
const { filterByCategory } = require("../controllers/filtersController");

const router = Router();

router.get("/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const filter = await filterByCategory(category);
    res.status(200).json(filter);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
