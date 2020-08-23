import React from 'react'
import './Navbar.css'
import { Link } from "react-router-dom"

const Navbar = () =>{
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand text-white ml-7" href="#"> <img src="hospital.svg" alt="logo" style={{width: '40px'}} />TakeCare</a>  
        <div className="container" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link text-white text-uppercase ml-2" href="https://github.com/PATRICKTCHOUPE2TL1/Dev_Web/wiki/Cahier-de-charges" target="blank">About Us</a>
            </li>
          </ul>
        </div>
        </nav>
    )
}

export default Navbar