import React from 'react';

function About() {
  return (
    <div>
      <div>
        <h2>Hello, thanks for viewing my project!</h2>
        <span>My name is Aníbal Ariel Trangoni and this my Individual Project for Henry's Web Development Course.
          <br />
          In this project I develop a single page application integrating several technologies that I learned in the course.
        </span>
        <h4>This website was developed with:</h4>
        <ul>
          <li>Javascript</li>
          <li>HTML/CSS</li>
          <li>React & Redux (Front-End)</li>
          <li>Node Express (Back-End)</li>
          <li>Sequelize (Database)</li>
          <li>Jest (Testing)</li>
        </ul>
      </div>
      <footer>
        <h4>Contact:</h4>
        <a href="https://www.linkedin.com/in/ariel-trangoni-web-developer/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://github.com/Arux26" target="_blank" rel="noreferrer">GitHub</a>
        <b>arieltrangoni1@gmail.com</b>

      </footer>
    </div>
  )
}

export default About