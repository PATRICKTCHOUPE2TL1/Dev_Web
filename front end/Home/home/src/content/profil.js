import React, { Component } from "react"
import av from "../image/av.png"
import axios from 'axios'





class Profil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      name: this.props.nom,
      surname: this.props.prenom,
      speciality: this.props.specialite,
      others: this.props.autre,
      image : this.props.image,
      room: Math.floor(1 + Math.random() * 10000)

    }
  }
  handleContact = () => {
    axios
      .post('http://127.0.0.1:5000/verifCons', this.state)
      .then(response => {
        if (response.data === "noMed") {
          axios
            .post('http://127.0.0.1:5000/addCons', this.state)
            .then(response => {
            })
            .catch(erreur => {
              console.log(erreur)
            })
        } else {
          document.getElementById(this.state.id).style.display = "none"
           document.getElementById(this.state.id *2000).innerHTML ="<p> vous ne pouvez avoir que un seul medecin</p>"
        }
      })
      .catch(erreur => {
        console.log(erreur)
      })
  
    document.getElementById(this.state.id).innerHTML ="<p>une demande d'assistance a ete envoye a ce medecin</p>"

  }

 




  render() {
    return (
      <div>

        <div className="row">


          <div className="column">
            <div className="card">
              <img src={this.state.image || av} alt="Jane" style={{ width: '20%' }} />

              <div className="container">
                <h2>{this.props.nom + '   ' + this.props.prenom}</h2>
                <p className="title">{this.props.specialite}</p>
                <p>{this.props.autre}</p>
                <p><button className="button" onClick={() => this.handleContact()} >Contact</button></p>
                <div id ={this.state.id}> </div>
                <div id={this.state.id *2000}></div>


                <div id="megInv"><span></span></div>
              </div>
            </div>
          </div>

        </div>
      </div>

    )
  }
}
export default Profil