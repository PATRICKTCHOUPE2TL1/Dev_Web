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
                    <Navitem title="Mon Profil" item={<FaUser color='rgb(128,255,255)'/>} tolink="/Medecin/Profile"  activec={this.activeitem}></Navitem>
                    <Navitem title="Patient en attente" item={<FaFacebookMessenger color='rgb(128,255,255)'/>} tolink="/Medecin/request-list"  activec={this.activeitem}></Navitem>
                    <Navitem title="Mes patients" item={<IoIosPeople color='rgb(128,255,255)'/>} tolink="/Medecin/MesPatient"  activec={this.activeitem}></Navitem>
                    <Navitem title="Mon agenda" item={<FaCalendarCheck color='rgb(128,255,255)'/>} tolink="/Medecin/Agenda"  activec={this.activeitem}></Navitem>
                </ul>
            </nav>
        )
    }
}
export default NavbarMed