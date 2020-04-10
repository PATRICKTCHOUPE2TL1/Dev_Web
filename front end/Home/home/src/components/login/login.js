import React , { Component } from 'react'
import './login.css'
import Avatar2 from "../../image/Avatar2.png"
import { Link,Redirect } from "react-router-dom"
import axios from 'axios'

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
        axios
             .post('http://127.0.0.1:5000/login', this.state)
             .then(reponse =>{
                 console.log(reponse)
                if(reponse.data=="patient"){
                    this.props.history.push('/EspacePatient');
                  }else if(reponse.data=="medecin"){
                    this.props.history.push('/Medecin');

                  }else {
                      console.log(reponse)
                  }
                 
             })
             .catch(erreur =>{
                 console.log(erreur)
             })
        
    };

    render(){
        return(

            <form className= "formLog" onSubmit={this.handleOnsubit}>
                    <img src ={Avatar2} alt ="loginimage" className="avatar"/>


                <div>
                <legend className="connecter">Se connecter</legend>
                </div>
                <div >

                <input type ="text2" name = "email" placeholder= "Adresse Email"   required
                       onChange={this.handleUserNameChange} className="email"/>
                </div>
                <div>

                    <input type ="password" placeholder= "Password" required  className="mtp"
                    onChange={this.handlePasswordChange}/>
                </div>
                <span><hr className ="ligne2"></hr></span>
                <Link to ='/'><a href="#"><span  className="hint"> mot de passe oublié ?</span></a></Link>
                <Link to ='/signin'><span className='test'>creer un compte </span></Link>

                <div>
                    <input type = "submit" className="login2"  id="soumettre" value ="Connecter"/>
                </div>
    
                <span className="signin">

                </span>

            </form>

        )
    }
}
export default Login