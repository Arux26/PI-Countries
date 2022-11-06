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
  const [countriesPerPage] = useState(10);

  let lastCountry = currentPage * countriesPerPage; //10
  let firstIndex = lastCountry - countriesPerPage; // 0

  if (currentPage === 1) {
    firstIndex = 0;
    lastCountry = 9;
  } else {
    firstIndex--;
    lastCountry--;
  }
  const currentCountries = countries.slice(firstIndex, lastCountry)

  useEffect(() => {
    dispatch(getCountries())
    dispatch(getActivities())
  }, [dispatch]);


  const handleAllCountries = (e) => {
    e.preventDefault();
    dispatch(getCountries());
  }

  const handleSortByName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(e.target.value)
  }

  const handleSortByPopulation = (e) => {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value))
    setCurrentPage(1);
    setOrden(e.target.value)
  }

  const handleFilterByContinent = (e) => {
    e.preventDefault();
    dispatch(filterByContinent(e.target.value))
    setCurrentPage(1);
  }

  const handleFilterByActivity = (e) => {
    e.preventDefault();
    dispatch(filterByActivity(e.target.value))
    setCurrentPage(1);
  }

  return (
    <div>
      <h2>Welcome</h2>
      <div>
        <div>
          <SearchBar />
          <button onClick={e => handleAllCountries(e)}>Show all</button>
        </div>
        <div>
          <label>Sort by:
            <select onChange={e => handleSortByName(e)}>
              <option hidden>Alphabet</option>
              <option value={"AZ"}>A - Z</option>
              <option value={"ZA"}>Z - A</option>
            </select>
          </label>
          <select onChange={e => handleSortByPopulation(e)}>
            <option hidden>Population</option>
            <option value={"Higher"}>Higher</option>
            <option value={"Minor"}>Minor</option>
          </select>
        </div>
        <div>
          <label>Filter by:
            <select onChange={e => handleFilterByContinent(e)}>
              <option hidden>Continent</option>
              <option value={"Africa"}>Africa</option>
              <option value={"Antarctic"}>Antarctic</option>
              <option value={"Asia"}>Asia</option>
              <option value={"Europe"}>Europe</option>
              <option value={"North America"}>North America</option>
              <option value={"South America"}>South America</option>
              <option value={"Oceania"}>Oceania</option>
            </select>
            <select onChange={e => handleFilterByActivity(e)}>
              <option hidden>Tourist Activity</option>
              {activities?.map((el) => (
                <option value={el.nombre} key={el.nombre}>{el.nombre}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <Paginado countriesPerPage={countriesPerPage} allCountries={countries.length} setCurrentPage={setCurrentPage} />

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