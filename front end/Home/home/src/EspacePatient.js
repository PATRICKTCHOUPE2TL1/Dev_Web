import React from 'react';

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


function EspacePatient() {
return (
<div>
<Entete />  
<Router>
<div className="App2">
<Navbar />

<Route exact path="/">
<EspaceMedecin />
</Route>*

<Route path="/mesdonnées">
<MesDonnees />
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

export default EspacePatient;