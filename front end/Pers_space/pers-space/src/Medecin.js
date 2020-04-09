import React from 'react';

import './Medecin.css';
import Agenda from './content2/Agenda'
import MesPatient from './content2/MesPatient'
import MesDonnees from './content2/MesDonnees'
import Entete from './components3/header'
//import Main from './Main'
import
{
BrowserRouter as Router,
Route,
} from "react-router-dom";
import Navbar from './components2/Navbar';
import Message from './content2/Message';


function App() {
return (
<div>
<Entete />  
<Router>
<div className="App3">
<Navbar />

<Route exact path="/Agenda">
<Agenda/>
</Route>*

<Route path="/">
<MesDonnees />
</Route>

<Route path="/Message">
<Message />
</Route>
<Route path="/MesPatient">
<MesPatient/>
</Route>


</div>
</Router>}
</div>
)
}

export default App;