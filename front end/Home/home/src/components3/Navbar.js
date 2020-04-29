import React, { Component } from 'react';
import Navitem from './Navitem';
import {FaCalendarCheck,FaFacebookMessenger,FaInfoCircle, FaRegBell} from "react-icons/fa";
import {IoIosPeople} from "react-icons/io"

class Navbar extends Component {
constructor(props)
{
super(props);
this.state={ 
//'NavItemActive':''
}
}
render() {
return (
<nav id ="barnav">
<ul>
<Navitem item={<FaInfoCircle color='rgb(128,255,255)'/>} tolink="/"  activec={this.activeitem}></Navitem>
<Navitem item={<FaFacebookMessenger color='rgb(128,255,255)'/>} tolink="/Message"  activec={this.activeitem}></Navitem>
<Navitem item={<IoIosPeople color='rgb(128,255,255)'/>} tolink="/MesPatient"  activec={this.activeitem}></Navitem>
<Navitem item={<FaCalendarCheck color='rgb(128,255,255)'/>} tolink="/Agenda"  activec={this.activeitem}></Navitem>
</ul>
</nav>
)
}
}
export default Navbar