import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Navitem from './Navitem';
import {FaCalendarCheck,FaFacebookMessenger,FaInfoCircle, FaUser} from "react-icons/fa";
import {IoIosPeople} from "react-icons/io"

class Navbar extends Component {
constructor(props)
{
super(props);
this.state={ 
}
}
render() {
return (
<nav id ="barnav">
<ul>
    <li id={this.props.item}>
        <a href="/Medecin/Profile" id ="navelt">{<FaUser color='rgb(128,255,255)'/>}</a>
    </li>
    <li id={this.props.item}>
        <a href="/Message" id ="navelt">{<FaFacebookMessenger color='rgb(128,255,255)'/>}</a>
    </li>
    <li id={this.props.item}>
        <a href="/MesPatient" id ="navelt">{<IoIosPeople color='rgb(128,255,255)'/>} </a>
    </li>
    <li id={this.props.item}>
        <a href="/Agenda" id ="navelt">{<FaCalendarCheck color='rgb(128,255,255)'/>} </a>
    </li>
</ul>
</nav>
)
}
}
export default Navbar