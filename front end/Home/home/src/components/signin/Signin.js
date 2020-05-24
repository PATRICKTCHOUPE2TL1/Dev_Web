import React,{Component} from 'react'
import './SignIn.css'
import Avatar2 from "../../image/Avatar2.png"
import { Link, Redirect } from "react-router-dom"
import axios from 'axios'
import {FaRegIdCard} from "react-icons/fa";
import infis from "../../image/infis.svg"
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
            this.getId('msg').style.display = 'block' 
            this.getId('msg').innerText  += "Adresse e-mail non valide\r"
            this.getId('email').focus()

        }
        if(mdp != "" && mdp == confmdp) {
            console.log("0")

            if(mdp < 6) {
                this.getId('msg').style.display = 'block' 
                this.getId('msg').innerText += "mot de passe doit contenir au moins 6 character\r"

              return false
              
            }
             let re = /[0-9]/;
            if(!re.test(mdp)) {
                this.getId('msg').style.display = 'block' 
                this.getId('msg').innerText += "mot de passe doit contenir au moins un chiffre\r"
              return false
            }
            re = /[a-z]/;
            if(!re.test(mdp)) {
                this.getId('msg').style.display = 'block' 
                this.getId('msg').innerText  += "mot de passe doit contenir au moins une lettre en miniscule\r"

              return false;
            }
            re = /[A-Z]/;
            if(!re.test(mdp)) {
                this.getId('msg').style.display = 'block' 
                this.getId('msg').innerText  += "mot de passe doit contenir au moins une lettre en majuscule \r"
              return false;
            }
          } else {
            this.getId('msg').innerText  += "les mots de passe doivent etre identique\r"

            return false;
          }

    }
   
    handleSubmit = event =>{ 
 
        event.preventDefault();
      if(this.chkPassword() == false){
          /* Action si pas de mail valide ou mot de passe non correspondants*/
            this.getId('password').focus()
        }else{
            console.log(true)
            axios
             .post('http://127.0.0.1:5000/postdata', this.state)
             .then(reponse =>{
                 console.log(reponse)
             })
             .catch(erreur =>{
                 console.log(erreur)
             })
    }
}
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
                     <div className="img1">
                        <img src={infis} alt="infirmiéres"></img>
                    </div>
             <div className="signup-container">
                <form id="form1" onSubmit={this.handleSubmit} >
                    <FaRegIdCard className="icon" size='3em' color='rgb(243,33,86)' />
                        <h2>Créer votre compte</h2>
                    <div id="ident">
                        <div className="form-group row">
                                <label for="nom1" className="col-sm-2 col-form-label">Nom*</label>
                            <div className="col-sm-7">
                                <input type ="text" id = 'nom1'  required   onChange={this.handleNomChange} className="form-control"/>
                            </div> 
                        </div>
                        <div className="form-group row">
                                <label for="prenom1" className="col-sm-2 col-form-label">Prénom*</label>
                            <div className="col-sm-7">
                                <input type ="text" id ='prenom1' required   onChange={this.handlePrenomChange} className="form-control"/>
                            </div>
                        </div>
                    </div>
                        <div className="form-group row">
                                <label for="email" className="col-sm-2 col-form-label">Email*</label>
                            <div className="col-sm-7">
                                <input type ="text" id='email' required  onChange={this.handleEmailChange} className="form-control"/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-5">
                                <label for="email">Mot de passe*</label>
                                <input type ="password" id="password" required onChange={this.handlePasswordChange} className="form-control"/>
                            </div>
                            <div className="form-group col-md-7">
                                <label for="email">Confirmer mot de passe*</label>
                                <input type ="password" id="confpassword"  required className="form-control"/>
                            </div>
                        </div>
                        <span>Vous êtes : </span>
                    <div className="sts">
                        <div className="form-check form-check-inline" >
                        <label for="medecin2" className="form-check-label">Medecin</label>
                        <input type="radio" id="medecin2" className="form-check-input" name="status" value="medecin" onChange={this.handleStatusMedecin}/>
                        </div>
                        <div className="form-check form-check-inline" >
                        <label for="patient2" className="form-check-label">Patient</label>
                        <input type="radio" id="patient2" className="form-check-input" name="status" value="patient"  onChange = {this.handleStatusPatient}/>
                        </div>
                    </div>
                    <div className="valider1" >
                        <input type="submit"  id="mySubmit" value ="Valider" className ="btn btn-success"/>
                    </div>
                    <hr className="ligne"></hr>  
                    <div>
                        <textarea id ="msg" style={{ display: 'none' }} className="form-control" >
                        </textarea>
                    </div>
              </form>
             </div>
          </div>
        )

    }
}
export default SignIn
