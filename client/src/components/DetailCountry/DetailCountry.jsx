import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { getCountryDetail, resetDetail } from '../../actions';
import Loading from '../Loading/Loading';
import NotFound from '../NotFound/NotFound';
import s from './detail.module.css';

function DetailCountry() {

  const countrie = useSelector(state => state.countryDetail);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCountryDetail(id));
    return function cleanup() {
      dispatch(resetDetail());
    };
  }, [dispatch, id])

  return (

    <div>
      {loading ? <Loading /> : countrie.length ? countrie.map(c => {
        return (
          <div className={s.containerG}>
            <div className={s.container1}>
              <Link to="/home"><button className={s.btn}>← BACK</button></Link>
              <br />
              <div className={s.detail}>
                <h2 className={s.pais}>{c.nombre}</h2>
                <img className={s.img} src={c.imagen} alt="img not found" witdh="200px" height="200px" />
                <br />
                <h3>Country Code: <span>{c.id}</span></h3>
                <h3>Capital: <span>{c.capital}</span></h3>
                <h3>Continent: <span>{c.continente}</span></h3>
                <h3>Subregion: <span>{c.subregion}</span></h3>
                <h3>Area: <span>{c.area}km²</span></h3>
                <h3>Population: <span>{c.poblacion}</span></h3>
              </div>
            </div>
            <div className={s.container2}>
              <h4 className={s.activities}><h3 className={s.textAct}>Tourist activities: </h3>{c.activities.length ? c.activities.map(e => {
                return (
                  <ul className={s.ull}>
                    <li>Name: <span>{e.nombre}</span></li>
                    <li>Difficulty: <span>{e.dificultad}/5</span></li>
                    <li>Duration: <span>{e.duracion}hs.</span></li>
                    <li>Season: <span>{e.temporada}</span></li>
                  </ul>
                )
              }) : <span>Has no activities</span>}</h4>
            </div>
          </div>
        )
      }) : <NotFound />}
    </div >
  )
}

export default DetailCountry