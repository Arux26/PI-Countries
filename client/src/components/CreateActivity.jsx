import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';

function CreateActivity() {

  /* const initialState = {
    actividad: "",
    dificultad: "",
    duracion: "",
    temporada: "",
  } */

  const [input, setInput] = useState({
    actividad: "",
    dificultad: "",
    duracion: "",
    temporada: "",
  });

  return (
    <div>
      <form>
        <div><Link to="/home">Volver</Link></div>
        <h2>Crear Actividad</h2>
        <div>
          <label>Pais:
            <select>
              <option value={"selec"}>Seleccionar</option>
              <option value={"arg"}>Argentina</option>
            </select>
          </label>
        </div>

        <label>Actividad:
          <input type="text" name="actividad" placeholder="Ingresar Actividad" />
        </label>

        <div>
          <label>Dificultad:
            <select>
              <option name="dificultad" value={input.dificultad}>Seleccionar</option>
              <option name="dificultad" value={input.dificultad}>1- Muy Fácil</option>
              <option name="dificultad" value={input.dificultad}>2- Fácil</option>
              <option name="dificultad" value={input.dificultad}>3- Medio</option>
              <option name="dificultad" value={input.dificultad}>4- Difícil</option>
              <option name="dificultad" value={input.dificultad}>5- Experto</option>
            </select>
          </label>
        </div>
        <div>
          <label>Duración:
            <select>
              <option name="duracion" value={input.duracion}>Seleccionar</option>
              <option name="duracion" value={input.duracion}>1hs</option>
              <option name="duracion" value={input.duracion}>2hs</option>
              <option name="duracion" value={input.duracion}>3hs</option>
              <option name="duracion" value={input.duracion}>Más de 3hs</option>
            </select>
          </label>
        </div>
        <div>
          <label>Temporada:
            <input type="checkbox" name="temporada" value={input.temporada} /> Verano
            <input type="checkbox" name="temporada" value={input.temporada} /> Otoño
            <input type="checkbox" name="temporada" value={input.temporada} /> Invierno
            <input type="checkbox" name="temporada" value={input.temporada} /> Primavera
          </label>
        </div>
        {/* <input type="submit" /> */}
        <button>Crear</button>
      </form>
    </div>
  )
}

export default CreateActivity