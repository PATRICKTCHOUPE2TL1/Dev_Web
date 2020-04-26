import React,{Component} from 'react'
import './SignIn.css'
import av2 from "../../image/av2.svg"
import infis from "../../image/infis.svg"
import { Link, Redirect } from "react-router-dom"
import axios from 'axios'
import EspacePatient from "../../EspacePatient"

class SignIn extends Component {

    constructor(props){

        super(props);
        this.state =  {
            nom : ' ',
            prenom : ' ',
            email : ' ',
            motDepasse :' ',
            status: ' '
    
           
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNomChange = this.handleNomChange.bind(this);
        this.handlePrenomChange = this.handlePrenomChange.bind(this);
        this.handleEmailChange =this.handleEmailChange.bind(this);
        this.handlePasswordChange =this.handlePasswordChange.bind(this);
        this.handleStatusMedecin = this.handleStatusMedecin.bind(this);
        this.handleStatusPatient = this.handleStatusPatient.bind(this)
        this.chkPassword = this.chkPassword.bind(this)
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
            motDepasse: event.target.value
        })
    };
    handleStatusPatient = event =>{
        this.setState({
            status: event.target.value
        })
    };handleStatusMedecin= event =>{
        this.setState({
            status : event.target.value
        })
    };
    
    chkPassword = () =>{

        let eml = this.getId('email').value
        let mdp = this.getId('password').value
        let confmdp = this.getId('confpassword').value
        let reg = /@/;
        let reg2 =/.com/;
        if((!reg.test(eml)||(!reg2.test(eml)))){

            this.getId('msg').innerText  = "Address Email non valide\r"
            this.getId('email').focus()

        }
        if(mdp != "" && mdp == confmdp) {
            console.log("0")

            if(mdp < 6) {
                this.getId('msg').innerText += "mot de passe dois contenir au moins 6 character\r"
                console.log("1")

              return false
              
            }
             let re = /[0-9]/;
            if(!re.test(mdp)) {
                this.getId('msg').innerText += "mot de passe dois contenir au moins un chiffre\r"

                console.log("2")

              return false
            }
            re = /[a-z]/;
            if(!re.test(mdp)) {
                this.getId('msg').innerText  += "mot de passe dois contenir au moins une lettre en miniscule\r"

                console.log("3")

              return false;
            }
            re = /[A-Z]/;
            if(!re.test(mdp)) {
                this.getId('msg').innerText  += "mot de passe dois contenir au moins une lettre en majiscule \r"

                console.log("4")

              return false;
            }
          } else {
            this.getId('msg').innerText  += "les mots de passe doivent etre identique\r"

            console.log("5")

            return false;
          }

    }
   
    handleSubmit = event =>{ 
 
        event.preventDefault();
      /*  if(this.chkPassword() == false){
            
            this.getId('msg').style.display = "block";
            
            this.getId('password').focus()
        }else{*/
            console.log(true)
            axios
             .post('http://127.0.0.1:5000/postdata', this.state)
             .then(reponse =>{
                 console.log(reponse)
             })
             .catch(erreur =>{
                 console.log(erreur)
             })
           // }
        
      
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
            <div className="containers">
                     <div className="img">
                        <img src={infis} alt="infirmiéres"></img>
                    </div>
             <div className="signup-container">
                <form onSubmit={this.handleSubmit} >
                    <img src ={av2} alt ="loginimage" className="icon"/>
                        <h2>Créer votre compte</h2>
                    <div id="ident">
                        <input type ="text" id = 'nom' placeholder= "Nom *" required   onChange={this.handleNomChange} className="nom"/>
                        <input type ="text" id ='prenom' placeholder= "Prenom * " required   onChange={this.handlePrenomChange} className="prenom"/>
                    </div>
                    <div>
                        <input type ="text" id='email' placeholder= "Adresse Email *" required  onChange={this.handleEmailChange} className="email2"/>
                    </div>
                    <div>
                        <input type ="password" id="password" placeholder= "Mot de passe *" required onChange={this.handlePasswordChange} className ="password"/>
                        <input type ="password" id="confpassword" placeholder= "Confirmer mot de passe *" required className="confmtp"/>
                    </div>
                    <div className="sts">
                        <span className="status">Vous etes :</span>
                        <label  id = "medecin" for="medecin">Medecin</label>
                        <input type="radio" id="medecin2" name="status" value="medecin" onChange={this.handleStatusMedecin}/>
                        <label  id = "patient" for="patient">Patient</label>
                        <input type="radio" id="patient2" name="status" value="patient"  onChange = {this.handleStatusPatient}/>
                    </div>
                    
                    <div className="valider1" >
                        <input type="submit"  id="mySubmit" value ="Valider" className="creer"/>
                    </div>
                    <hr className="ligne"></hr>  
                    <div>
                        <textarea id ="msg" className="signlog" >
                        </textarea>
                    </div>
              </form>
             </div>
          </div>
        )

    }
}
export default SignIn
