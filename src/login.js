import React , { Component } from 'react'
import './login.css'
import Avatar2 from "../image/Avatar2.png"



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
        console.log(this.state.email);
        event.preventDefault();
    };

    render(){
        return(

            <form className= "formLog" onSubmit={this.handleOnsubit}>
                    <img src ={Avatar2} alt ="loginimage" className="avatar"/>


                <div>
                <legend className="connecter">Se connecter</legend>
                </div>
                <div >

                <input type ="text" name = "email" placeholder= "Email Address"   required
                       onChange={this.handleUserNameChange} className="email"/>
                </div>
                <div>

                    <input type ="password" placeholder= "Password" required  className="mtp"
                    onChange={this.handlePasswordChange}/>
                </div>
                <span><hr className ="ligne2"></hr></span>
                <a href="https://www.google.com" className="hint"><b> mot de passe oublier ?</b></a>

                <div>
                    <input type = "submit" className="login2"  value ="Connecter"/>
                </div>
    
                <span className="signin">

                </span>

            </form>

        )
    }
}
export default Login