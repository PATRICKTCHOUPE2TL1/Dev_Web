import React , {Component} from 'react';
import Entete from './components3/header'
import axios from 'axios'

import
{
BrowserRouter as Router,
Route,
} from "react-router-dom";
import Navbar from './components3/Navbar';
import './Medecin.css'


class MedSpace extends Component {
    constructor(props){
        super(props)
        this.state ={
            id : props.userId

        }
    }
    componentDidMount = () =>{
        axios.defaults.withCredentials = true

        axios
          .post('http://127.0.0.1:5000/profil', this.state)
          .then(reponse => {
            if (reponse.data[1] === "patient") {
                this.props.history.push('/login');
    
            } else {
              this.setState({
                
              })
             
            }
    
          })
          .catch(erreur => {
            console.log(erreur)
          })
    }
    render(){
return (
 
<div>
    <div id="top">
     <Entete />
   </div>
   <div id="bar">
    <Navbar />
   </div>
   <div id="main1">
    <p className="heading">Bienvenue dans votre espace medecin</p>
   </div>
   <div className="text-muted" id="bottom">
            &copy;{new Date().getFullYear()} TakeCare Web App - All rights reserved
    </div>
</div>
)
    }
}

export default MedSpace;