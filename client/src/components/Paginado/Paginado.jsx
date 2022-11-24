import React from 'react';
import { useEffect, useState } from "react";
import s from './paginado.module.css';

function Paginado({ countriesPerPage, allCountries, currentPage, setCurrentPage }) {

  const [pages, setPages] = useState([]);

  function handleNext() {
    if (currentPage <= pages.length - 1) setCurrentPage(currentPage + 1)
  };

  function handlePrev() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    let paginas = [1];
    let restCountries = allCountries - 9; // resto 9 x la primer pag ---> 241 
    for (let i = 2; i <= Math.ceil(restCountries / countriesPerPage) + 1; i++) {
      paginas.push(i);
    }
    setPages(paginas);
  }, [allCountries, countriesPerPage]);

  /* const handleFocus = (e) => {
    if (e.target.value) e.target.value = "page"
  }
 */
  return (
    <div className={s.cardContainer}>
      <button disabled={currentPage <= 1} className={currentPage <= 1 ? s.prevMax : s.prev} onClick={handlePrev}>←prev</button>
      {pages.map((page) => (
        <input type='submit' value={page} className={currentPage === page ? s.button2 : s.button} key={page} onClick={() => setCurrentPage(page)} />
      ))}
      <button disabled={currentPage >= pages.length} className={currentPage >= pages.length ? s.nextMax : s.next} onClick={handleNext}>next→</button>
    </div>
  );
}

export default Paginado;
