import React from 'react'
import './Navbar.css'
import { Link } from "react-router-dom"
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import {faHospital} from '@fortawesome/react-fontawesome'

const Navbar = () =>{
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand text-white ml-7" href="#"> <img src="hospital.svg" alt="logo" style={{width: '40px'}} />TakeCare</a>
        
      
        <div class="container" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
          { /* <li class="nav-item active">
              <a class="nav-link text-white text-uppercase ml-9" href="#">Home <span class="sr-only">(current)</span></a>
    </li>*/}
            <li class="nav-item">
              <Link to ='Login' ><a class="nav-link text-white text-uppercase ml-2" href="#">patient</a></Link>
            </li>
            <li class="nav-item">
              <Link to = 'Login'><a class="nav-link text-white text-uppercase ml-2" href="#">médecin</a></Link>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white text-uppercase ml-2" href="#">Blog santé</a>
            </li>
          </ul>
        </div>
      </nav>
    )
}

export default Navbar