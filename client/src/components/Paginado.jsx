import React from 'react'

function Paginado({ countriesPerPage, allCountries, paginado }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
        pageNumbers.push(i);
        //console.log(pageNumbers)
    }

    return (
        <nav>
            <ul>
                {pageNumbers?.map((number, i) => (
                    <a key={i} onClick={() => paginado(number)}>{number}</a>
                ))}
            </ul>
        </nav>
    );
}

export default Paginado;

/* import React from 'react';
const Paginado = () => {


  return (
    <div>
      <h2>HOLAAAAAAAAAAAAAAAAAAAAA</h2>
    </div>
  );
};

export default Paginado; */