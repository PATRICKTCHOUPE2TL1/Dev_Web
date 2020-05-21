import React , {Component} from 'react';
import Agenda from './content2/Agenda'
import Message from './content2/Message'
import MesDonnees from './content2/MesDonnees'
import Entete from './components3/header'
import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";
import Navbar from './components3/Navbar';
import MesPatient from './content2/MesPatient';
import './Medecin.css'


class MedSpace extends Component {
    constructor(props){
        super(props)
        this.state ={
            id : props.userId

        }
    }
    render(){
return (
 
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
)
    }
}

export default MedSpace;