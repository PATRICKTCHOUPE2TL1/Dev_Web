import React , { Component } from 'react'
import {withRouter} from 'react-router-dom'
import './login.css'
import ava from "../../image/ava.svg"
import infis from "../../image/infis.svg"
import { Link,Redirect } from "react-router-dom"
import axios from 'axios'
import EspacePatient from './../../EspacePatient'
import io from "socket.io-client";
import ls from 'local-storage'



class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            email : ' ',
            password : ' '
        };
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this. handlePasswordChange.bind(this);
        this.handleOnsubit = this.handleOnsubit.bind(this)

    }
    handleUserNameChange = event => {
        this.setState({
            email : event.target.value

        })
    };
    handlePasswordChange = event =>{
        this.setState({
            password : event.target.value
        })
    };
    handleOnsubit = event =>{
        event.preventDefault();
        
       
        axios.defaults.withCredentials = true

        axios
             .post('http://127.0.0.1:5000/login', this.state,)
             .then(reponse =>{
                 ls.set('userId', reponse.data[1])
                 console.log(reponse)
                 console.log(reponse.data)
                if(reponse.data[0]==="patient"){

                    this.props.history.push('/Patient');
                  }else if(reponse.data[0]==="medecin"){

                    this.props.history.push('/Medecin');

                  }else {

                      console.log(reponse.data[0][0])
                      console.log("something went wrong")
                      document.getElementById("error").innerHTML ="<p>une erreur c'est produit</p>"
                  }
                 
             })
             .catch(erreur =>{
                 console.log(erreur)
             })
        
    };

    render(){
        return(
            <div className="containe">
            <div className="img">
                <img src={infis} alt="infirmiéres"></img>
            </div>
            <div className="login-container">
                    <form onSubmit={this.handleOnsubit}>
                        <img className="avatar" src={ava} alt="avatar"></img>
                        <h2>Mon espace sante</h2>
                        <div className="input-div one focus">
                            <div>
                                <input className="email" placeholder= "Adresse email"  type="text" name = "email" required  onChange={this.handleUserNameChange}></input>
                            </div>
                        </div>
                        <div className="input-div two foc">
                            <div>
                                <input className="mdp" type="password" placeholder= "Mot de passe"required onChange={this.handlePasswordChange}></input>
                            </div>
                        </div>
                        <Link to ='/'><a href="#" className="lglk">Mot de passe oublié ?</a></Link><br></br>
                        <Link to ='/signin'><a href="#" className="lglk">Créer un compte ?</a></Link><br></br>

                        <input type="submit" className="login" value="Se connecter"></input>
                        <div id ="error"></div>

                    </form>
            </div>
        </div>

        )
    }
}
export default withRouter(Login)