import React, { Component } from 'react';
import EntetePat from './componnents2/header'
import NavBarPat from './componnents2/Navbar';
import './PersonalSpace.css';
import { withRouter} from "react-router-dom"
import axios from 'axios'


class EspacePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.userId
        }
    }
    componentDidMount = () =>{
        axios.defaults.withCredentials = true

        axios
          .post('http://127.0.0.1:5000/profil', this.state)
          .then(reponse => {
            if (reponse.data[1] === "medecin") {
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
    render() {
        return (
            <div>
                <div id="top1">
                    <EntetePat />
                </div>
                <div id="bar1">
                    <NavBarPat />
                </div>
                <div id="main2">
                    <p className="heading">Bienvenue dans votre espace patient</p>
                </div>
                <div className="text-muted" id="bottom1">
                        &copy;{new Date().getFullYear()} TakeCare Web App - All rights reserved
                </div>
            </div>
        )
    }
}
export default  withRouter(EspacePatient);