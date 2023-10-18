const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productsRouter = require("./productsRouter");
const categoryRouter = require("./categoryRouter");

const router = Router();

router.use("/products", productsRouter);
router.use("/category", categoryRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
