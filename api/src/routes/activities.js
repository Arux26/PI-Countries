const { Router } = require("express")
const axios = require("axios");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db");
const router = Router()


router.post("/", async (req, res) => {
  const { nombre, dificultad, duracion, temporada, countries } = req.body;
  if (!nombre || !dificultad || !duracion || !temporada) return res.send("Faltan enviar datos");
  try {
    const activity = await Activity.create({
      nombre,
      dificultad,
      duracion,
      temporada,
    });
    for (const id of countries) {
      const country = await Country.findOne({
        where: { id: id }
      })
      country.addActivity(activity)
    }
    res.json(activity);
  } catch (e) {
    console.log(e)
    res.status(404).send("Error en alguno de los datos provistos");
  }
})

router.get("/", async (req, res) => {
  try {
    const data = await Activity.findAll()
    res.json(data)
  } catch (e) {
    console.log(e)
  }
})

module.exports = router