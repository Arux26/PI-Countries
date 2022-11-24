const { Router } = require("express")
const axios = require("axios");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db");
const router = Router()


router.post("/", async (req, res) => {
  const { nombre, dificultad, duracion, temporada, countries } = req.body;
  if (!nombre || !dificultad || !duracion || !temporada) return res.send("Faltan enviar datos");
  try {
    const [activity] = await Activity.findOrCreate({
      where: { [Op.and]: [{ nombre: { [Op.iLike]: nombre } }, { dificultad }, { duracion }, { temporada }] },
      defaults: {
        nombre,
        dificultad,
        duracion,
        temporada,
      }
    });
    for (const nombre of countries) {  //[Argentina, Brazil, Canada]
      const country = await Country.findOne({
        where: { nombre: nombre }
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