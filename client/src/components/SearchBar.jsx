import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCountrieByName } from '../actions'

function SearchBar() {

  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getCountrieByName(input));
    setInput("");
  }
  return (
    <div>
      <input type="text" value={input} placeholder="Ingresar Pais..." onChange={e => handleOnChange(e)} />
      <button onClick={e => handleSubmit(e)}>Buscar</button>
    </div>
  )
}
export default SearchBar;

