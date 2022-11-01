import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
import { getCountries, orderByName, orderByPopulation, filterByContinent } from '../actions';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';


function Home() {

  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
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
  }, [dispatch]);

  function handleAll(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  function handleSortByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(e.target.value)
  }

  function handleSortByPopulation(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value))
    setCurrentPage(1);
    setOrden(e.target.value)
  }

  function handleFilterByContinent(e) {
    e.preventDefault();
    dispatch(filterByContinent(e.target.value))
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
              <option>Alfabeto</option>
              <option value={"AZ"}>A - Z</option>
              <option value={"ZA"}>Z - A</option>
            </select>
          </label>
          <select onChange={e => handleSortByPopulation(e)}>
            <option>Poblacion</option>
            <option value={"Mayor"}>Mayor</option>
            <option value={"Menor"}>Menor</option>
          </select>
        </div>
        <div>
          <label>Filtrar por:
            <select onChange={e => handleFilterByContinent(e)}>
              <option>Continente</option>
              <option value={"Africa"}>Africa</option>
              <option value={"Antarctic"}>Antartida</option>
              <option value={"Asia"}>Asia</option>
              <option value={"Europe"}>Europa</option>
              <option value={"North America"}>Norte America</option>
              <option value={"South America"}>Sur America</option>
              <option value={"Oceania"}>Oceania</option>
            </select>
            <select>
              <option value={"actTur"}>Actividad Turistica</option>
              <option value={"Arquitectura"}>Arquitectura</option>
              <option value={"Arqueologia"}>Arqueologia</option>
              <option value={"Esqui"}>Esqui</option>
              <option value={"Islas"}>Islas</option>
              <option value={"Safari"}>Safari</option>
              <option value={"Playa"}>Playa</option>
            </select>
          </label>
        </div>
      </div>
      <Paginado countriesPerPage={countriesPerPage} allCountries={countries.length} paginado={paginado} />
      {
        currentCountries?.map(e => {
          return (
            <Card
              key={e.id}
              imagen={e.imagen}
              nombre={e.nombre}
              continente={e.continente}
            />
          )
        })
      }
    </div>
  )
}

export default Home;