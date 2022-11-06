import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountrieByName } from '../actions'

function SearchBar() {

  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const countries = useSelector(state => state.countries)

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getCountrieByName(input));
    if (!input) return window.confirm("You must enter a country")
    /* for (const nombre of countries) {
      let country = nombre.includes(input)
      if (country) return true
      return alert("asDSAdsadsadsad")
    } */
    //if (countries.map(e => e.nombre.toLowerCase().includes(input.toLowerCase()))) return alert("El pais ingresado es incorrecto")
    //if (countries.map(e => e.nombre.toLowerCase().search(input.toLowerCase()))) return alert("El pais ingresado es incorrecto")
    //if (!countries.includes(e => e.nombre !== input)) return window.confirm("Debe ingresar un pais")
    //if (!countries.some(e => e.nombre.match(input))) return alert("asdsaddassdadsadsadasdsa")
    setInput("");
  }

  return (
    <div>
      <input type="text" value={input} placeholder="Enter country..." onChange={e => handleOnChange(e)} />
      <button onClick={e => handleSubmit(e)}>Search</button>
    </div>
  )
}
export default SearchBar;

