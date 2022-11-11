import React from 'react';
import { useEffect, useState } from "react";
import s from './paginado.module.css';

function Paginado({ countriesPerPage, allCountries, setCurrentPage }) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    let paginas = [1];
    let restCountries = allCountries - 9; // resto 9 x la primer pag ---> 241
    if (restCountries > 0)
      for (let i = 2; i <= Math.ceil(restCountries / countriesPerPage) + 1; i++) {
        paginas.push(i);
      }
    setPages(paginas);
  }, [allCountries]);

  /*   useEffect(() => {
      if (currentPage > pages.length && pages.length !== 0)
        setCurrentPage(pages.at(-1));
    }, [currentPage, pages, setCurrentPage]); */

  return (
    <div className={s.cardContainer}>
      {pages.map((page) => (
        <button className={s.button} key={page} onClick={() => setCurrentPage(page)}>{page}</button>
      ))}
    </div>
  );
}

export default Paginado;
