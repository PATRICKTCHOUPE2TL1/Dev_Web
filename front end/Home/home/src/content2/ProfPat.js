import React, { Component } from "react"
import av from "../image/av.png"
import axios from 'axios'


class ProfilPat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      name: props.nom,
      surname: props.prenom,
      image : props.image,
      profil: "helol",
      room: Math.floor(1 + Math.random() * 10000)


    }
    this.handleAccepter =this.handleAccepter.bind(this)
  }
  handleAccepter = () => {
   axios
      .post('http://127.0.0.1:5000/confCons', this.state)
      .then(response => {
        
      })
      .catch(erreur => {
        console.log(erreur)
      })
   
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
                <p><button  type ="button" className ="btn btn-success" onClick ={() =>{this.handleAccepter()}} >Accepter</button></p>
                <p><button className ="btn btn-danger"> Refuser</button></p>
                <div id="megInv"><span></span></div>
              </div>
            </div>
          </div>

        </div>
      </div>

    )
  }
}
export default ProfilPat