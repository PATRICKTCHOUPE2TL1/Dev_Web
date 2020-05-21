import React, { Component, Fragment } from "react"
import Signin from "./signin/Signin"
import Medecin from "../Medecin"

import EspacePatient from "../EspacePatient"
import DonneesPatient from "./../content/MesDonnees"
import Accueil from "./homepage/Accueil"
import Login from "./login/login"
import axios from 'axios'
import Agenda from './../content2/Agenda'
import DemandeAss from '../content2/RequestList'
import MesDonnees from './../content2/MesDonnees'
import NavBarPat from './../componnents2/Navbar'
import EntetePat from './../componnents2/header'
import EnteteMed from './../components3/header'
import NosMedecin from './../content/NosMedecins'
import MonMedecin from './../content/MonMedecin'
import NavbarMed from  './../components3/Navbar'

import MesPatient from './../content2/MesPatient';

<<<<<<< HEAD




import { Switch, Route, Redirect,withRouter } from 'react-router-dom'
//component necessary for routing

=======
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from "../components3/Navbar"
   
>>>>>>> f67313fc34587786cc01f99abe77cdf067f0f425

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogIn: true,
      id: " ",
      statut: " "
    }
    this.profil = this.profil.bind(this)
  }
  profil = () => {
    axios.defaults.withCredentials = true

    axios
      .post('http://127.0.0.1:5000/profil', this.state)
      .then(reponse => {
        console.log(reponse)
        if (reponse.data === "notIn") {
          this.setState({
            isLogIn: false,
          })

        } else {
          this.setState({
            isLogIn: true,
            id: reponse.data[0],
            status: reponse.data[1]
          })
          console.log("i am here")
          console.log(reponse)
          console.log(this.state.id)
        }

      })
      .catch(erreur => {
        console.log(erreur)
      })
  }
  componentDidMount() {
    { this.profil() }
  }
  render() {
    
    return (

      <main>

        <Switch>
          <Route exact path='/' component={Accueil} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/Login' component={Login} />
          {this.state.isLogIn ? (<Route exact path='/Patient' render={(props) => <EspacePatient userId={this.state.id} />} />) : (<Redirect to='/Login' />)}
          {this.state.isLogIn ? (<Route exact path='/Medecin' render={(props) => <Fragment> <Medecin userId={this.state.id} /></Fragment>} />) : (<Redirect to='/Login' />)}

          <Route exact path='/Patient/mesdonnées' render={() => <Fragment><EntetePat /> <NavBarPat /><DonneesPatient /></Fragment>} />
          <Route exact path='/Patient/nosmedecin' render={() => <Fragment><EntetePat /> <NavBarPat /><NosMedecin /></Fragment>} />
          <Route exact path='/Patient/monmedecin' render={() => <Fragment><EntetePat /> <NavBarPat /><MonMedecin /></Fragment>} />

          <Route path="/Medecin/Profile" userId={this.props.user}>
            <Fragment>
              <EnteteMed />
              <NavbarMed />
            <MesDonnees userId={this.state.id} />
            </Fragment>
          </Route>
          <Route path="/Medecin/request-list">
          <Fragment>
          <EnteteMed />

              <NavbarMed />
            <DemandeAss />
            </Fragment>
          </Route>

          <Route path="/Medecin/MesPatient">
<Fragment>
          <EnteteMed />
              <NavbarMed />
            <MesPatient />
          </Fragment>
          </Route>
          <Route path="/Medecin/Agenda">
          <Fragment>
          <EnteteMed />
              <NavbarMed />
            <Agenda />
          </Fragment>
          </Route>



        </Switch>
      </main>
    )
  }
}

export default withRouter(Main)
