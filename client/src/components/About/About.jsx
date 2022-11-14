import React from 'react';
import { Link } from 'react-router-dom';
import s from './about.module.css'

function About() {
  return (
    <div className={s.containerG}>
      <Link to="/home"><button className={s.btn}>← Back</button></Link>
      <div className={s.container}>
        <h1 className={s.title}>Hello, thanks for viewing my project!😊</h1>
        <span className={s.spanDetail}>My name is Aníbal Ariel Trangoni and this my Individual Project for Henry's Web Development Course.
          <br />
          In this project i develop a single page application integrating several technologies that I learned in the course.
        </span>
        <h2>This website was developed with:</h2>
        <ul className={s.ull}>
          <li>Javascript</li>
          <li>HTML/CSS</li>
          <li>React & Redux (Front-End)</li>
          <li>Node Express (Back-End)</li>
          <li>Sequelize (Database)</li>
          <li>Jest (Testing)</li>
        </ul>
        <footer className={s.foot}>
          <h1 className={s.contact}>Contact:</h1>
          <div className={s.icons}>
            <a className={s.buttonA} href="https://www.linkedin.com/in/ariel-trangoni-web-developer/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className={s.buttonA} href="https://github.com/Arux26" target="_blank" rel="noreferrer"> GitHub</a>
            <b className={s.buttonA}> Gmail: arieltrangoni1@gmail.com</b>
            <b className={s.buttonA}> 📱+54 9 364 4365838</b>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default About