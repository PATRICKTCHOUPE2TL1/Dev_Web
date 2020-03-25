import React, {Component, bcrypt} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class  MesDonnees extends Component {
    constructor(props){
        super(props)
        this.state ={
            Nom : "Cartma",
            Prenom : " ",
            DateNaiss: " ",
            Address : " ",
            Sprecialisation : " ",
            email : " ",
            Civilite : " ",
            Specialite : " ",
            carteId :" ",
			numTel : " ",
			modif : 0,
			poids : 0,
			gp : '',
			localisation : '',
			taille : '',
			pw : '',

           

        }
        
        this.handleNomChange = this.handleNomChange.bind(this);
        this.handlePrenomChange = this.handlePrenomChange.bind(this);
        this.handleDateNaissChange = this.handleDateNaissChange.bind(this);
        this.handleEmailChange =this.handleEmailChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlePoids = this.handlePoids.bind(this);
		this.handlelocalisation = this.handlelocalisation.bind(this);
		this.handletaille = this.handletaille.bind(this);
		this.handlegp = this.handlegp.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		
       
}

componentWillMount() {
this.util();
  }
  
  
  util = ()=>{
		var requete = 'http://127.0.0.1:5000/utilisateur/'+ this.state.Nom;
		fetch(requete, {
						mode : 'cors',
						method: "POST",
						//body : JSON.stringify(hash),
						header : {
							'Accept': 'application/json',
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin' : '*',
							"Access-Control-Allow-Credentials" : true 
						}
					}).then(response => response.json()).then(data=> {
						console.log(data);
						console.log(new Date(data[0][10]).toLocaleString());
						this.setState({
							Prenom : data[0][7],
							DateNaiss : data[0][10],
							Address : data[0][3],
							numTel : data[0][9],
							email : data[0][8],
							gp : data[0][2],
							poids : data[0][1],
							taille : data[0][4],
							localisation : data[0][3],
						});
						});
  }

handleNomChange = event =>{
    this.setState({
        Nom : event.target.value
    })
}
handleSubmit = event =>{
	event.preventDefault();
	console.log(this.state.modif)
	if(this.state.modif == 0){
		document.getElementById('nom').removeAttribute('readonly');
		document.getElementById('prenom').removeAttribute('readonly');
		document.getElementById('NumeroTel').removeAttribute('readonly');
		document.getElementById('taille').removeAttribute('readonly');
		document.getElementById('localisation').removeAttribute('readonly');
		document.getElementById('gp').removeAttribute('readonly');
		document.getElementById('poids').removeAttribute('readonly');
		document.getElementById('mySubmit').setAttribute('value','appliquer les modifs');
		document.getElementById('mySubmit').value = "appliquer les modifs";
		console.log(document.getElementById('mySubmit').value);
		ReactDOM.render(<div><label htmlFor ='password'>mot de passe : </label><input type = "password" id = "password" onChange = {this.handlePassword} /></div>,document.getElementById('pw'));
		this.setState({
			modif : 1
		});
	}else if (this.state.modif == 1){
		this.setState({
			modif : 0
		});
		var pass = this.state.pw;
		var st = this.state;
		ReactDOM.render(<div></div>,document.getElementById('pw'));
		var requete1 = 'http://127.0.0.1:5000/update/'+ this.state.email;
		var requete2 =  'http://127.0.0.1:5000/ask/'+ this.state.email;
		var bcrypt = require('bcryptjs');
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(pass, salt, function(err, hash) {
						fetch(requete2, {
									mode : 'cors',
									method: "POST",
									body : JSON.stringify(hash),
									header : {
										'Accept': 'application/json',
										'Content-Type': 'application/json',
										'Access-Control-Allow-Origin' : '*',
										"Access-Control-Allow-Credentials" : true, 
									}
								}).then(response => response.json()).then(data=>{
									console.log(data);
									if(data != 'Pas de correspondance' && data != 'mot de passe incorrect'){
											fetch(requete1, {
												mode : 'no-cors',
												method: "POST",
												body : JSON.stringify(st),
												header : {
													'Accept': 'application/json',
													'Content-Type': 'application/json',
													'Access-Control-Allow-Origin' : '*',
													"Access-Control-Allow-Credentials" : true, 
												}
											});
									}
										});
			});
		});
		
			
		
	}
	
}
handlePassword = event => {
this.setState({
    pw : event.target.value
})
}
handlePrenomChange = event => {
this.setState({
    Prenom : event.target.value
})
}
handletaille = event => {
this.setState({
    taille : event.target.value
})
}
handlelocalisation = event => {
this.setState({
    localisation : event.target.value
})
}
handlegp = event => {
this.setState({
    gp : event.target.value
})
}
handlePoids = event => {
this.setState({
    poids : event.target.value
})
}
handleDateNaissChange = event => {
this.setState({
    DateNaiss : event.target.value
})
}
handleEmailChange = event =>{
this.setState({
    email : event.target.value
})
}

    render() {
        return(
            <main>
               
            
            <form  className="creercompte" onSubmit={this.handleSubmit} >
               
            

            <div id="ident">
               
                <input type ="text" id = 'nom' placeholder= "Nom *" value={this.state.Nom} onChange={this.handleNomChange} className="nom2" readonly="readonly"/>
          
                <input type ="text" id ='prenom' placeholder= "Prenom * " value={this.state.Prenom}  onChange={this.handlePrenomChange} className="prenom2" readonly="readonly"/>
            </div>

           
            <div>
               
                <input type ="text"  placeholder= "email" value ={this.state.email} onChange={this.handleEmailChange} id="email" readonly="readonly"/>
            </div>
            <div>
                <input type ="text" value ={this.state.DateNaiss}   id="DateNaiss" onChange = {this.handleDateNaiss} readonly="readonly"/>
            </div>
            <div>
            <input type ="text" placeholder ="NumeroTel" value ={this.state.numTel} id="NumeroTel"  onChange = {this.handleNumeroTel} readonly="readonly"/>

            </div>
			<div>
            <input type ="number" placeholder ="poids" value ={this.state.poids} id="poids"  onChange = {this.handlePoids} readonly="readonly"/>

            </div>
			<div>
            <input type ="text" placeholder ="gp" value ={this.state.gp} id="gp"  onChange = {this.handlegp} readonly="readonly"/>

            </div>
			<div>
            <input type ="text" placeholder ="localisation" value ={this.state.localisation} id="localisation"  onChange = {this.handlelocalisation} readonly="readonly"/>

            </div>
			<div>
            <input type ="text" placeholder ="taille" value ={this.state.taille} id="taille"  onChange = {this.handletaille} readonly="readonly"/>

            </div>
			
            
           <div className = "contrat">
               <span className="texte" > J'accepte les <a href = "http://www.google.com">conditions d'utilisations</a></span> <input type ="checkbox" id="contrat" value="agree" ></input>
               
           </div>
		   <div id='pw'>
		   </div>
            

            <div className="valider2" >
                <input type="submit"  id="mySubmit" value ="modifier" className="creer"/>
            </div>
             </form>
             </main>
        )
    }
}

export default MesDonnees