import React from 'react';
import { Link } from 'react-router-dom';
//import LinkedIn from '../../images/LinkedIn.jpg';
//import GitHub from '../../images/GitHub.png';
import s from "./landingPage.module.css";


function LandingPage() {
  return (
    <div className={s.home}>
      <h2>Welcome to the App Countries</h2>
      <Link to={"/home"}><button className={s.button}>Enter</button></Link>
      <br />
      <br />
      {/*  <footer>
        <h4>Copyright - todos los derechos reservados</h4>
        <a href="https://www.linkedin.com/in/ariel-trangoni-web-developer/" target="_blank" rel="noreferrer"><img src={LinkedIn} alt='img not found' height="40px" /></a>
        <a href="https://github.com/Arux26" target="_blank" rel="noreferrer"><img src={GitHub} alt='img not found' height="40px" /></a>
      </footer> */}
    </div>
  )
}

export default LandingPage;