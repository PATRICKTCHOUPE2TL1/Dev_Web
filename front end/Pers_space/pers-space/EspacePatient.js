import React from 'react';

import './App.css';
import Discussion from './content/Discussion'
import EspaceMedecin from './content/EspaceMedecin'
import MesDonnees from './content/MesDonnees'
import Entete from './components/header'
import Main from './Main'
import
{
BrowserRouter as Router,
Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import MonMedecin from './content/MonMedecin';


function App() {
return (
<div>
<Entete />  
<Router>
<div className="App">
<Navbar />

<Route exact path="/">
<EspaceMedecin />
</Route>*

<Route exact path="/mesdonnées">
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

export default App;
