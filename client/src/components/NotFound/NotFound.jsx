import React from 'react';
import img404 from '../../images/img404.jpeg';
import { Link } from 'react-router-dom';
import s from './notFound.module.css';


function NotFound() {
  return (
    <div className={s.container}>
      <Link to="/home"><button className={s.btn}>← Home</button></Link>
      <h3 className={s.h3}>Oops, nothing match with your request</h3>
      <img className={s.img} src={img404} alt="img not found" />
    </div>
  )
}

export default NotFound;