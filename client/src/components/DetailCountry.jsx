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
      <div><Link to="/home"><button>← Volver</button></Link></div>
      <br />
      {countrie.map(c => {
        return (
          <div>
            <img src={c.imagen} alt="img not found" witdh="200px" height="200px" />
            <h4>Pais: {c.nombre}</h4>
            <h4>Codigo Pais: {c.id}</h4>
            <h4>Capital: {c.capital}</h4>
            <h4>Continente: {c.continente}</h4>
            <h4>Subregion: {c.subregion}</h4>
            <h4>Área: {c.area}km²</h4>
            <h4>Población: {c.poblacion}</h4>
            <h4>Actividades Turísticas: {c.activities.length ? c.activities.map(e => {
              return (
                <div>
                  <ul>
                    <li>Nombre: {e.nombre}</li>
                    <li>Dificultad: {e.dificultad}</li>
                    <li>Duracion: {e.duracion}hs.</li>
                    <li>Temporada: {e.temporada}</li>
                  </ul>
                </div>
              )
            }) : <span>No hay actividades</span>}</h4>
          </div>
        )
      })}
    </div>
  )
}

export default DetailCountry