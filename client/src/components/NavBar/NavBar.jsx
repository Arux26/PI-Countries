import React from 'react';
import { Link } from 'react-router-dom';
import s from './NavBar.module.css';

function NavBar() {
  return (
    <div className={s.container}>
      <Link to="/home" className={s.link}>Home</Link>
      <Link to="/about" className={s.link}>About</Link>
      <Link to="/create" className={s.link}>Create Activity</Link>
    </div>
  )
}

export default NavBar