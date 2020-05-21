import React from 'react'
import './Navbar.css'
import { Link } from "react-router-dom"
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import {faHospital} from '@fortawesome/react-fontawesome'

const Navbar = () =>{
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand text-white ml-7" href=" "> <img src="hospital.svg" alt="logo" style={{width: '40px'}} />TakeCare</a>
        
      
        <div className="container" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
          { /* <li class="nav-item active">
              <a class="nav-link text-white text-uppercase ml-9" href="#">Home <span class="sr-only">(current)</span></a>
    </li>*/}
            <li className="nav-item">
              <Link to ='Login' ><a className="nav-link text-white text-uppercase ml-2" href="">patient</a></Link>
            </li>
            <li class="nav-item">
              <Link to = 'Login'><a className="nav-link text-white text-uppercase ml-2" href="">médecin</a></Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white text-uppercase ml-2" href="">Blog santé</a>
            </li>
          </ul>
        </div>
      </nav>
    )
}

export default Navbar