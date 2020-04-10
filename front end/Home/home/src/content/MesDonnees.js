import React, {Component} from 'react'
import axios from 'axios'

class  MesDonnees extends Component {
    constructor(props){
        super(props)
        this.state ={
            Nom : " ",
            Prenom : " ",
            DateNaiss: " ",
            Address : " ",
            Sprecialisation : " ",
            NumeroRRNA : " ",
            Civilite : " ",
            Specialite : " ",
            carteId :" "

           

        }
        
        this.handleNomChange = this.handleNomChange.bind(this);
        this.handlePrenomChange = this.handlePrenomChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleRRNAChange =this.handleRRNAChange.bind(this);
       
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
handleAddressChange = event => {
this.setState({
    Address : event.target.value
})
}
handleRRNAChange = event =>{
this.setState({
    NumeroRRNA : event.target.value
})
}

    render() {
        return(
            <main>
                {console.log(this.state.Prenom)}
            
            <form  className="creercompte" onSubmit={this.handleSubmit} >
               
            

            <div id="ident">
               
                <input type ="text" id = 'nom' placeholder= "Nom *" value={this.state.Nom} onChange={this.handleNomChange} className="nom2"/>
          
                <input type ="text" id ='prenom' placeholder= "Prenom * " value={this.state.Prenom}  onChange={this.handlePrenomChange} className="prenom2"/>
            </div>

            <div>
               
                <input type ="text"  placeholder= "Address *"   onChange={this.handleAddressChange} className="Address"/>
            </div>
            <div>
               
                <input type ="text"  placeholder= "Numero RRNA"  onChange={this.handleRRNAChange} className="RRNA"/>
            </div>
            <div>
                <input type ="text" placeholder ="DateNaiss" className="DateNaiss" onChange = {this.handleDateNaiss} />
            </div>
            <div>
            <input type ="text" placeholder ="NumeroTel" className="NumeroTel"  onChange = {this.handleNumeroTel} />

            </div>
            <div>
                
               <select>
                   <option>Monsieur</option>
                   <option>Madame</option>
                   <option>Docteur</option>
                   <option>Professeur</option>
               </select>
            </div>
            <div>
                <select>
                    <option>Generaliste</option>
                    <option>Dentiste</option>
                    <option>chirugien</option>
                </select>

            </div>
            <div>
                <select>
                <option>England</option>
                <option>France</option>
                <option>Belguim</option>
                </select>
              
            </div>
 
            
           <div className = "contrat">
               <span className="texte" > J'accepte les <a href = "http://www.google.com">conditions d'utilisations</a></span> <input type ="checkbox" id="contrat" value="agree" ></input>
               
           </div>
            

            <div className="valider2" >
                <input type="submit"  id="mySubmit" value ="Valider" className="creer"/>
            </div>
             </form>
             </main>
        )
    }
}

export default MesDonnees