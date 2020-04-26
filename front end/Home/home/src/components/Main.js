import React ,  {Component} from "react"
import Signin from "./signin/Signin"
import Medecin from "../Medecin"

import EspacePatient from "../EspacePatient"
import Accueil from "./homepage/Accueil"
import Login from "./login/login"
import axios from 'axios'



import { Switch, Route, Redirect } from 'react-router-dom'
//component necessary for routing
   

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
          isLogIn : true
        }
        this.profil = this.profil.bind(this)
    }
    profil = () => {
      axios.defaults.withCredentials = true

      axios
          .post('http://127.0.0.1:5000/profil', this.state)
          .then(reponse =>{
              console.log(reponse)
             if(reponse.data==="alreadyIn"){
              this.setState({
                  isLogIn : true,
              })
              
               }else if(reponse.data==="notIn"){
                  this.setState({
                      isLogIn : false,
                  })
     
                  
               }else {
                   console.log(reponse)
               }
              
          })
          .catch(erreur =>{
              console.log(erreur)
          })
  }
  componentDidMount(){
    {this.profil()}
  }
   render(){
       return (
           
        <main>
          
        <Switch>
          <Route exact path='/' component={Accueil}/>
          <Route exact path = '/signin' component={Signin}/>
          <Route exact path = '/Login' component = {Login}/>
          {this.state.isLogIn ? ( <Route exact path = '/EspacePatient' component = {EspacePatient}/>):(<Redirect to ='/Login' />)}
          {this.state.isLogIn ? (<Route exact path = '/Medecin' component = {Medecin}/>) : (<Redirect to ='/Login' />)}
          
          
        </Switch>
      </main>
       )
   }
}

export default Main
 