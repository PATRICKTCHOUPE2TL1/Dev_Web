import React , {Component} from 'react';
import Entete from './components3/header';
import axios from 'axios'


import
{
BrowserRouter as Router,
Route,withRouter
} from "react-router-dom";
import Navbar from './components3/Navbar';
//import './Medecin.css'


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
            console.log(reponse)
            if (reponse.data[1] === "patient") {
                console.log("nono")
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
   <Entete />
   <Navbar />
   <p>Medecin</p>


</div>
)
    }
}

export default withRouter(MedSpace);