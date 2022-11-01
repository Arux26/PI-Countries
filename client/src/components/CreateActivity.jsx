import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, postActivity } from '../actions';
// import Lupa2 from '../images/Lupa2.jpg'


export function validate(input) {
  let errors = {};
  if (!input.actividad) {
    errors.actividad = 'Escribe una actividad';
  } else if (/[^a-zA-Z]/.test(input.actividad)) {
    errors.actividad = 'La actividad no puede contener simbolos o numeros';
  }
  if (!input.dificultad) errors.dificultad = 'Ingresar una dificultad';
  if (!input.duracion) errors.duracion = 'Se requiere una duración';
  if (!input.temporada) errors.temporada = 'Seleccione una temporada';
  if (!input.countries.length) errors.countries = 'Seleccionar al menos un país';
  return errors;
};

function CreateActivity() {

  const allCountries = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch]);

  /* const initialState = {
    actividad: "",
    dificultad: "",
    duracion: "",
    temporada: "",
  } */
  /* onBlur={() => { setTimeout(() => { setLimpiar([]); }, 200); }} */
  const [input, setInput] = useState({
    actividad: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    countries: []
  });

  const [errors, setErrors] = useState({});
  //const [autoComplete, setAutocomplete] = useState([])


  /* const handleCountriesChange = (e) => {
    let handle = countries.filter((c) =>
      c.nombre.toLowerCase().includes(e.target.name.toLowerCase())
    );
    setAutocomplete(handle.slice(0, 4));
  }; */

  const handleOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }))
  };

  const handleOnBlur = (e) => {
    setErrors(validate({ ...input, [e.target.name]: e.target.value }))
  };

  /*  const handleOnFocus = (e) => {
     [e.target.name] = className = "focus";
   }; */

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate({ ...input, [e.target.name]: e.target.value }))
    dispatch(postActivity(input));
    alert("Actividad creada correctamente")
    setInput({ actividad: "", dificultad: "", duracion: "", temporada: "", countries: [] });
    history.push("/home")
  };


  function handleSelect(e) {
    setInput({
      ...input,
      countries: [...input.countries, e.target.value]
    });

    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }

  function handleDelete(el) {
    setInput({
      ...input,
      countries: input.countries.filter(c => c !== el)
    })
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)} /* onChange={handleCountriesChange} */>
        <div><Link to="/home">Volver</Link></div>
        <h2>Crear Actividad</h2>
        {/* <div>
          <span>Pais:</span>
          <input type="text" name="countries" value={input.countries} placeholder="Buscar pais..." onChange={e => handleSelect(e)} onBlur={() => { setTimeout(() => { setAutocomplete([]) }, 200) }}  />
        </div> */}

        <div>
          <select onChange={(e) => handleSelect(e)} name="countries">
            <option>Seleccionar Pais</option>
            {allCountries.map((el) => (
              <option value={el.nombre} key={el.nombre}> {el.nombre} </option>
            ))}
          </select>

          {errors.countries && <p className='danger'>{errors.countries}</p>}
          <ul>{input.countries.map(el => <ol key={el} onClick={() => handleDelete(el)}><button>X</button> {el}</ol>)}</ul>
        </div>

        {/* {
          !errors.name && !errors.difficulty && !errors.duration && !errors.season && !errors.countries ? 
          : (<p> Todos los campos deben ser completados para poder crear la actividad turistica </p>)
        } */}


        <div>
          <span>Actividad:</span>
          <input type="text" name="actividad" value={input.actividad} placeholder="Ingresar Actividad" onChange={e => handleOnChange(e)} className={errors.actividad && "danger"} onBlur={e => handleOnBlur(e)} />
          {errors.actividad && <p className='danger' style={{ visibility: errors.actividad ? "visible" : "hidden" }}>{errors.actividad}</p>}
        </div>


        <div>
          <span>Dificultad:</span>
          <select name="dificultad" id='dificultad' onChange={e => handleOnChange(e)} onBlur={e => handleOnBlur(e)}>
            <option>Seleccionar</option>
            <option name="dificultad" value={"Muy Fácil"}>Muy Fácil</option>
            <option name="dificultad" value={"Fácil"}>Fácil</option>
            <option name="dificultad" value={"Medio"}>Medio</option>
            <option name="dificultad" value={"Difícil"}>Difícil</option>
            <option name="dificultad" value={"Experto"}>Experto</option>
          </select>
          {errors.dificultad && <p className='danger' style={{ visibility: errors.dificultad ? "visible" : "hidden" }}>{errors.dificultad}</p>}
        </div>

        <div>
          <span>Duración:</span>
          <input type="radio" name="duracion" value={"1hs"} id="1hs" onChange={e => handleOnChange(e)} onBlur={e => handleOnBlur(e)} /> 1hs
          <input type="radio" name="duracion" value={"2hs"} id="2hs" onChange={e => handleOnChange(e)} onBlur={e => handleOnBlur(e)} /> 2hs
          <input type="radio" name="duracion" value={"3hs"} id="3hs" onChange={e => handleOnChange(e)} onBlur={e => handleOnBlur(e)} /> 3hs
          <input type="radio" name="duracion" value={"Más de 3hs"} id="Más de 3hs" onChange={e => handleOnChange(e)} onBlur={e => handleOnBlur(e)} /> Más de 3hs
          {errors.duracion && <p className='danger' style={{ visibility: errors.duracion ? "visible" : "hidden" }}>{errors.duracion}</p>}
        </div>

        <div>
          <span>Temporada:</span>
          <select name="temporada" onChange={e => handleOnChange(e)} onBlur={e => handleOnBlur(e)}>
            <option>Seleccionar</option>
            <option name="temporada" value={"Verano"}>Verano</option>
            <option name="temporada" value={"Otoño"}>Otoño</option>
            <option name="temporada" value={"Invierno"}>Invierno</option>
            <option name="temporada" value={"Primavera"}>Primavera</option>
          </select>
          {errors.temporada && <p className='danger' style={{ visibility: errors.temporada ? "visible" : "hidden" }}>{errors.temporada}</p>}
        </div>

        <button type="submit" disabled={errors.actividad || !input.actividad || !input.dificultad || !input.duracion || !input.temporada}>Crear</button>

      </form>
    </div>
  )
}

export default CreateActivity