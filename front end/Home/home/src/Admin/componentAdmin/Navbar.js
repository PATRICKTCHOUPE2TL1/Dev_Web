import React, { Component } from 'react';
import Navitem from './Navitem';
class NavbarAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            <nav id="barnav">
                <ul>
                    <Navitem item="Medecin" tolink="/Admin/medecinlist" activec={this.activeitem}></Navitem>
                    <Navitem item="Dashboard" tolink="/Admin/dashboard" activec={this.activeitem}></Navitem>
                </ul>
            </nav>
        )
    }
}
export default NavbarAdmin