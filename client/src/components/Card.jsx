import React from 'react'

function Card({ imagen, nombre, continente }) {
    return (
        <div>
            <h3>{nombre}</h3>
            <h4>{continente}</h4>
            <img src={imagen} alt="img not found" />
        </div>
    )
}

export default Card