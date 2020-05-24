import React, { Component } from 'react';
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
}
}
export default NavbarMed