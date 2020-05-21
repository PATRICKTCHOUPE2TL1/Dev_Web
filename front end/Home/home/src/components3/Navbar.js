import React, { Component } from 'react';
<<<<<<< HEAD
import Navitem from './Navitem';
class NavbarMed extends Component {
constructor(props)
{
super(props);
this.state={ 
//'NavItemActive':''
}
}
/*activeitem=(x)=>
{
if(this.state.NavItemActive.length>0){
document.getElementById(this.state.NavItemActive).classList.remove('active');
}
this.setState({'NavItemId':x},()=>{
document.getElementById(this.state.NavItemActive).classList.add('active');
});
};*/
render() {
return (
<nav id ="barnav">
<ul>
<Navitem item="MesDonnees" tolink="/Medecin/Profile"  activec={this.activeitem}></Navitem>
<Navitem item="Demande d'assistance" tolink="/Medecin/request-list"  activec={this.activeitem}></Navitem>
<Navitem item="MesPatient" tolink="/Medecin/MesPatient"  activec={this.activeitem}></Navitem>
<Navitem item="Agenda" tolink="/Medecin/Agenda"  activec={this.activeitem}></Navitem>
</ul>
</nav>
)
=======
import { Link } from "react-router-dom";
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
        <nav >
            <ul>
                <Link to='/Medecin/Profile'>
                    <li id={this.props.item}>
                        {<FaUser color='rgb(128,255,255)'/>}
                    </li> 
                </Link>
                <Link to='/Message'>
                    <li id={this.props.item}>
                        {<FaFacebookMessenger color='rgb(128,255,255)'/>}
                    </li> 
                </Link>
                <Link to='/MesPatient'>
                    <li id={this.props.item}>
                        {<IoIosPeople color='rgb(128,255,255)'/>}
                    </li> 
                </Link>
                <Link to='/Agenda'>
                    <li id={this.props.item}>
                        {<FaCalendarCheck color='rgb(128,255,255)'/>} 
                    </li> 
                </Link>
            </ul>
        </nav>
    )
>>>>>>> f67313fc34587786cc01f99abe77cdf067f0f425
}
}
export default NavbarMed