import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, postActivity } from '../../actions';
import s from './activity.module.css';


export function validate(input) {
  let errors = {};
  if (!input.nombre) errors.nombre = 'Write an activity';
  else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g.test(input.nombre)) {  //   
    errors.nombre = 'cannot contain symbols or numbers';
  }
  if (!input.dificultad) errors.dificultad = 'Enter a difficulty';
  if (!input.duracion) errors.duracion = 'Duration is required';
  else if (input.duracion > 12 || input.duracion <= 0) errors.duracion = 'Select min 1hs max 12hs';
  if (!input.temporada) errors.temporada = 'Select a season';
  if (!input.countries.length) errors.countries = 'Select at least one country';
  return errors;
};

function CreateActivity() {

  const allCountries = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch]);


  const [input, setInput] = useState({
    nombre: "",
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
    //setInput({ nombre: "", dificultad: "", duracion: "", temporada: "", countries: [] });
    history.push("/home", alert("Activity created successfully ✓"))
  };


  function handleSelect(e) {
    setInput({
      ...input,
      //countries: [...input.countries.includes(e.target.value) ? [...input.countries.filter(e => e.nombre === e.target.value)] : [...input.countries], e.target.value]
      countries: [...input.countries, e.target.value],
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
    <div className={s.container}>
      <form className={s.form} onSubmit={e => handleSubmit(e)} /* onChange={handleCountriesChange} */>

        <div><Link to="/home"><button className={s.btn}>← Back</button></Link></div>
        <h2 className={s.title}>Create Activity</h2>
        {/* <div>
          <span>Pais:</span>
          <input type="text" name="countries" value={input.countries} placeholder="Buscar pais..." onChange={e => handleSelect(e)} onBlur={() => { setTimeout(() => { setAutocomplete([]) }, 200) }}  />
        </div> */}


        <span>Country:</span>
        <select className={s.createActivitySelect} onChange={(e) => handleSelect(e)} name="countries">
          <option hidden>Select Country</option>
          {allCountries.map((el) => (
            <option value={el.nombre} key={el.nombre}>{el.nombre}</option>
          ))}
        </select>

        {errors.countries && <p className='danger'>{errors.countries}</p>}

        <ul className={s.containerArr}>{input.countries.map(el => <b className={s.bCountry} key={el} onClick={() => handleDelete(el)}>{el}<button className={s.btnX}>X</button></b>)}</ul>

        {/* {
          !errors.name && !errors.difficulty && !errors.duration && !errors.season && !errors.countries ? 
          : (<p> Todos los campos deben ser completados para poder crear la actividad turistica </p>)
        } */}


        <div>
          <span>Activity:</span>
          <input className={s.createActivityInputs} type="text" name="nombre" value={input.nombre} placeholder="Enter activity" onChange={e => handleOnChange(e)} />
          {errors.nombre && <p className='danger' style={{ visibility: errors.nombre ? "visible" : "hidden" }}>{errors.nombre}</p>}
        </div>
        <div>
          <span>Difficulty:</span>
          <br />
          <input className={s.inputRadio} type="radio" name="dificultad" value={"1"} onChange={e => handleOnChange(e)} />1/5
          <input className={s.inputRadio} type="radio" name="dificultad" value={"2"} onChange={e => handleOnChange(e)} />2/5
          <input className={s.inputRadio} type="radio" name="dificultad" value={"3"} onChange={e => handleOnChange(e)} />3/5
          <input className={s.inputRadio} type="radio" name="dificultad" value={"4"} onChange={e => handleOnChange(e)} />4/5
          <input className={s.inputRadio} type="radio" name="dificultad" value={"5"} onChange={e => handleOnChange(e)} />5/5
          {errors.dificultad && <p className='danger' style={{ visibility: errors.dificultad ? "visible" : "hidden" }}>{errors.dificultad}</p>}
        </div>
        <br />
        <div>
          <span>Duration:</span>
          <input className={s.createActivityInputs} type="number" name="duracion" value={input.duracion} placeholder={"Enter duration (hs)"} onChange={e => handleOnChange(e)} onBlur={e => handleOnBlur(e)} />
          {errors.duracion && <p className='danger' style={{ visibility: errors.duracion ? "visible" : "hidden" }}>{errors.duracion}</p>}
        </div>

        <div>
          <span>Season:</span>
          <select className={s.createActivitySelect} name="temporada" onChange={e => handleOnChange(e)} onBlur={e => handleOnBlur(e)}>
            <option hidden>Select</option>
            <option name="temporada" value={"Verano"}>Verano</option>
            <option name="temporada" value={"Otoño"}>Otoño</option>
            <option name="temporada" value={"Invierno"}>Invierno</option>
            <option name="temporada" value={"Primavera"}>Primavera</option>
          </select>
          {errors.temporada && <p className='danger' style={{ visibility: errors.temporada ? "visible" : "hidden" }}>{errors.temporada}</p>}
        </div>
        <button
          type="submit"
          disabled={!input.countries.length || errors.nombre || !input.nombre || !input.dificultad || !input.duracion || !input.temporada}
          className={!input.countries.length || errors.nombre || !input.nombre || !input.dificultad || !input.duracion || errors.duracion || !input.temporada ? s.btnCreateDisabled : s.btnCreate}>
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateActivity