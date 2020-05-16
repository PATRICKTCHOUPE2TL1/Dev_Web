import React, { Component } from 'react'
import Navbar from './../componnents2/Navbar'
import axios from 'axios'

class ProfMed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userIdtMed: props.userId,
            Nom: " ",
            Prenom: " ",
            specialite: '',
            Convention: ' ',
            Civilite: ' ',
            DateNaiss: " ",
            NumeroRue: " ",
            NumeroRue2: " ",
            cite: " ",
            Region: " ",
            codePostal: " ",
            Pays: " ",
            Phone: " ",
            Autre: " ",


        }

        this.handleNomChange = this.handleNomChange.bind(this);
        this.handlePrenomChange = this.handlePrenomChange.bind(this);
        this.handleAutreChange = this.handleAutreChange.bind(this)
        this.handleCiviliteChange = this.handleCiviliteChange.bind(this)
        this.handleNumeroRue2Change = this.handleNumeroRue2Change.bind(this)
        this.handleNumeroRueChange = this.handleNumeroRueChange.bind(this)
        this.handlePaysChange = this.handlePaysChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.handleRegionChange = this.handleRegionChange.bind(this)
        this.handleciteChange = this.handleciteChange.bind(this)
        this.handlecodePostalChange = this.handlecodePostalChange.bind(this)
        this.handleDateNaissChange = this.handleDateNaissChange.bind(this)
        this.handlespecialiteChange = this.handlespecialiteChange.bind(this)
        this.handleConventionChange = this.handleConventionChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)


    }

    componentDidMount() {
        console.log(this.state.userIdtMed)
        axios
            .post('http://127.0.0.1:5000/profilMed', this.state)
            .then(response => {
                let value = response.data
                console.log("verif")
                console.log(value)


                this.setState(
                    {
                        Civilite: value[0][1],
                        specialite: value[0][2],
                        Convention: value[0][3],
                        DateNaiss: value[0][4],
                        NumeroRue: value[0][5],
                        NumeroRue2: value[0][6],
                        cite: value[0][7],
                        Region: value[0][8],
                        codePostal: value[0][9],
                        Pays: value[0][10],
                        Phone: value[0][11],
                        Autre: value[0][12],
                        nom: value[0][17],
                        prenom: value[0][18],
                    })
            })
            .catch(erreur => {
                console.log(erreur)
            })


    }

    handleNomChange = event => {
        this.setState({
            Nom: event.target.value
        })
    }
    handlePrenomChange = event => {
        this.setState({
            Prenom: event.target.value
        })
    }
    handleDateNaissChange = event => {
        this.setState({
            DateNaiss: event.target.value
        })
    }

    handleCiviliteChange = event => {
        this.setState({
            Genre: event.target.value
        })
    }

    handlespecialiteChange = event => {
        this.setState({
            specialite: event.target.value
        })
    }
    handleConventionChange = event => {
        this.setState({
            Convention: event.target.value
        })
    }
    handleNumeroRueChange = event => {
        this.setState({
            NumeroRue: event.target.value
        })
    }
    handleNumeroRue2Change = event => {
        this.setState({
            NumeroRue2: event.target.value
        })
    }
    handleciteChange = event => {
        this.setState({
            cite: event.target.value
        })
    }
    handleRegionChange = event => {
        this.setState({
            Prenom: event.target.value
        })
    }
    handlecodePostalChange = event => {
        this.setState({
            codePostal: event.target.value
        })
    }
    handlePaysChange = event => {
        this.setState({
            Pays: event.target.value
        })
    }
    handlePhoneChange = event => {
        this.setState({
            Phone: event.target.value
        })
    }


    handleAutreChange = event => {
        this.setState({
            Autre: event.target.value
        })
    }
    handleSubmit = event => {
       console.log("success")
    }
    
    render() {
        return (
            <main>
                <div class="container bootstrap snippet">
                    <div class="row">
                        <div class="col-sm-10"><h1>User name</h1></div>
                        <div class="col-sm-2"><a href="/users" class="pull-right"><img title="profile image" class="img-circle img-responsive" src="http://www.gravatar.com/avatar/28fd20ccec6865e2d5f0e1f4446eb7bf?s=100" /></a></div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">


                            <div class="text-center">
                                <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar" />

                                <input type="file" class="text-center center-block file-upload" />
                            </div><hr /><br />


                            <div class="panel panel-default">
                                <div class="panel-heading">Website <i class="fa fa-link fa-1x"></i></div>

                            </div>


                            <ul class="list-group">
                                <li class="list-group-item text-muted">Activity <i class="fa fa-dashboard fa-1x"></i></li>
                                <li class="list-group-item text-right"><span class="pull-left"><strong>Nombre De Patient</strong></span> 125</li>
                                <li class="list-group-item text-right"><span class="pull-left"><strong>Likes</strong></span> 13</li>
                                <li class="list-group-item text-right"><span class="pull-left"><strong>Posts</strong></span> 37</li>
                                <li class="list-group-item text-right"><span class="pull-left"><strong>Followers</strong></span> 78</li>
                            </ul>

                            <div class="panel panel-default">
                                <div class="panel-heading">Social Media</div>
                                <div class="panel-body">
                                    <i class="fa fa-facebook fa-2x"></i> <i class="fa fa-github fa-2x"></i> <i class="fa fa-twitter fa-2x"></i> <i class="fa fa-pinterest fa-2x"></i> <i class="fa fa-google-plus fa-2x"></i>
                                </div>
                            </div>

                        </div>
                        <div class="col-sm-9">
                            <ul class="nav nav-tabs">
                                <li class="active"><a data-toggle="tab" href="#home">Home</a></li>
                                <li><a data-toggle="tab" href="#messages">Menu 1</a></li>
                                <li><a data-toggle="tab" href="#settings">Menu 2</a></li>
                            </ul>


                            <div class="tab-content"></div>
                            <form id="profPatient" onSubmit={this.handleSubmit}>
                                {console.log('tessssssssssssssssssssssst')}
                                {console.log(this.state.userIdtMed)}

                                <div className="item">
                                    <p>Profil</p>

                                    <div class="city-item">
                                        <input type="text" id="nom" name="name" placeholder="Nom" value={this.state.nom} required onChange={this.handleNomChange} disabled />
                                        <input type="text" id="prenom" name="name" placeholder="Prenom" value={this.state.prenom} required onChange={this.handlePrenomChange} disabled />


                                        <select required onChange={this.handleCiviliteChange} value={this.state.Civilite} id="civilite" disabled>
                                            <option value="" disabled selected>Gendre</option>
                                            <option value="Docteur">Docteur</option>
                                            <option value="Docteure">Docteure</option>
                                            <option value="Professeur">Professeur</option>
                                            <option value="Professeure">Professeure</option>
                                            <option value="Monsieur">Monsieur</option>
                                            <option value="Madame">Madame</option>
                                        </select>
                                        <input type="date" name="bdate" required value={this.state.DateNaiss} onChange={this.handleDateNaissChange} readOnly />
                                        <i class="fas fa-calendar-alt"></i>
                                    </div>
                                </div>

                                <hr />
                                <div class="city-item">
                                    <select required onChange={this.handlespecialiteChange} value={this.state.specialite} id="specialite" disabled>
                                        <option value="" disabled selected>Specialite</option>
                                        <option value="Generaliste">Generaliste</option>
                                        <option value="Psychiatre">Psychiatre</option>
                                        <option value="Sage-femme">Sage-femme</option>
                                        <option value="Dermatologue">Dermatologue</option>
                                        <option value="Dentiste">Dentiste</option>
                                        <option value="Ophthamologiste">Ophthamologiste</option>
                                    </select>
                                    <select required onChange={this.handleConventionChange} value={this.state.Convention} id="convention" disabled>
                                        <option value="" disabled selected>Quelle Convention ?</option>
                                        <option value="Generaliste Conventionné secteur 1">Generaliste Conventionné secteur 1</option>
                                        <option value="Generaliste Conventionné secteur 2">Generaliste Conventionné secteur 2</option>
                                        <option value="Conventionné Sage-femme">Conventionné Sage-femme</option>
                                        <option value="Specialiste Conventionné secteur 1">Specialiste Conventionné secteur 1</option>
                                        <option value="Generaliste Conventionné secteur 2">Generaliste Conventionné secteur 2</option>
                                        <option value="Conventionné Secteur 3">Conventionné Secteur 3</option>
                                        <option value="Non Conventionné">Non Conventionné</option>
                                    </select>
                                </div>
                                <hr />


                                <div className="item">
                                    <p>Address</p>
                                    <input type="text" name="name" placeholder="Numero de Rue" value={this.state.NumeroRue} required onChange={this.handleNumeroRueChange} readOnly />
                                    <input type="text" name="name" placeholder="Numero de Rue  2" value={this.state.NumeroRue2} required onChange={this.handleNumeroRue2Change} readOnly />
                                    <div class="city-item">
                                        <input type="text" name="name" placeholder="Cite" value={this.state.cite} required onChange={this.handleciteChange} readOnly />
                                        <input type="text" name="name" placeholder="Region" value={this.state.Region} required onChange={this.handleRegionChange} readOnly />
                                        <input type="text" name="name" placeholder="Code Postal" value={this.state.codePostal} required onChange={this.handlecodePostalChange} readOnly />
                                        <select required value={this.state.Pays} onChange={this.handlePaysChange} id="pays" disabled>
                                            <option value="">Pays de Residence</option>
                                            <option value="RoyaumeUnis">Royaume unis</option>
                                            <option value="Cameroun">Cameroun</option>
                                            <option value="Belgique">Belgique</option>
                                            <option value="France">France</option>

                                        </select>
                                    </div>
                                </div>

                                <div className="item">
                                    <p>Phone</p>
                                    <input type="text" name="phone" placeholder="### ### ####" value={this.state.Phone} onChange={this.handlePhoneChange} readOnly />
                                </div>
                                <hr />


                                <div className="item">
                                    <p>A savoir sur vous</p>
                                    <textarea rows="3" onChange={this.handleAutreChange} readOnly value={this.state.Autre}></textarea>
                                </div>
                                <div className="btn-block">
                                    <button type="button" id="modifier"  >Retour</button>
                                    <input type="submit" value="Enregistrer" id="save" style={{ display: 'none' }} />

                                </div>

                            </form>

                        </div>
                    </div>

                </div>
            </main>

        )
    }
}

export default ProfMed