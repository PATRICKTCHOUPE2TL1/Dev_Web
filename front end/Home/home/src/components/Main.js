import React ,  {Component} from "react"
import Signin from "./signin/Signin"
import Medecin from "../Medecin"

import EspacePatient from "../EspacePatient"
import Accueil from "./homepage/Accueil"
import Login from "./login/login"


import { Switch, Route } from 'react-router-dom'
//component necessary for routing
   

class Main extends Component {
    constructor(props){
        super(props)
    }
   render(){
       return (
           
        <main>
          
        <Switch>
          <Route exact path='/' component={Accueil}/>
          <Route path = '/EspacePatient' component = {EspacePatient}/>
          <Route path = '/Medecin' component = {Medecin}/>
          <Route exact path = '/signin' component={Signin}/>
          <Route exact path = '/Login' component = {Login}/>
          
        </Switch>
      </main>
       )
   }
}

export default Main
 