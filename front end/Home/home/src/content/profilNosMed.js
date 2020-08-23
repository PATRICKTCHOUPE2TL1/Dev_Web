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

        let date = 'date_format(dateNaiss, "%Y-%m-%d")'

        axios
            .get('http://127.0.0.1:5000/medecin/utilisateur/' + date + '/search?args1=utilisateur.userId&args2=' + this.state.userIdtMed + '&args3=medecin.userId&args4=' + this.state.userIdtMed)

            .then(response => {
                let value = response.data

                this.setState(
                    {
                        Civilite: value[0][1],
                        specialite: value[0][2],
                        Convention: value[0][3],
                        DateNaiss: value[0][23],
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
    }

    render() {
        return (
            <main>
                <div className="container bootstrap snippet">

                    <div className="row">

                        <div className="col-sm-9">



                            <div className="tab-content"></div>
                            <form id="profPatient" onSubmit={this.handleSubmit}>

                            <div className="item">
                            <h4 id="titre">Profil</h4>
                            <div className="form-row">
                                    <div className="form-group col-md-3">
                                        <label htmlFor="civilite">Civilité*</label>  
                                        <select required onChange={this.handleCiviliteChange} value={this.state.Civilite} id="civilite" className="form-control" disabled>
                                                <option >...</option>
                                                <option value="Docteur">Docteur</option>
                                                <option value="Docteure">Docteure</option>
                                                <option value="Professeur">Professeur</option>
                                                <option value="Professeure">Professeure</option>
                                                <option value="Monsieur">Monsieur</option>
                                                <option value="Madame">Madame</option>
                                        </select>
                                    </div>
                                    <div  className="form-group col-md-3">
                                            <label htmlFor="nom">Nom*</label>
                                            <input type="text" id="nom" name="name" className="form-control" value={this.state.nom || ' '} required onChange={this.handleNomChange} disabled />
                                    </div>
                                    <div  className="form-group col-md-3">
                                            <label htmlFor="prenom">Prenom*</label>
                                            <input type="text" id="prenom" name="name" className="form-control" value={this.state.prenom || ' '} required onChange={this.handlePrenomChange} disabled />
                                    </div>
                                    <div  className="form-group col-md-4">
                                            <label htmlFor="bdate">Date de naissance*</label>
                                            <input type="date" name="bdate" required className="form-control" value={this.state.DateNaiss || ''} onChange={this.handleDateNaissChange} readOnly />
                                            <i className="fas fa-calendar-alt"></i>
                                    </div>
                                </div>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <label htmlFor="specialite">Spécialité*</label>
                                    <select required onChange={this.handlespecialiteChange} value={this.state.specialite || ''} id="specialite" className="form-control" disabled>
                                        <option>...</option>
                                        <option value="Generaliste">Generaliste</option>
                                        <option value="Psychiatre">Psychiatre</option>
                                        <option value="Sage-femme">Sage-femme</option>
                                        <option value="Dermatologue">Dermatologue</option>
                                        <option value="Dentiste">Dentiste</option>
                                        <option value="Ophthamologiste">Ophthamologiste</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-5">
                                    <label htmlFor="convention">Convention*</label>
                                    <select required onChange={this.handleConventionChange} value={this.state.Convention || ' '} id="convention" className="form-control" disabled>
                                        <option>...</option>
                                        <option value="Generaliste Conventionné secteur 1">Generaliste Conventionné secteur 1</option>
                                        <option value="Generaliste Conventionné secteur 2">Generaliste Conventionné secteur 2</option>
                                        <option value="Conventionné Sage-femme">Conventionné Sage-femme</option>
                                        <option value="Specialiste Conventionné secteur 1">Specialiste Conventionné secteur 1</option>
                                        <option value="Generaliste Conventionné secteur 2">Generaliste Conventionné secteur 2</option>
                                        <option value="Conventionné Secteur 3">Conventionné Secteur 3</option>
                                        <option value="Non Conventionné">Non Conventionné</option>
                                    </select>
                                </div>
                            </div>
                            </div>
                            <hr />
                            <div className="item">
                                <h4 id="titre">Adresse du cabinet</h4>
                                <div className="form-row">
                                    <div className="form-group col-md-3" >
                                        <label htmlFor="inputstreet">Rue*</label>
                                        <input type="text" name="Rue" id="inputstreet" className="form-control" value={this.state.NumeroRue || ''} required onChange={this.handleNumeroRueChange} readOnly />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputstreet">Rue 2</label>
                                        <input type="text" name="Rue 2" className="form-control" value={this.state.NumeroRue2 || ''} required onChange={this.handleNumeroRue2Change} readOnly />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputcity">Ville*</label>
                                        <input type="text" name="cite" id="inputcity" className="form-control" value={this.state.cite || ''} required onChange={this.handleciteChange} readOnly />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputcity">Region*</label>
                                        <input type="text" name="region"  className="form-control" value={this.state.Region || ''} required onChange={this.handleRegionChange} readOnly />
                                    </div>
                                    <div className="form-group col-md-3"> 
                                        <label htmlFor="inputcp">Code Postal*</label>
                                        <input type="text" name="codePostal" id="inputctp" className="form-control" value={this.state.codePostal} required onChange={this.handlecodePostalChange} readOnly />
                                    </div>  
                                    <div className="form-group col-md-5">
                                        <label htmlFor="pays">Pays de résidence*</label>
                                        <select required value={this.state.Pays || ''} onChange={this.handlePaysChange} id="pays" className="form-control" disabled>
                                            <option>...</option>
                                            <option value="RoyaumeUnis">Royaume uni</option>
                                            <option value="Cameroun">Cameroun</option>
                                            <option value="Belgique">Belgique</option>
                                            <option value="France">France</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-3">
                                    <label htmlFor="inputphone">Téléphone Cabinet*</label>
                                    <input type="text" name="phone" id="inputphone" className="form-control" value={this.state.Phone || ''} onChange={this.handlePhoneChange} readOnly />
                                    </div>
                                </div>
                            </div>   
                            <hr />
                            <div className="form-row">
                                <div className="form-group col-md-7">
                                    <label htmlFor="inputautre">A Savoir sur lui</label>
                                    <textarea rows="3" id="inputautre" onChange={this.handleAutreChange} readOnly value={this.state.Autre || ''} className="form-control"></textarea>
                                </div>
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