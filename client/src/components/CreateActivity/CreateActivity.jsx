import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, postActivity } from '../../actions';

export function validate(input) {
  let errors = {};
  if (!input.nombre) {
    errors.nombre = 'Write an activity';
  } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g.test(input.nombre)) {  //   
    errors.nombre = 'The activity cannot contain symbols or numbers';
  }
  if (!input.dificultad) errors.dificultad = 'Enter a difficulty';
  if (!input.duracion) errors.duracion = 'Duration is required';
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
    alert("Activity created successfully ✓")
    //setInput({ nombre: "", dificultad: "", duracion: "", temporada: "", countries: [] });
    history.push("/home")
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
    <div>
      <form onSubmit={e => handleSubmit(e)} /* onChange={handleCountriesChange} */>
        <div><Link to="/home"><button>← Back</button></Link></div>
        <h2>Create Activity</h2>
        {/* <div>
          <span>Pais:</span>
          <input type="text" name="countries" value={input.countries} placeholder="Buscar pais..." onChange={e => handleSelect(e)} onBlur={() => { setTimeout(() => { setAutocomplete([]) }, 200) }}  />
        </div> */}

        <div>
          <select onChange={(e) => handleSelect(e)} name="countries">
            <option hidden>Select Country</option>
            {allCountries.map((el) => (
              <option value={el.nombre} key={el.nombre}>{el.nombre}</option>
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
          <span>Activity:</span>
          <input type="text" name="nombre" value={input.nombre} placeholder="Enter activity" onChange={e => handleOnChange(e)} className={errors.nombre && "danger"} onBlur={e => handleOnBlur(e)} />
          {errors.nombre && <p className='danger' style={{ visibility: errors.nombre ? "visible" : "hidden" }}>{errors.nombre}</p>}
        </div>


        <div>
          <span>Difficulty:</span>
          <select name="dificultad" id='dificultad' onChange={e => handleOnChange(e)} onBlur={e => handleOnBlur(e)}>
            <option hidden>Select</option>
            <option name="dificultad" value={"1"}>1</option>
            <option name="dificultad" value={"2"}>2</option>
            <option name="dificultad" value={"3"}>3</option>
            <option name="dificultad" value={"4"}>4</option>
            <option name="dificultad" value={"5"}>5</option>
          </select>
          {errors.dificultad && <p className='danger' style={{ visibility: errors.dificultad ? "visible" : "hidden" }}>{errors.dificultad}</p>}
        </div>

        <div>
          <span>Duration:</span>
          <input type="radio" name="duracion" value={1} id="1hs" onChange={e => handleOnChange(e)} onBlur={e => handleOnBlur(e)} /> 1hs.
          <input type="radio" name="duracion" value={2} id="2hs" onChange={e => handleOnChange(e)} onBlur={e => handleOnBlur(e)} /> 2hs.
          <input type="radio" name="duracion" value={3} id="3hs" onChange={e => handleOnChange(e)} onBlur={e => handleOnBlur(e)} /> 3hs.
          <input type="radio" name="duracion" value={4} id="Más de 3hs" onChange={e => handleOnChange(e)} onBlur={e => handleOnBlur(e)} /> 4hs.
          {errors.duracion && <p className='danger' style={{ visibility: errors.duracion ? "visible" : "hidden" }}>{errors.duracion}</p>}
        </div>

        <div>
          <span>Season:</span>
          <select name="temporada" onChange={e => handleOnChange(e)} onBlur={e => handleOnBlur(e)}>
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
          disabled={!input.countries.length || errors.nombre || !input.nombre || !input.dificultad || input.dificultad === "Seleccionar" || !input.duracion || !input.temporada || input.temporada === "Seleccionar"}>
          Create
        </button>

      </form>
    </div>
  )
}

export default CreateActivity