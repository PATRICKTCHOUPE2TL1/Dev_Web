import React , {Component} from 'react';
import Agenda from './content2/Agenda'
import Message from './content2/Message'
import MesDonnees from './content2/MesDonnees'
import Entete from './components3/header'

import
{
BrowserRouter as Router,
Route,
} from "react-router-dom";
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
 
<div>
   <Entete />
   <Navbar />
<Router>
<div className="App3">


<Route  path="/Medecin/Profile" userId = {this.props.user}>
<MesDonnees userId ={this.state.id} />
</Route>

<Route path="/Message">
<Message />
</Route>

<Route path="/MesPatient">
<MesPatient />
</Route>
<Route path="/Agenda">
<Agenda/>
</Route>


</div>
</Router>}
</div>
)
    }
}

export default MedSpace;