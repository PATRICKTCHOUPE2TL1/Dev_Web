import React , {Component} from 'react';
import axios from 'axios'


import
{
BrowserRouter as Router,
Route,withRouter
} from "react-router-dom";
import NavbarAdmin from './componentAdmin/Navbar';
import EnteteAdmin from './componentAdmin/header'


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
   <EnteteAdmin />
   <NavbarAdmin />
   <p>Medecin</p>
</div>
)
    }
}

export default withRouter(Admin);