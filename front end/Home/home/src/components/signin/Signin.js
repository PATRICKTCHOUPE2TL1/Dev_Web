import React,{Component} from 'react'
import './SignIn.css'
import Avatar2 from "../../image/Avatar2.png"
import { Link } from "react-router-dom"
import axios from 'axios'



class SignIn extends Component {

    constructor(props){

        super(props);
        this.state =  {
            nom : ' ',
            prenom : ' ',
            email : ' ',
            motDepasse :' ',
            dateNaiss : ' ',
            sexe : ' ',
           
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNomChange = this.handleNomChange.bind(this);
        this.handlePrenomChange = this.handlePrenomChange.bind(this);
        this.handleEmailChange =this.handleEmailChange.bind(this);
        this.handlePasswordChange =this.handlePasswordChange.bind(this);
        this.handleDateNaiss = this.handleDateNaiss.bind(this);
        this.handleSexeChange =this.handleSexeChange.bind(this);
       
    }
    handleNomChange = event =>{
        this.setState({
            nom : event.target.value
        })

    };
    handlePrenomChange = event =>{
        this.setState({
            prenom : event.target.value
        })
    };
    handleEmailChange = event =>{
        this.setState({
            email : event.target.value
        })
    };
    handlePasswordChange = event =>{
        this.setState({
            password: event.target.value
        })
    };
    handleDateNaiss = event =>{
        this.setState({
            dateNaiss : event.target.value
        })
    };
   
    handleSexeChange = event =>{
        this.setState({
            sexe: event.target.value
        })
    };

  
   
    handleSubmit = event =>{ 
        event.preventDefault();
      
        axios
             .post('http://127.0.0.1:5000/postdata', this.state)
             .then(reponse =>{
                 console.log(reponse)
             })
             .catch(erreur =>{
                 console.log(erreur)
             })
        
      
    };
    getId = id=>{
        return document.getElementById(id);
    }
    handleCheckBox = () =>{
        {this.getId("contrat").checked ? this.getId("mySubmit").disabled = false: this.getId("mySubmit").disabled = true}
    }
    ConfirmPasswd = () =>{
       {this.getId("password").value===this.getId("confpassword").value ? console.log(true): console.log(false)} 
    }



    render() {
        
        return (
            <main>
            
            <form  className="formSign" onSubmit={this.handleSubmit} >
                <fieldset>
            <img src ={Avatar2} alt ="loginimage" className="avatar"/>
              
            <div>
                <legend className="signup">Créer un Compte</legend>
            </div>
            <div id="ident">
               
                <input type ="text" id = 'nom' placeholder= "Nom *" required  onChange={this.handleNomChange} className="nom"/>
          
                <input type ="text" id ='prenom' placeholder= "Prenom * " required  onChange={this.handlePrenomChange} className="prenom"/>
            </div>
            <div>
               
                <input type ="text" id='email' placeholder= "Adresse Email *" required  onChange={this.handleEmailChange} className="email2"/>
            </div>
            <div>
                
                <input type ="password" id="password" placeholder= "Mot de passe *" required onChange={this.handlePasswordChange} className ="password"/>
            
                <input type ="password" id="confpassword" placeholder= "Confirmer mot de passe *" required className="confmtp"/>
            </div>
            <hr className="ligne"></hr>
            
           <div className = "contrat">
               <span className="texte" > J'accepte les <Link to = '/Login'><a href = "http://www.google.com">conditions d'utilisations</a></Link></span> <input type ="checkbox" id="contrat" value="agree" onClick ={this.handleCheckBox}></input>
               
           </div>
            

            <div className="valider1" >
                <input type="submit"  id="mySubmit" value ="Valider" className="creer" disabled/>
            </div>
            </fieldset>
             </form>
             </main>
        )

    }
}
export default SignIn
