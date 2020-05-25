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
import Admin from './../Admin/Admin'
import Medecinlist from './../Admin/Medecinlist'
import EnteteAdmin from './../Admin/componentAdmin/header'
import NavbarAdmin from './../Admin/componentAdmin/Navbar'
import Dashboard from './../Admin/componentAdmin/Dashboard'


import MesPatient from './../content2/MesPatient';
import ConfirmId from './../ConfirmMed'





import { Switch, Route, Redirect,withRouter } from 'react-router-dom'
//component necessary for routing


class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogIn: true,
      id: " ",
      status: " "
    }
    this.profil = this.profil.bind(this)
  }
  profil = () => {
    axios.defaults.withCredentials = true

    axios
      .post('http://127.0.0.1:5000/profil', this.state)
      .then(reponse => {
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
          <Route exact path='/confirmerMed' component={ConfirmId} />

          <Route exact path='/Login' component={Login} />
          {this.state.isLogIn  ? (<Route exact path='/Patient' render={(props) => <EspacePatient userId={this.state.id} />} />) : (<Redirect to='/Login' />)}
          {this.state.isLogIn ? (<Route exact path='/Medecin' render={(props) => <Fragment> <Medecin userId={this.state.id} /></Fragment>} />) : (<Redirect to='/Login' />)}
          {this.state.isLogIn ? (<Route exact path='/Medecin' render={(props) => <Fragment> <Medecin userId={this.state.id} /></Fragment>} />) : (<Redirect to='/Login' />)}
          {this.state.isLogIn ? (<Route exact path='/Admin' render={(props) => <Fragment> <Admin userId={this.state.id} /></Fragment>} />) : (<Redirect to='/Login' />)}
          
          <Route exact path='/Patient/mesdonnées' render={(props) => <Fragment><EntetePat /> <NavBarPat /><DonneesPatient  {...props} userId={this.state.id}/></Fragment>} />
          <Route exact path='/Patient/nosmedecin' render={() => <Fragment><EntetePat /> <NavBarPat /><NosMedecin  userId={this.state.id}/></Fragment>} />
          <Route exact path='/Patient/monmedecin' render={() => <Fragment><EntetePat /> <NavBarPat /><MonMedecin  userId={this.state.id}/></Fragment>} />
          <Route exact path='/Admin/medecinlist' render={() => <Fragment><EnteteAdmin /> <NavbarAdmin /><Medecinlist  userId={this.state.id}/></Fragment>} />
          <Route exact path='/Admin/dashboard' render={() => <Fragment><EnteteAdmin /> <NavbarAdmin /><Dashboard  userId={this.state.id}/></Fragment>} />

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
