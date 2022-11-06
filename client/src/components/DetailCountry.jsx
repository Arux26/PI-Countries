import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { getCountryDetail } from '../actions';



function DetailCountry() {

  const countrie = useSelector(state => state.countryDetail)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getCountryDetail(id))
  }, [dispatch, id])

  return (

    <div>
      <div><Link to="/home"><button>← Back</button></Link></div>
      <br />
      {countrie?.map(c => {
        return (
          <div>
            <img src={c.imagen} alt="img not found" witdh="200px" height="200px" />
            <h4>{c.nombre}</h4>
            <h4>Country Code: {c.id}</h4>
            <h4>Capital: {c.capital}</h4>
            <h4>Continent: {c.continente}</h4>
            <h4>Subregion: {c.subregion}</h4>
            <h4>Area: {c.area}km²</h4>
            <h4>Population: {c.poblacion}</h4>
            <h4>Tourist activities: {c.activities.length ? c.activities.map(e => {
              return (
                <div>
                  <ul>
                    <li>Name: {e.nombre}</li>
                    <li>Difficulty: {e.dificultad}</li>
                    <li>Duration: {e.duracion}hs.</li>
                    <li>Season: {e.temporada}</li>
                  </ul>
                </div>
              )
            }) : <span>Has no activities</span>}</h4>
          </div>
        )
      })}
    </div>
  )
}

export default DetailCountry