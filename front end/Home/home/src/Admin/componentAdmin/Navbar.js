import React, { Component } from 'react';
import Navitem from './Navitem';
import {IoIosPeople} from "react-icons/io"
import {FaTasks} from "react-icons/fa";


class NavbarAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <nav>
                <ul>
                    <Navitem item={<IoIosPeople color='rgb(128,255,255)'/>} tolink="/Admin/medecinlist" activec={this.activeitem}></Navitem>
                    <Navitem item={<FaTasks color='rgb(128,255,255)'/>} tolink="/Admin/dashboard" activec={this.activeitem}></Navitem>
                </ul>
            </nav>
        )
    }
}
export default NavbarAdmin