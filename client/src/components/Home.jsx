import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountries } from '../actions';
import Card from './Card';


function Home() {

  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);

  useEffect(() => {
    dispatch(getCountries())
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  return (
    <div>
      <Link to={"/activities"}>Agregar Actividad</Link>
      <h2>Welcome</h2>
      <button onClick={e => handleClick(e)}>Cargar Paises</button>
      <div>
        <select>
          <option value={"asc"}>Asc</option>
          <option value={"desc"}>Desc</option>
        </select>
      </div>
      {
        countries?.map(c => {
          return (
            <Card
              key={c.id}
              imagen={c.imagen}
              nombre={c.nombre}
              continente={c.continente}
            />
          )
        })
      }
    </div>
  )
}

export default Home;