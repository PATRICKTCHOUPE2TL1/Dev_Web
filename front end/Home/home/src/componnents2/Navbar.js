import React, { Component } from 'react';
import Navitem from './Navitem';
class Navbar extends Component {
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
<Navitem item="Nos Medecins" tolink="/MonProfil"  activec={this.activeitem}></Navitem>
<Navitem item="Mes données" tolink="/mesdonnées"  activec={this.activeitem}></Navitem>
<Navitem item="Mon medecin" tolink="/monmedecin"  activec={this.activeitem}></Navitem>
</ul>
</nav>
)
}
}
export default Navbar