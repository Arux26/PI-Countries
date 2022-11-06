import React from 'react';
import { Link } from 'react-router-dom';


function NavBar() {
  return (
    <div>
      <ul>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/create">Create Activity</Link>

      </ul>
    </div>
  )
}

export default NavBar