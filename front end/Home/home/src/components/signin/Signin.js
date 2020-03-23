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
			tel : ' ',
			genre : ' ',
			RRPS : ' ',
			poids : ' ',
			localisation : ' ',
			gp : ' ',
			taille : ' ',
			specialite : ' ',
           
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNomChange = this.handleNomChange.bind(this);
        this.handlePrenomChange = this.handlePrenomChange.bind(this);
        this.handleEmailChange =this.handleEmailChange.bind(this);
        this.handlePasswordChange =this.handlePasswordChange.bind(this);
        this.handleDateNaiss = this.handleDateNaiss.bind(this);
        this.handleSexeChange =this.handleSexeChange.bind(this);
		this.handleTelChange = this.handleTelChange.bind(this);
		this.handleDateNaissChange = this.handleDateNaissChange.bind(this);
		this.handleGenre = this.handleGenre.bind(this);
		this.handlePoidsChange = this.handlePoidsChange.bind(this);
		this.handleLocalisationChange = this.handleLocalisationChange.bind(this);
		this.handleRRPSChange = this.handleRRPSChange.bind(this);
		this.handleSpecialiteChange = this.handleSpecialiteChange.bind(this);
		this.handleGPChange = this.handleGPChange.bind(this);
		this.handleTailleChange = this.handleTailleChange.bind(this);
       
    }
    handleNomChange = event =>{
        this.setState({
            nom : event.target.value
        })

    };
	handleGenre = event =>{
        this.setState({
            genre : event.target.value
        })
		var elem = document.getElementById("changement");
		elem.innerHTML = '';
		if(this.state.genre == "medecin"){
			elem.innerHTML += "<input type ='text' id='specialite' placeholder= 'specialite' onChange={this.handleSpecialiteChange} className ='specialite'/>";
			elem.innerHTML += "<input type ='text' id='localisation' placeholder= 'localisation' onChange={this.handleLocalisationChange} className ='localisation'/>";
			elem.innerHTML += "<input type ='text' id='RRPS' placeholder= 'RRPS' onChange={this.handleRRPSChange} className ='RRPS'/>";
		}else if(this.state.genre == "patient"){
				elem.innerHTML += "<input type ='text' id='poids' placeholder= 'poids' onChange={this.handlePoidsChange} className ='poids'/>";
				elem.innerHTML += "<input type ='text' id='gp' placeholder= 'groupe sanguin' onChange={this.handleGPChange} className ='gp'/>";
				elem.innerHTML += "<input type ='number' id='taille' placeholder= 'taille' onChange={this.handleTailleChange} className ='taille'/>";
				elem.innerHTML += "<input type ='text' id='localisation' placeholder= 'localisation' onChange={this.handleLocalisationChange} className ='localisation'/>";
			
		}

    };
	handleTelChange = event =>{
        this.setState({
            tel : event.target.value
        })

    };
	handleGPChange = event =>{
        this.setState({
            gp : event.target.value
        })

    };
	handleTailleChange = event =>{
        this.setState({
            taille : event.target.value
        })

    };
	handleSpecialiteChange = event =>{
        this.setState({
            specialite : event.target.value
        })

    };
	handlePoidsChange = event =>{
        this.setState({
            poids : event.target.value
        })

    };
	handleLocalisationChange = event =>{
        this.setState({
            localisation : event.target.value
        })

    };
	handleRRPSChange = event =>{
        this.setState({
            RRPS : event.target.value
        })

    };
	handleDateNaissChange = event =>{
        this.setState({
            dateNaiss : event.target.value
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

  //"proxy" : "http://127.0.0.1:5000",
   
    handleSubmit = event =>{ 
        event.preventDefault();
		console.log(JSON.stringify(this.state));
		fetch('http://127.0.0.1:5000/postdata', {
			mode : 'cors',
			method: "POST",
			body : JSON.stringify(this.state),
			header : {
				/*
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin' : '*'
				*/
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin' : '*',
				"Access-Control-Allow-Credentials" : true 
			}
		}).then(response => response.json()).then(data=> console.log(data));
        /*
        axios
             .post('http://localhost:5000/postdata', this.state)
             .then(reponse =>{
                 console.log(reponse)
                 console.log(reponse.data)
             })
             .catch(erreur =>{
                 console.log(erreur)
             })*/
        
      
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
               
                <input type ="text" id = 'nom' placeholder= "Nom *"   onChange={this.handleNomChange} className="nom"/>
          
                <input type ="text" id ='prenom' placeholder= "Prenom * "   onChange={this.handlePrenomChange} className="prenom"/>
            </div>
            <div>
               
                <input type ="text" id='email' placeholder= "Adresse Email *"   onChange={this.handleEmailChange} className="email2"/>
            </div>
            <div>
                
                <input type ="password" id="password" placeholder= "Mot de passe *" onChange={this.handlePasswordChange} className ="password"/>
            
                <input type ="password" id="confpassword" placeholder= "Confirmer mot de passe *"  className="confmtp"/>
            </div>
			<div>
				<input type ="text" id="tel" placeholder= "telephone" onChange={this.handleTelChange} className ="tel"/>
			</div>
			<div>
				<input type ="date" id="dateNaiss" onChange={this.handleDateNaissChange} className ="dateNaiss"/>
			</div>
			<div>
			<input type="button" id="genre1" name="genre1" value="medecin" onClick={this.handleGenre}/>
			<label for="genre1"> medecin</label>
			<input type="button" id="genre2" name="genre2" value="patient" onClick={this.handleGenre}/>
			<label for="genre2"> patient</label>
			</div>
			<div id="changement">
			
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
