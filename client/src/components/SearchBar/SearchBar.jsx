import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountrieByName } from '../../actions';
import { useHistory } from 'react-router-dom';
import s from './searchBar.module.css';

function SearchBar({ setCurrentPage }) {

  const history = useHistory()
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const allCountries = useSelector(state => state.allCountries);


  const handleOnChange = (e) => {
    setInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const country = allCountries.filter(e => e.nombre.toLowerCase().includes(input.toLowerCase())) //---> []
    if (!input) return window.confirm("You must enter a country");
    if (!country.length) {
      history.push("/notFound")
      //alert("There are no countries with the entered text")
      setInput('')
    } else {
      setCurrentPage(1)
      dispatch(getCountrieByName(input))
      setInput('')
    }
  }

  return (
    <div className={s.searchBar}>
      <form onSubmit={handleSubmit} className={s.searchBar}>
        <input className={s.input} type="text" value={input} placeholder="Enter country..." onChange={e => handleOnChange(e)} />
        <input className={s.btn} type="submit" value='Search' />
      </form>
    </div>
  )
}
export default SearchBar;

