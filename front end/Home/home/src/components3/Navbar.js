import React, { Component } from 'react';
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
}
}
export default Navbar