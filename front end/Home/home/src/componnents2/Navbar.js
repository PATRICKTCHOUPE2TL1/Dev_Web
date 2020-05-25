import React, { Component } from 'react';
import Navitem from './Navitem';
import {FaUserMd, FaUsers,FaUserNurse,FaInfoCircle} from "react-icons/fa";

class NavBarPat extends Component {
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
            <Navitem item={<FaUsers color='rgb(128,255,255)'/>} tolink="/Patient/nosmedecin"  activec={this.activeitem}></Navitem>
            <Navitem item={<FaInfoCircle color='rgb(128,255,255)'/>} tolink="/Patient/mesdonnées"  activec={this.activeitem}></Navitem>
            <Navitem item={<FaUserMd color='rgb(128,255,255)'/>} tolink="/Patient/monmedecin"  activec={this.activeitem}></Navitem>
        </ul>
    </nav>
    )
}
}
export default NavBarPat