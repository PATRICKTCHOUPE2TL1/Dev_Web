import React, { Component } from "react"
import Profil from './profil'
import axios from 'axios'
import './NosMed.css'
class NosMedecin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      db: ' ',
      callBack: ' ',
      loaded: " "
    }
    this.myCallBack = this.myCallBack.bind(this)
  }
  myCallBack = (dataFromChild) => {
    this.setState({ callBack: dataFromChild })
  }
  componentDidMount() {
    axios
      .get('http://127.0.0.1:5000/get_MedList')
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
      arr.push(<Profil key={i} id={this.state.db[i][0]} nom={this.state.db[i][1]} prenom={this.state.db[i][2]} specialite={this.state.db[i][3]} autre={this.state.db[i][4]} image={this.state.db[i][5]} callBackFromParent={this.myCallBack} />)

    }
    return (
<<<<<<< HEAD
      <section id="section">
        <div className="container">
          <h2 className="heading">Medecins disponibles sur le site</h2>
          <div className="card-wrapper">
            {this.state.loaded === "true" ? arr : <p>not loaded</p>}
          </div>
        </div>
      </section>
=======
      <div className="container bootstrap snippet">
        <h2 className="heading">Medecins disponibles sur le site</h2>
        <div className="row" id="row1">
                    

          {this.state.loaded === "true" ? arr : <p>not loaded</p>}

        </div>
      </div>
>>>>>>> refs/remotes/origin/master
    )
  }
}
export default NosMedecin