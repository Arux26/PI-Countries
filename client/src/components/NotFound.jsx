import React from 'react';
import img404 from '../images/img404.jpeg';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h3>Oops, nothing match with your request</h3>
      <Link to="/home"><button>Home</button></Link>
      <br />
      <img src={img404} alt="img not found" />
    </div>

  )
}

export default NotFound