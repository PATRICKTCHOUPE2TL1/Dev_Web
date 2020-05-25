import React , {Component} from 'react';
import axios from 'axios'
import
{
BrowserRouter as Router,
Route,withRouter
} from "react-router-dom";
import NavbarAdmin from './componentAdmin/Navbar';
import EnteteAdmin from './componentAdmin/header'
import './Admin.css'


class Admin extends Component {
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
  <div id="top2">
    <EnteteAdmin />
   </div>
   <div id="bar2">
    <NavbarAdmin />
   </div>
   <div id="main3">
    <p>Bienvenue dans votre espace administrateur</p>
   </div>
   <div className="text-muted" id="bottom2">
            &copy;{new Date().getFullYear()} TakeCare Web App - All rights reserved
    </div>
</div>
)
    }
}

export default withRouter(Admin);