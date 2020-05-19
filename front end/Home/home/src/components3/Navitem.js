import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Navitem extends Component {
render() {
return (
<li id={this.props.item}>
<Link to ={this.props.tolink} id ="navelt">{this.props.item}</Link>
</li>
)
}
}
export default Navitem

/*<Navitem item={<FaUser color='rgb(128,255,255)'/>} tolink="/Medecin/Profile"  activec={this.activeitem}></Navitem>
<Navitem item={<FaFacebookMessenger color='rgb(128,255,255)'/>} tolink="/Message"  activec={this.activeitem}></Navitem>
<Navitem item={<FaCalendarCheck color='rgb(128,255,255)'/>} tolink="/Agenda"  activec={this.activeitem}></Navitem>
<Navitem item={<IoIosPeople color='rgb(128,255,255)'/>} tolink="/MesPatient"  activec={this.activeitem}></Navitem>
*/