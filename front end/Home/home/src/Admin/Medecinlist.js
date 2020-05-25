import React, { Component } from "react"
import MedListProfil from './componentAdmin/Profil_MedList'
import axios from 'axios'
//import './NosMed.css'


class Medecinlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      db: ' ',
      
    }
    this.myCallBack = this.myCallBack.bind(this)
  }

  myCallBack = (dataFromChild) => {
    this.setState({ callBack: dataFromChild })
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/getMedAttente')
      .then(response => {
        this.setState({
          db: response.data,
          loaded: "true"
        })

      })
      .catch(erreur => {
        console.log(erreur)
      })
  }


  render() {

    const arr = []

    for (let i = 0; i < this.state.db.length; i++) {
      arr.push(<MedListProfil id={this.state.db[i][2]} nom={this.state.db[i][0]} prenom={this.state.db[i][1]} carteId={this.state.db[i][3]} preuve={this.state.db[i][4]} emailPrive={this.state.db[i][5]}  />)

    }
    if(arr.length == 0){
        return(<h2 className="heading">Liste Vide</h2>
        )
    }

    return (
      <section id="section">
      <div className="container">
        <h2 className="heading">Medecins en attente de validation</h2>
        <div className="card-wrapper">

        {this.state.loaded === "true" ? arr : <p>not loaded</p>}

      </div>
      </div>
  </section>
    )
  }
}
export default Medecinlist