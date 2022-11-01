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
    setInput("");
    if (!input) return alert("Debe ingresar un pais")
    //if (countries.filter(e => e.nombre !== input.search())) return alert("El pais ingresado es incorrecto")
    //if (!input.search(input)) return alert("El pais ingresado es incorrecto")
  }
  return (
    <div>
      <input type="text" value={input} placeholder="Ingresar Pais..." onChange={e => handleOnChange(e)} />
      <button onClick={e => handleSubmit(e)}>Buscar</button>
    </div>
  )
}
export default SearchBar;

