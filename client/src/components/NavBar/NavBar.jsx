import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountries, getActivities } from '../../actions';
import SearchBar from '../SearchBar/SearchBar';
import s from './NavBar.module.css';



function NavBar({ setCurrentPage }) {
  const dispatch = useDispatch()

  const filterCont = document.getElementById("Continent")
  const filterAct = document.getElementById("Tourist Activity")
  const orderPop = document.getElementById("Population")
  const orderAlf = document.getElementById("Alphabet")

  const handleAllCountries = (e) => {
    e.preventDefault();
    dispatch(getCountries());
    dispatch(getActivities());
    setCurrentPage(1);
    filterCont.value = "Continent";
    filterAct.value = "Tourist Activity"
    orderPop.value = "Population";
    orderAlf.value = "Alphabet";
  }

  return (
    <div className={s.container}>
      <Link to="/home" onClick={e => handleAllCountries(e)} className={s.link}> HOME</Link>
      <SearchBar setCurrentPage={setCurrentPage} />
      <Link to="/about" className={s.link}>ABOUT</Link>
      <Link to="/create" className={s.link}>CREATE ACTIVITY</Link>
    </div>
  )
}

export default NavBar