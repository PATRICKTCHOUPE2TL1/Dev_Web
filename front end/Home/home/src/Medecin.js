import React , {Component} from 'react';
import Entete from './components3/header'
import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";
import Navbar from './components3/Navbar';
//import './Medecin.css'


class MedSpace extends Component {
    constructor(props){
        super(props)
        this.state ={
            id : props.userId

        }
    }
    render(){
return (
 
<<<<<<< HEAD
<div>
   <Entete />
   <Navbar />
   <p>Medecin</p>


</div>
=======
<div id="contenu">
    <Router>
        <div id="top">
            <Entete />
        </div>
        <div id="bar">
                <Navbar />
        </div>
        <div id="main1">
                <switch>
                    <Route  path="/Medecin/Profile"  exact userId = {this.props.user} component={MesDonnees} />

                    <Route path="/Message" exact component={Message} />

                    <Route path="/MesPatient" exact component={MesPatient} />
                
                    <Route path="/Agenda" exact component={Agenda} />
                </switch>
        </div>
        <div id="bottom">
            &copy;{new Date().getFullYear()} TakeCare Web App - All rights reserved
        </div>
    </Router>
    </div>
>>>>>>> f67313fc34587786cc01f99abe77cdf067f0f425
)
    }
}

export default MedSpace;