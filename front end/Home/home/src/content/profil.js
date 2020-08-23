import React, { Component } from "react"
import av from "../image/av.png"
import couv from "../image/couv.jpg"
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
      image: this.props.image,
      pays : this.props.pays,
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
          document.getElementById(this.state.id * 2000).innerHTML = "<p>vous etes deja suivis par un medecin</p>"
          document.getElementById(this.state.id * 2000).style.color = 'red'

        }

      })
      .catch(erreur => {
        console.log(erreur)
      })


    document.getElementById(this.state.id).innerHTML = "<p>Une demande d'assistance a ete envoye à ce medecin</p>"
    document.getElementById(this.state.id).style.color = 'red'
  }

  render() {
    return (

      <div className="card">
        <img src={couv} alt="card background" className="bgImg"></img>
        <img src={this.state.image || av} alt="profile image" className="profil"></img>
        <h2>{this.props.nom + '   ' + this.props.prenom}</h2>
        <p className="post">{this.props.specialite || "specialite"}</p>
        <p className="about">
          {this.props.pays || "pays"}
                  </p>
        <a href="#" className="btn btn-success" id="btn" onClick={() => this.handleContact()}>Contact</a>
        <div id={this.state.id}></div>
        <div id={this.state.id * 2000}></div>
      </div>
    )
  }
}
export default Profil