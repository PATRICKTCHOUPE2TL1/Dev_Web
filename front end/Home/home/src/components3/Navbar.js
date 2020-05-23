import React, { Component } from 'react';
import Navitem from './Navitem';
import {FaCalendarCheck,FaFacebookMessenger,FaInfoCircle, FaUser} from "react-icons/fa";
import {IoIosPeople} from "react-icons/io"


class NavbarMed extends Component {
    constructor(props)
    {
    super(props);
    this.state={ 
    }
}
render() {
        return (
            <nav>
                <ul>
                    <Navitem item={<FaUser color='rgb(128,255,255)'/>} tolink="/Medecin/Profile"  activec={this.activeitem}></Navitem>
                    <Navitem item={<FaFacebookMessenger color='rgb(128,255,255)'/>} tolink="/Medecin/request-list"  activec={this.activeitem}></Navitem>
                    <Navitem item={<IoIosPeople color='rgb(128,255,255)'/>} tolink="/Medecin/MesPatient"  activec={this.activeitem}></Navitem>
                    <Navitem item={<FaCalendarCheck color='rgb(128,255,255)'/>} tolink="/Medecin/Agenda"  activec={this.activeitem}></Navitem>
                </ul>
            </nav>
        )
    }
}
export default NavbarMed