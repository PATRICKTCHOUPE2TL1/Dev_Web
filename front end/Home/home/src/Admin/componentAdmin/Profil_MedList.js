import React, { Component } from "react"
import av from "./../../image/av.png"
import couv from "./../../image/couv.jpg"
import axios from 'axios'






class MedListProfil extends Component {
  constructor(props) {
    super(props)
    this.state = {
    userId: this.props.id,
      name: this.props.nom,
      surname: this.props.prenom,
      carteId : this.props.carteId,
      preuve : this.props.preuve,
      email :this.props.emailPrive

    }
    this.handleConfirmMed = this.handleConfirmMed.bind(this)
    this.handleRefuserMed =this.handleRefuserMed.bind(this)
  }
  handleConfirmMed = () => {
    axios
      .post('http://127.0.0.1:5000/validerStatus', this.state)
      .then(response => {
          if(response.data = 'updateSuccess'){
              console.log("reusis")
            axios
            .post('http://127.0.0.1:5000/validerMed', this.state)
            .then(reponse =>{
                console.log("sucess")
            })
            .catch(erreur =>{
                console.log(erreur)
            })

            

          }
        
        
      })
      .catch(erreur => {
        console.log(erreur)
      })
  

  }
  handleRefuserMed = () =>{
    axios
    .post('http://127.0.0.1:5000/validerStatus', this.state)
    .then(response => {
        console.log("valider success")
        console.log(response)

  }).catch(error =>{
console.log("error")
  })
}

 




  render() {
    return (
          <div>
             
              <div className="card">
                  <img src={couv} alt="card background" className="bgImg"></img>
                  <img src={this.state.image || av} alt="profile image" className="profil"></img>
                  <h2>{this.props.nom + '   ' + this.props.prenom}</h2>
                     <p>{this.state.email}</p>
                
                  <a href="#"  className ="btn btn-success" id="btn" onClick={() => this.handleConfirmMed()}>Valider</a>
                  <a href="#"  className ="btn btn-success" id="btn" onClick={() => this.handleRefuserMed()}>Rejeter</a>

              </div>
              <div>
              <a href={this.state.carteId} className ="btn btn-success" id="btn" download>telecharger CNI</a><br/><br/>
              <a href={this.state.preuve}  className ="btn btn-success"  id="btn" download>telecharger PreuveMed</a>

              </div>
              </div>
    )
  }
}
export default MedListProfil