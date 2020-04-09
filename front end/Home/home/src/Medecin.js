import React from 'react';

import './App.css';
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


function App() {
return (
<div>
<Entete />  
<Router>
<div className="App3">
<Navbar />

<Route exact path="/">
<MesDonnees />
</Route>*

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

export default App;