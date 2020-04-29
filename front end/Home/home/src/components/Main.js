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
          isLogIn : true,
          id : " ",
          statut: " "
        }
        this.profil = this.profil.bind(this)
    }
    profil = () => {
      axios.defaults.withCredentials = true

      axios
          .post('http://127.0.0.1:5000/profil', this.state)
          .then(reponse =>{
              console.log(reponse)
             if(reponse.data==="notIn"){
              this.setState({
                  isLogIn : false,
              })
              
               }else{
                  this.setState({
                      isLogIn : true,
                      id:reponse.data[0],
                      status:reponse.data[1]
                  })
                  console.log("i am here")
                  console.log(reponse)
                  console.log(this.state.id)
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
       {this.state.isLogIn ? ( <Route exact path = '/EspacePatient' user ="hello" render ={(props) => <EspacePatient userId ={this.state.id} />} />):(<Redirect to ='/Login' />)}
          {this.state.isLogIn ? (<Route exact path = '/Medecin'    render ={(props) => <Medecin userId ={this.state.id} />} />) : (<Redirect to ='/Login' />)}
          
          
        </Switch>
      </main>
       )
   }
}

export default Main
 