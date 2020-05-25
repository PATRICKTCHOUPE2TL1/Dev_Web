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
            {this.state.isLogIn ? (<Route exact path='/Patient' render={(props) => <EspacePatient userId={this.state.id} />} />) : (<Redirect to='/Login' />)}
            {this.state.isLogIn ? (<Route exact path='/Medecin' render={(props) => <Fragment> <Medecin userId={this.state.id} /></Fragment>} />) : (<Redirect to='/Login' />)}
            {this.state.isLogIn ? (<Route exact path='/Admin' render={(props) => <Fragment> <Admin userId={this.state.id} /></Fragment>} />) : (<Redirect to='/Login' />)}
          <Route exact path='/Admin/medecinlist' 
          render={() => <Fragment><div id="top1"><EnteteAdmin /></div> 
          <div id="bar1"><NavbarAdmin /></div>
          <div id="main2"><Medecinlist  userId={this.state.id}/></div>
          </Fragment>} />
          <Route exact path='/Admin/dashboard' 
          render={() => <Fragment><div id="top1"><EnteteAdmin /> 
          </div><div id="bar1"><NavbarAdmin /></div>
          <div id="main2"><Dashboard  userId={this.state.id}/></div></Fragment>} />

          <Route exact path='/Patient/mesdonnées'>
            <Fragment>
              <div id="top1">
                <EntetePat /> 
              </div>
              <div id="bar1">
                <NavBarPat />
              </div>
              <div id="main2">
                <DonneesPatient />
              </div>
              <div className="text-muted" id="bottom1">
                  &copy;{new Date().getFullYear()} TakeCare Web App - All rights reserved
              </div>
            </Fragment>
          </Route>


          <Route exact path='/Patient/nosmedecin' >
            <Fragment>
                <div id="top1">
                  <EntetePat /> 
                </div>
                <div id="bar1">
                  <NavBarPat />
                </div>
                <div id="main2">
                  <NosMedecin />
                </div>
                <div className="text-muted" id="bottom1">
                    &copy;{new Date().getFullYear()} TakeCare Web App - All rights reserved
                </div>
            </Fragment>
          </Route>
          
          
          
          <Route exact path='/Patient/monmedecin'>
            <Fragment>
                  <div id="top1">
                    <EntetePat /> 
                  </div>
                  <div id="bar1">
                    <NavBarPat />
                  </div>
                  <div id="main2">
                    <MonMedecin />
                  </div>
                  <div className="text-muted" id="bottom1">
                      &copy;{new Date().getFullYear()} TakeCare Web App - All rights reserved
                 </div>
            </Fragment>
          </Route>

          <Route path="/Medecin/Profile" userId={this.props.user}>
            <Fragment>
              <div id="top">
                <EnteteMed />
              </div>
              <div id="bar">
                <NavbarMed />
              </div>
              <div id="main1">
                <MesDonnees userId={this.state.id} />
              </div>
              <div className="text-muted" id="bottom">
                  &copy;{new Date().getFullYear()} TakeCare Web App - All rights reserved
              </div>
            </Fragment>
          </Route>

          <Route path="/Medecin/request-list">
            <Fragment>
              <div id="top">
                <EnteteMed />
              </div>
              <div id="bar">
                <NavbarMed />
              </div>
              <div id="main1">
                <DemandeAss />
              </div>
              <div className="text-muted" id="bottom">
                  &copy;{new Date().getFullYear()} TakeCare Web App - All rights reserved
              </div>
            </Fragment>
          </Route>

          <Route path="/Medecin/MesPatient">
            <Fragment>
              <div id="top">
                <EnteteMed />
              </div>
              <div id="bar">
                <NavbarMed />
              </div>
              <div id="main1">
                <MesPatient />
              </div>
              <div className="text-muted" id="bottom">
                  &copy;{new Date().getFullYear()} TakeCare Web App - All rights reserved
              </div>
            </Fragment>
          </Route>

          <Route path="/Medecin/Agenda">
            <Fragment >
              <div id="top">
                <EnteteMed />
              </div>
              <div id="bar">
                <NavbarMed />
              </div>
              <div id="main1">
                <Agenda />
              </div>
              <div className="text-muted" id="bottom">
                  &copy;{new Date().getFullYear()} TakeCare Web App - All rights reserved
              </div>
            </Fragment>
          </Route>

        </Switch>
      </main>
    )
  }
}

export default withRouter(Main)
