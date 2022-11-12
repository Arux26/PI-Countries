import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountries } from '../../actions';
import SearchBar from '../SearchBar/SearchBar';
import s from './NavBar.module.css';



function NavBar() {
  const dispatch = useDispatch()

  const handleAllCountries = (e) => {
    e.preventDefault();
    dispatch(getCountries());
  }

  return (
    <div className={s.container}>
      <Link to="/home" onClick={e => handleAllCountries(e)} className={s.link}> HOME</Link>
      <SearchBar />
      <Link to="/about" className={s.link}>ABOUT</Link>
      <Link to="/create" className={s.link}>CREATE ACTIVITY</Link>
    </div>
  )
}

export default NavBar