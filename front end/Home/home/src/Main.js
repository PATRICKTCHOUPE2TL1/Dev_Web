import React from 'react';
import Discussion from './content/Discussion'
import EspaceMedecin from './content/EspaceMedecin'
import MesDonnees from './content/MesDonnees'
import MonMedecin from './content/MonMedecin';

import { Switch, Route } from 'react-router-dom'

import Navbar from './componnents2/Navbar';


const Main = () =>{
    return (
        <main>
            <Navbar />
            <Switch>
            <Route exact path='/' component={EspaceMedecin}/>
            <Route path = '/mesdonnées' component = {MesDonnees}/>
            <Route path = '/discussion' component ={ Discussion}/>
            <Route path = '/monmedecin' component ={MonMedecin} />
            


            </Switch>
        </main>
    )
}

export default Main