import React from 'react';
import './App.css';
import Discussion from './content/Discussion'
import EspaceMedecin from './content/EspaceMedecin'
import MesDonnees from './content/MesDonnees'
import
{
BrowserRouter as Router,
Route,
} from "react-router-dom";
import Navbar from './components/Navbar';


function App() {
return (
<Router>
<div className="App">
<Navbar />

<Route exact path="/">
<Discussion />
</Route>*

<Route path="/Discussion">
<MesDonnees />
</Route>

<Route path="/EspaceMedecin">
<EspaceMedecin/>
</Route>


</div>
</Router>
)
}

export default App;