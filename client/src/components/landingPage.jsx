import React from 'react'
import { Link } from 'react-router-dom';


function LandingPage() {
    return (
        <div>
            <h2>Welcome to the App Countries</h2>
            <Link to={"/home"}><button>Enter</button></Link>
            <footer>asdasdasd</footer>
        </div>
    )
}

export default LandingPage;