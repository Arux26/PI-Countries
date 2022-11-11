import React from 'react';
import { Link } from 'react-router-dom';
import s from "./card.module.css";


function Card({ imagen, nombre, continente, id }) {
    return (
        <div className={s.card}>
            <h3 className={s.nombre}>{nombre}</h3>
            <h4 className={s.continente}>{continente}</h4>
            <img src={imagen} alt="img not found" className={s.img} />
            <Link to={`/countries/${id}`} className={s.link}><button className={s.button}>Detail</button></Link>
        </div>
    )
}

export default Card