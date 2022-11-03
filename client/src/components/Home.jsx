import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import { getCountries, orderByName, orderByPopulation, filterByContinent, getActivities, filterByActivity } from '../actions';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';


function Home() {

  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
  //const allCountries = useSelector(state => state.allCountries);
  const activities = useSelector(state => state.activities)
  const [orden, setOrden] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);
  const indexOfLastCountry = currentPage * countriesPerPage; //9
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; //0
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry)
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries())
    dispatch(getActivities())
  }, [dispatch]);

  const handleAll = (e) => {
    e.preventDefault();
    dispatch(getCountries());
  }

  const handleSortByName = (e) => {
    e.preventDefault();
    dispatch(e.target.value === "All" ? getCountries() : orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(e.target.value)
  }

  const handleSortByPopulation = (e) => {
    e.preventDefault();
    dispatch(e.target.value === "All" ? getCountries() : orderByPopulation(e.target.value))
    setCurrentPage(1);
    setOrden(e.target.value)
  }

  const handleFilterByContinent = (e) => {
    e.preventDefault();
    dispatch(e.target.value === "Continente" ? getCountries() : filterByContinent(e.target.value))
    setCurrentPage(1);
  }

  const handleFilterByActivity = (e) => {
    e.preventDefault();
    dispatch(e.target.value === "actTur" ? getCountries() : filterByActivity(e.target.value))
    setCurrentPage(1);
  }

  return (
    <div>
      <h2>Welcome</h2>
      <div>
        <div>
          <SearchBar />
          <button onClick={e => handleAll(e)}>Mostrar Todos</button>
        </div>
        <div>
          <label>Ordenar por:
            <select onChange={e => handleSortByName(e)}>
              <option value={"All"}>Alfabeto</option>
              <option value={"AZ"}>A - Z</option>
              <option value={"ZA"}>Z - A</option>
            </select>
          </label>
          <select onChange={e => handleSortByPopulation(e)}>
            <option value={"All"}>Poblacion</option>
            <option value={"Mayor"}>Mayor</option>
            <option value={"Menor"}>Menor</option>
          </select>
        </div>
        <div>
          <label>Filtrar por:
            <select onChange={e => handleFilterByContinent(e)}>
              <option value={"Continente"}>Continente</option>
              <option value={"Africa"}>Africa</option>
              <option value={"Antarctic"}>Antartida</option>
              <option value={"Asia"}>Asia</option>
              <option value={"Europe"}>Europa</option>
              <option value={"North America"}>America del Norte</option>
              <option value={"South America"}>America del Sur</option>
              <option value={"Oceania"}>Oceania</option>
            </select>
            <select onChange={e => handleFilterByActivity(e)}>
              <option value={"actTur"}>Actividad Turistica</option>
              {activities?.map((el) => (
                <option value={el.nombre} key={el.nombre}>{el.nombre}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <Paginado countriesPerPage={countriesPerPage} allCountries={countries.length} paginado={paginado} />
      {
        currentCountries?.map(e => {
          return (
            <div>
              <Link to={`/countries/${e.id}`}>
                <Card
                  key={e.id}
                  imagen={e.imagen}
                  nombre={e.nombre}
                  continente={e.continente}
                />
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home;