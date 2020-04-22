import React, {Component} from 'react'
import axios from 'axios'
import './MesDonneesMed.css'

class  MesDonnees extends Component {
    constructor(props){
        super(props)
        this.state ={
            Nom : " ",
            Prenom : " ",
            DateNaiss: " ",
            AutreSpecialite : " ",
            PaysDeResidence : " ",
            Civilite : " ",
            Specialite : " ",
            carteId :" "

           

        }
        
        this.handleNomChange = this.handleNomChange.bind(this);
        this.handlePrenomChange = this.handlePrenomChange.bind(this);
        this.handleAutreSpecialite = this.handleAutreSpecialite.bind(this);
        this.handlePayResidenceChange =this.handlePayResidenceChange.bind(this);
       
}

componentDidMount() {
    axios.get('http://127.0.0.1:5000/users')
    .then(response =>{
        let value = response.data

        this.setState(
            {
                 Nom: value[0][1] ,
                 Prenom: value[0][2],
                 DateNaiss: value[0][5]
              })   
    })
    .catch(error => {
        console.log(error)
    })
    
  }

handleNomChange = event =>{
    this.setState({
        Nom : event.target.value
    })
}
handlePrenomChange = event => {
this.setState({
    Prenom : event.target.value
})
}
handlePayResidenceChange = event => {
this.setState({
    PaysDeResidence : event.target.value
})
}
handleAutreSpecialite = event =>{
this.setState({
   AutreSpecialite : event.target.value
})
}

    render() {
        return(
            <main>
                {console.log(this.state.Prenom)}
            
            <form  onSubmit={this.handleSubmit}  className = "profilMed" >
                <span id="profile">Mon Profil</span>
               
            <div>
            <label for="avatar">Choose a profile picture:</label>

            <input type="file"
                id="avatar" name="avatar"
                accept="image/png, image/jpeg" />

            </div>

            <div id="ident">
                                                                  
               
                <input type ="text" id = 'nom' placeholder= "Nom *" value={this.state.Nom} onChange={this.handleNomChange} className="nom2"/>
          
                <input type ="text" id ='prenom' placeholder= "Prenom * " value={this.state.Prenom}  onChange={this.handlePrenomChange} className="prenom2"/>
                <select name ="civilite" id="civilite">
                    <option value =" " disabled selected>Civilite</option>
                   <option value="monsieur">Monsieur</option>
                   <option value ="madame">Madame</option>
                   <option value ="docteur">Docteur</option>
                   <option value ="professeur">Professeur</option>
               </select>
            </div>

            <div>
            <select value =" specialite" id ="specialite">
                    <option value =" " disabled selected>votre specialite</option>
                    <option value ="generaliste">Generaliste</option>
                    <option value ="dentiste">Dentiste</option>
                    <option value="chirugien">chirugien</option>
                </select>
            <select value =" Autrespecialite" id ="AutreSpecialite">
                    <option value =" " disabled selected>Autre specialite</option>
                    <option value ="generaliste">Generaliste</option>
                    <option value ="dentiste">Dentiste</option>
                    <option value="chirugien">chirugien</option>
                </select>
            <select  value ="pays" id ="pays">
                <option disabled selected>Pays de residence</option>
                <option>England</option>
                <option>France</option>
                <option>Belguim</option>
                </select>
               
            </div>
            
            <div>
                <input type ="date" id ="dateNaiss"  className="DateNaiss" onChange = {this.handleDateNaiss} />
              <input type="file" id="pieceId" name="carteID" accept="image/png, image/jpeg" />

            </div>
            
            <div>
               <textarea id ="aboutMed" placeholder ="Parlez moi de vous"></textarea>

            </div>
            <hr />
            <span id ="addressMed"> Mon Address</span>
            <div>
                <input type = "text" value=" " id ="addressCab" placeholder="Address de votre Cabinet"></input>
                <input type = "text" value=" " id ="villeCab" placeholder="ville"></input>
                <input type = "text" value=" " id ="codePostal" placeholder="Code Postal"></input>
            </div>
            <div>
            <input type = "text" value=" " id ="mailMed" placeholder="Votre Address Mail"></input>
            <input type ="text" placeholder ="NumeroTel" id="NumeroTel"  onChange = {this.handleNumeroTel} />
            </div>
           
            <div className="valider2" >
                <button id ="sauv" value="sauvegarder">sauvegarder</button>
                <button id = " modifier" value ="modifier ">Editer</button>
            </div>
             </form>
             </main>
        )
    }
}

export default MesDonnees