import React, { Component } from 'react'
import axios from 'axios'
import './MesDonneesMed.css'


class MesDonnees extends Component {
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
            cite: " ",
            codePostal: " ",
            Pays: " ",
            Phone: " ",
            Autre: " ",
        }

        this.handleNomChange = this.handleNomChange.bind(this);
        this.handlePrenomChange = this.handlePrenomChange.bind(this);
        this.handleAutreChange = this.handleAutreChange.bind(this)
        this.handleCiviliteChange = this.handleCiviliteChange.bind(this)
        this.handleNumeroRueChange = this.handleNumeroRueChange.bind(this)
        this.handlePaysChange = this.handlePaysChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.handleciteChange = this.handleciteChange.bind(this)
        this.handlecodePostalChange = this.handlecodePostalChange.bind(this)
        this.handleDateNaissChange = this.handleDateNaissChange.bind(this)
        this.handlespecialiteChange = this.handlespecialiteChange.bind(this)
        this.handleConventionChange = this.handleConventionChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.editerForm = this.editerForm.bind(this)


    }

    componentDidMount() {
        console.log(this.state.userIdtMed)
        axios
            .get('http://127.0.0.1:5000/fetchMed')
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
                        cite: value[0][7],
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
    handleciteChange = event => {
        this.setState({
            cite: event.target.value
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
        event.preventDefault();
        console.log(this.state)
        axios
            .post('http://127.0.0.1:5000/savedataMed', this.state)
            .then(reponse => {
                console.log(reponse)
            })
            .catch(erreur => {
                console.log(erreur)
            })

        let form = document.getElementById("profPatient");
        let elements = form.elements;
        for (let i = 0, len = elements.length; i < len; ++i) {
            elements[i].readOnly = true;
        }
        document.getElementById('save').style.display = 'none';
        document.getElementById('inputState').disabled = true
        document.getElementById('pays').disabled = true
        document.getElementById('specialite').disabled = true
        document.getElementById('convention').disabled = true
        document.getElementById('modifier').style.display = 'block'

    }
    editerForm = () => {
        let form = document.getElementById("profPatient");
        let elements = form.elements;
        for (let i = 0, len = elements.length; i < len; ++i) {
            elements[i].readOnly = false;
        }
        document.getElementById('save').style.display = 'block';
        document.getElementById('inputState').disabled = false
        document.getElementById('pays').disabled = false
        document.getElementById('specialite').disabled = false
        document.getElementById('convention').disabled = false
        document.getElementById('modifier').style.display = 'none'



    }
    render() {
        return (
            <div className="content-div">
                <div className="img-div">
                    <div className="profil">
                        <div className="menu">
                            <div className="center">

                            </div>
                        </div>
                        <div className="main">
                            <div className="photo">
                                <div className="hover">
                                    <u>test2</u>
                                </div>
                            </div>
                            <h3 className="nom">Patrick</h3>
                            <h3 className="prenom">Tchoupe</h3>
                        </div>
                    </div>
                    <div className="infos-div">
                        <div className="left">
                            <div className="profession">
                                <h3 className="title">Profession</h3>
                                <p className="text">Generaliste</p>
                            </div>
                            <div className="btn-wrap">
                                <button type="button" className ="btn btn-danger" id="modifier" onClick={this.editerForm} >Modifier</button>
                            </div>
                        </div>
                        <div className="right">
                            <div className="cabinet">
                                <h5 className="ad">Rue</h5>
                                <h5 className="ad">Postal</h5>
                                <h5 className="ad">Ville</h5>
                                <h5 className="ad">Pays</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-div">
                <form id="profPatient" onSubmit={this.handleSubmit}>
                    <div className="form-box">
                    <div className="form-row">
                            <div className="form-group col-md-3">
                                <label for="inputState">Civilité</label>
                                <select required onChange={this.handleCiviliteChange} value={this.state.Civilite} id="inputState" className="form-control" disabled>
                                                    <option >...</option>
                                                    <option value="Docteur">Docteur</option>
                                                    <option value="Docteure">Docteure</option>
                                                    <option value="Professeur">Professeur</option>
                                                    <option value="Professeure">Professeure</option>
                                                    <option value="Monsieur">Monsieur</option>
                                                    <option value="Madame">Madame</option>
                                </select>
                            </div>                
                            <div className="form-group col-md-3">
                                <label for="nom1">Nom*</label>
                                <input type="text" className="form-control" id="nom1" value={this.state.nom}  required onChange={this.handleNomChange}  disabled />
                            </div>
                            <div className="form-group col-md-3">
                                <label for="prenom1">Prenom*</label>
                                <input type="text" className="form-control" id="prenom1" value={this.state.prenom} required onChange={this.handlePrenomChange} disabled />
                            </div>
                            
                    </div>
                    <div className="form-row">
                            <div className="form-group col-md-4">
                                <label for="inputbdth">Date de naissance*</label>
                                <input type="date" className="form-control" id="inputbdth" value={this.state.DateNaiss} onChange={this.handleDateNaissChange} readOnly/>
                            </div>
                        <div className="form-group col-md-3">
                            <label for="specialite">Spécialité*</label>
                            <select required onChange={this.handlespecialiteChange} value={this.state.specialite} id="specialite" className="form-control" disabled>
                                                <option >...</option>
                                                <option value="Generaliste">Generaliste</option>
                                                <option value="Psychiatre">Psychiatre</option>
                                                <option value="Sage-femme">Sage-femme</option>
                                                <option value="Dermatologue">Dermatologue</option>
                                                <option value="Dentiste">Dentiste</option>
                                                <option value="Ophthamologiste">Ophthamologiste</option>
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label for="convention">Convention*</label>
                            <select required onChange={this.handleConventionChange} value={this.state.Convention} id="convention" className="form-control" disabled>
                                                 <option >...</option>                   
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
                    </div>
                    <div className="form-row">
                            <div className="form-group col-md-4">
                                <label for="inputstreet">Adresse du Cabinet*</label>
                                <input type="text" className="form-control" id="inputstreet" value={this.state.NumeroRue} required onChange={this.handleNumeroRueChange} readOnly/>
                            </div>
                            <div className="form-group col-md-2">
                                <label for="inputcp">Code Postal</label>
                                <input type="text" className="form-control" id="inputcp" value={this.state.codePostal} required onChange={this.handlecodePostalChange}  readOnly/>
                            </div>
                            <div className="form-group col-md-2">
                                <label for="inputcity">Ville*</label>
                                <input type="text" className="form-control" id="inputcity" value={this.state.cite} required onChange={this.handleciteChange} readOnly/>
                            </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">   
                                <label for="pays">Pays de résidence*</label>
                                <select required value={this.state.Pays} onChange={this.handlePaysChange} id="pays" className="form-control" disabled>
                                    <option >...</option>    
                                    <option value="RoyaumeUni">Royaume-uni</option>
                                    <option value="Cameroun">Cameroun</option>
                                    <option value="Belgique">Belgique</option>
                                    <option value="France">France</option>
                                </select>
                        </div>
                        <div className="form-group col-md-4">
                                <label for="inputphone">Téléphone Cabinet*</label>
                                <input type="text" className="form-control" id="inputphone" value={this.state.Phone} onChange={this.handlePhoneChange}readOnly/>
                        </div>
                    </div>
                    <div>
                                <label for="inputautre">A savoir sur vous</label>
                                <textarea rows="3" onChange={this.handleAutreChange} id="inputautre" readOnly value={this.state.Autre}></textarea>
                    </div>
                    <div className="btn-block">
                                <input type="submit" value="Enregistrer" className ="btn btn-primary" id="save" style={{ display: 'none' }} />
                    </div>
                    </div>
                </form>
                </div>
        </div>
        )
    }
}

export default MesDonnees