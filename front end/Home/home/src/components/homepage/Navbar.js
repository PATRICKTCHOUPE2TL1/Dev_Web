import React from 'react'
import './Navbar.css'
import { Link } from "react-router-dom"
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import {faHospital} from '@fortawesome/react-fontawesome'

const Navbar = () =>{
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand text-white ml-7" href="#"> <img src="hospital.svg" alt="logo" style={{width: '40px'}} />TakeCare</a>  
      </nav>
    )
}

export default Navbar