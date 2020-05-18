import React, { Component } from "react"
//import './MedSpace.css'
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
      profil: "helol",
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
              console.log(response)
            })
            .catch(erreur => {
              console.log(erreur)
            })
        } else {
          console.log("vous ne pouvez avoir que un seul medecin")
        }
      })
      .catch(erreur => {
        console.log(erreur)
      })
    /* axios
               .post('http://127.0.0.1:5000/addCons', this.state)
               .then(response => {
                   console.log(response)
               })
               .catch(erreur => {
                   console.log(erreur)
               })*/
    let min = 1
    let max = 100;
    let rand = min + Math.random() * (max - min)
    let rand2 = Math.floor(rand)
    this.setState({
      room: rand2
    })
   

  }

 




  render() {
    return (
      <div>

        <div className="row">


          <div className="column">
            <div className="card">
              <img src={av} alt="Jane" style={{ width: '20%' }} />

              <div className="container">
                <h2>{this.props.nom + '   ' + this.props.prenom}</h2>
                <p className="title">{this.props.specialite}</p>
                <p>{this.props.autre}</p>
                <p><button className="button" onClick={() => this.handleContact()} >Contact</button></p>


                <div id="megInv"><span></span></div>
              </div>
            </div>
          </div>

        </div>}
      </div>

    )
  }
}
export default Profil