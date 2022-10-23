const { Router } = require("express")
const axios = require("axios");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

const router = Router();

getAllCountries = async () => {
  const getCountries = await axios.get("https://restcountries.com/v3/all");
  const countries = await getCountries.data.map(p => {
    return {
      id: p.cca3,
      nombre: p.name.common,
      imagen: p.flags ? p.flags[0] : p.flags === "img not found",
      continente: p.region,
      capital: p.capital ? p.capital[0] : p.capital === "N/A",
      subregion: p.subregion,
      area: p.area,
      poblacion: p.population
    };
  });
  return countries;
};

dbCountries = async () => {
  let countriesOnDb = await Country.findAll({
    include: { model: Activity }
  });
  if (!countriesOnDb.length) {
    const countries = await getAllCountries();
    try {
      await Country.bulkCreate(countries);
    } catch (e) {
      console.log(e)
    }
  };
  return countriesOnDb
};

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    await dbCountries();
    if (name) {
      const countries = await Country.findAll({
        where: {
          nombre: { [Op.iLike]: `%${name}%` }
        },
      });
      countries.length ? res.status(200).json(countries) : res.status(404).send("Paises no encontrados");
    } else {
      const allCountries = await Country.findAll({
        include: {
          model: Activity
        }
      });
      res.status(200).json(allCountries);
    }
  } catch (e) {
    console.log(e)
  }
});

module.exports = router 
