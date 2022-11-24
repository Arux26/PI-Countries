import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, postActivity } from '../../actions';
import s from './activity.module.css';


export function validate(input) {
  let errors = {};
  if (!input.countries.length) errors.countries = 'Select at least one country';
  else if (!input.nombre) errors.nombre = 'Write an activity';
  else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g.test(input.nombre.trim())) {  //   
    errors.nombre = 'cannot contain symbols or numbers';
  }
  else if (!input.dificultad) errors.dificultad = 'Enter a difficulty';
  else if (!input.duracion) errors.duracion = 'Duration is required';
  else if (input.duracion > 12 || input.duracion <= 0) errors.duracion = 'Select min 1hs max 12hs';
  else if (!input.temporada) errors.temporada = 'Select a season';
  return errors;
};

function CreateActivity() {

  const allCountries = useSelector((state) => state.allCountries);
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

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }))
  };

  const handleOnBlur = (e) => {
    handleOnChange(e)
    setErrors(validate({ ...input, [e.target.name]: e.target.value }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate({ ...input, [e.target.name]: e.target.value }))
    dispatch(postActivity(input));
    //setInput({ nombre: "", dificultad: "", duracion: "", temporada: "", countries: [] });
    history.push("/home", alert("Activity created successfully ✓"))
  };


  function handleSelect(e) {
    if (!input.countries.includes(e.target.value)) {
      setInput({
        ...input,
        countries: [...input.countries, e.target.value],
      });
      setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
      }));
    } else return null;
  };

  function handleDelete(el) {
    setInput({
      ...input,
      countries: input.countries.filter(c => c !== el)
    })
  }

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={e => handleSubmit(e)}>

        <div><Link to="/home"><button className={s.btn}>← Back</button></Link></div>
        <h2 className={s.title}>Create Activity</h2>

        <span>Country:</span>
        <select className={s.createActivitySelect} onChange={(e) => handleSelect(e)} name="countries">
          <option hidden>Select Country</option>
          {allCountries.map((el) => (
            <option onBlur={handleOnBlur} value={el.nombre} key={el.nombre}>{el.nombre}</option>
          ))}
        </select>

        {errors.countries && <p className='danger'>{errors.countries}</p>}

        <ul className={s.containerArr}>{input.countries.map(el => <b className={s.bCountry} key={el}>{el}<button onClick={() => handleDelete(el)} className={s.btnX}>X</button></b>)}</ul>

        <div>
          <span>Activity:</span>
          <input autoFocus className={s.createActivityInputs} type="text" name="nombre" value={input.nombre} placeholder="Enter activity" onChange={e => handleOnChange(e)} onBlur={handleOnBlur} />
          {errors.nombre && <p className='danger' style={{ visibility: errors.nombre ? "visible" : "hidden" }}>{errors.nombre}</p>}
        </div>
        <div>
          <span>Difficulty:</span>
          <br />
          <input className={s.inputRadio} type="radio" name="dificultad" value={"1"} onChange={e => handleOnChange(e)} onBlur={handleOnBlur} />1/5
          <input className={s.inputRadio} type="radio" name="dificultad" value={"2"} onChange={e => handleOnChange(e)} onBlur={handleOnBlur} />2/5
          <input className={s.inputRadio} type="radio" name="dificultad" value={"3"} onChange={e => handleOnChange(e)} onBlur={handleOnBlur} />3/5
          <input className={s.inputRadio} type="radio" name="dificultad" value={"4"} onChange={e => handleOnChange(e)} onBlur={handleOnBlur} />4/5
          <input className={s.inputRadio} type="radio" name="dificultad" value={"5"} onChange={e => handleOnChange(e)} onBlur={handleOnBlur} />5/5
          {errors.dificultad && <p className='danger' style={{ visibility: errors.dificultad ? "visible" : "hidden" }}>{errors.dificultad}</p>}
        </div>
        <br />
        <div>
          <span>Duration:</span>
          <input className={s.createActivityInputs} type="number" name="duracion" value={input.duracion} placeholder={"Enter duration (hs)"} onChange={e => handleOnChange(e)} onBlur={handleOnBlur} />
          {errors.duracion && <p className='danger' style={{ visibility: errors.duracion ? "visible" : "hidden" }}>{errors.duracion}</p>}
        </div>

        <div>
          <span>Season:</span>
          <select className={s.createActivitySelect} name="temporada" onChange={e => handleOnChange(e)} onBlur={handleOnBlur}>
            <option hidden>Select</option>
            <option name="temporada" value={"All"}>All</option>
            <option name="temporada" value={"Summer"}>Summer</option>
            <option name="temporada" value={"Fall"}>Fall</option>
            <option name="temporada" value={"Winter"}>Winter</option>
            <option name="temporada" value={"Spring"}>Spring</option>
          </select>
          {errors.temporada && <p className='danger' style={{ visibility: errors.temporada ? "visible" : "hidden" }}>{errors.temporada}</p>}
        </div>
        <button
          type="submit"
          disabled={!input.countries.length || errors.nombre || !input.nombre || !input.dificultad || !input.duracion || !input.temporada || input.temporada === "Select"}
          className={!input.countries.length || errors.nombre || !input.nombre || !input.dificultad || !input.duracion || errors.duracion || !input.temporada || input.temporada === "Select" ? s.btnCreateDisabled : s.btnCreate}>
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateActivity