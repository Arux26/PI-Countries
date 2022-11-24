import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, orderByName, orderByPopulation, filterByContinent, getActivities, filterByActivity } from '../../actions';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';
import NavBar from '../NavBar/NavBar';
import Paginado from '../Paginado/Paginado';
import s from "./home.module.css"


function Home() {

  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
  const activities = useSelector(state => state.activities);
  const [, setOrden] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  //let countriesPerPage = 10
  let firstIndex;
  let lastCountry;

  if (currentPage === 1) {
    firstIndex = 0;
    lastCountry = 9;
  } else {
    lastCountry = (currentPage * countriesPerPage) - 1;
    firstIndex = lastCountry - countriesPerPage;
  }
  const currentCountries = countries.slice(firstIndex, lastCountry);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);


  const handleSortByName = (e) => {
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  const handleSortByPopulation = (e) => {
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  const handleFilterByContinent = (e) => {
    e.target.value === "All" ? dispatch(getCountries()) : dispatch(filterByContinent(e.target.value));
    setCurrentPage(1);
  }

  const handleFilterByActivity = (e) => {
    dispatch(filterByActivity(e.target.value));
    setCurrentPage(1);
  }

  /* function handleFilter(e) {
    dispatch(handleFilterByContinent(e.target.value));
    dispatch(handleFilterByActivity(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
    setCurrentPage(1);
  } */

  /*  const scrollTop = () => {
     window.scrollTo({
       top: 0,
       behavior: "smooth",
     })
   } */

  return (
    <div className={s.contenedorPrinc}>
      <NavBar setCurrentPage={setCurrentPage} />
      <div>
      </div>
      <div className={s.containerSelects}>
        <div className={s.containerOrder}>
          <label className={s.label}>SORT BY:
            <select id='Alphabet' className={s.select} onChange={e => handleSortByName(e)}>
              <option hidden>Alphabet</option>
              <option value={"AZ"}>A - Z</option>
              <option value={"ZA"}>Z - A</option>
            </select>
            <select id='Population' className={s.select} onChange={e => handleSortByPopulation(e)}>
              <option hidden>Population</option>
              <option value={"Higher"}>Higher</option>
              <option value={"Minor"}>Minor</option>
            </select>
          </label>
        </div>
        <div>
          <label className={s.label}>FILTER BY:
            <select id='Continent' className={s.select} onChange={e => handleFilterByContinent(e)}>
              <option hidden>Continent</option>
              <option value={"All"}>All</option>
              <option value={"Africa"}>Africa</option>
              <option value={"Antarctic"}>Antarctic</option>
              <option value={"Asia"}>Asia</option>
              <option value={"Europe"}>Europe</option>
              <option value={"North America"}>North America</option>
              <option value={"South America"}>South America</option>
              <option value={"Oceania"}>Oceania</option>
            </select>
            <select id='Tourist Activity' className={s.select} onChange={e => handleFilterByActivity(e)}>
              <option hidden>Tourist Activity</option>
              <option value={"All"}>All</option>
              {activities?.map((el) => (
                <option value={el.nombre} key={el.nombre}>{el.nombre}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <Paginado countriesPerPage={countriesPerPage} allCountries={countries.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className={s.cardContainer}>
        {
          currentCountries.length ? currentCountries.map(e => {
            return (
              <div >

                <Card
                  id={e.id}
                  key={e.id}
                  imagen={e.imagen}
                  nombre={e.nombre}
                  continente={e.continente}
                />
              </div>
            )
          }) : <Loading />
        }
      </div>
      {/* <button onClick={() => window.scrollTo(0, 0)}>GO UP</button> */}
    </div>
  )
};

export default Home;