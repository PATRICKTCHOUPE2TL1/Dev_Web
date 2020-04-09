import React from 'react';
import Agenda from './content2/Agenda'
import Message from './content2/Message'
import MesDonnees from './content2/MesDonnees'
import MesPatient from './content2/MesPatient';

import { Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar';


const Main = () =>{
    return (
        <main>
            <Navbar />
            <Switch>
            <Route exact path='/' component={EspaceMedecin}/>
            <Route path = '/mesdonnéesMed' component = {MesDonnees}/>
            <Route path = '/Agenda' component ={ Agenda}/>
            <Route path = '/Message' component ={Message} />
            <Route path = '/MesPatient' component ={MesPatient} />
            


            </Switch>
        </main>
    )
}

export default Main