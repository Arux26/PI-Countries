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
      imagen: p.flags ? p.flags[1] : p.flags === "img not found",
      continente: p.continents[0],
      capital: p.capital ? p.capital[0] : p.capital === "N/A",
      subregion: p.subregion ? p.subregion : "subregion not found",
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
        include: {
          model: Activity,
          //attributes: ["nombre", "dificultad", "duracion", "temporada"],
          through: {
            attributes: [],
          }
        }
      });
      countries.length ? res.status(200).json(countries) : res.status(404).send("Paises no encontrados");
    } else {
      const allCountries = await Country.findAll({
        include: {
          model: Activity,
          //attributes: ["nombre", "dificultad", "duracion", "temporada"],
          through: {
            attributes: [],
          }
        }
      });
      res.status(200).json(allCountries);
    }
  } catch (e) {
    console.log(e)
    res.status(404).send("Error: ", e)
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const country = await Country.findAll({
      where: {
        id: { [Op.iLike]: id }
      },
      include: {
        model: Activity,
        //attributes: ["nombre", "dificultad", "duracion", "temporada"],
        through: {
          attributes: [],
        }
      },
    });
    if (!country) return res.status(404).send(`El id ${id} no corresponde a un pais existente`);
    res.status(200).json(country);
  } catch (e) {
    console.log(e)
    res.status(404).send("Algo salio mal en el proceso")
  }
});

router.get("/continent/:continent", async (req, res) => {
  const { continent } = req.params;
  const countriesByContinent = await Country.findAll({
    where: {
      continente: { [Op.iLike]: `%${continent}%` }
    }
  })
  if (!countriesByContinent) return res.status(404).send(`El continente ${continent} no corresponde a un continente existente`);
  res.status(200).json(countriesByContinent);
});





module.exports = router 
