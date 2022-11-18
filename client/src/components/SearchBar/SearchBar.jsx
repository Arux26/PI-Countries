import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountrieByName } from '../../actions';
//import { useHistory } from 'react-router-dom';
import s from './searchBar.module.css';

function SearchBar() {

  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const countries = useSelector(state => state.countries);



  const handleOnChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const country = countries.filter(e => e.nombre.toLowerCase().includes(input.toLowerCase()))
    if (!country.length) {
      alert("There are no countries with the entered text")
      setInput('')
    } else {
      dispatch(getCountrieByName(input))
      setInput('')
    }
    if (!input) return window.confirm("You must enter a country");
  }

  return (
    <div className={s.searchBar}>
      <form onSubmit={handleSubmit} className={s.searchBar}>
        <input className={s.input} type="text" value={input} placeholder="Enter country..." onChange={e => handleOnChange(e)} autoComplete="on" />
        <input className={s.btn} type="submit" value='Search' />
      </form>
    </div>
  )
}
export default SearchBar;

