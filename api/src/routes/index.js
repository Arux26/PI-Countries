const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const countries = require("./countries");
const activities = require("./activities");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", countries)
router.use("/activities", activities)

module.exports = router;
