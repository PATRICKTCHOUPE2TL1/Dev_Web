import React, { Component } from 'react';

import Discussion from './content/Discussion'
import EspaceMedecin from './content/EspaceMedecin'
import MesDonnees from './content/MesDonnees'
import Entete from './componnents2/header'
import
{
BrowserRouter as Router,
Route,
} from "react-router-dom";
import Navbar from './componnents2/Navbar';
import MonMedecin from './content/MonMedecin';
import './PersonalSpace.css';


class EspacePatient extends Component {
    constructor(props){
        super(props)
        this.state = {
            id : props.userId
        }
    }
    render(){
return (
<div>

<Entete />  
<Router>
<div className="App2">
<Navbar />

<Route exact path="/">
<EspaceMedecin />
</Route>

<Route path="/mesdonnées" userId = {this.props.user}>

<MesDonnees userId ={this.state.id}/>
</Route>

<Route path="/Discussion">
<Discussion />
</Route>
<Route path="/monmedecin">
<MonMedecin/>
</Route>


</div>
</Router>}
</div>
)
}
}
export default EspacePatient;