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
            console.log(reponse)
            if (reponse.data[1] === "medecin") {
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

    render() {
        return (
            <div>

                <EntetePat />
                
                    <div className="App2">
                        <NavBarPat />
                         <p>Espace Patient</p>

                    </div>
            </div>
        )
    }
}
export default  withRouter(EspacePatient);