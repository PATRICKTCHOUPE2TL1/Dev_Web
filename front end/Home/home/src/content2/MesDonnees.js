import React, { Component } from 'react'
import Navbar from './../components3/Navbar';
import { storage } from './../firebase/firebase'

import axios from 'axios'

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
            NumeroRue2: " ",
            cite: " ",
            Region: " ",
            codePostal: " ",
            Pays: " ",
            Phone: " ",
            Autre: " ",
            selectedFile: " ",
            imageUrl: " ",


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
        this.editerForm = this.editerForm.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
        this.handlePorfile = this.handlePorfile.bind(this)


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
                        NumeroRue2: value[0][6],
                        cite: value[0][7],
                        Region: value[0][8],
                        codePostal: value[0][9],
                        Pays: value[0][10],
                        Phone: value[0][11],
                        Autre: value[0][12],
                        nom: value[0][17],
                        prenom: value[0][18],
                        imageUrl:value[0][15]
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
            Region: event.target.value
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
        document.getElementById('civilite').disabled = true
        document.getElementById('pays').disabled = true
        document.getElementById('modifier').style.display = 'block'

    }
    editerForm = () => {
        let form = document.getElementById("profPatient");
        let elements = form.elements;
        for (let i = 0, len = elements.length; i < len; ++i) {
            elements[i].readOnly = false;
        }
        document.getElementById('save').style.display = 'block';
        document.getElementById('civilite').disabled = false
        document.getElementById('pays').disabled = false
        document.getElementById('specialite').disabled = false
        document.getElementById('convention').disabled = false

        document.getElementById('modifier').style.display = 'none'
        document.getElementById('slctImg').style.display ='block'
        document.getElementById('upldImg').style.display ='block'



    }
    handleUpload = () => {
        const image = this.state.selectedFile
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on('state_changed', (snapshot) => {
            //progess function ..........
        }, (error) => {
            //error function ............
            console.log(error)
        }, () => {
            //complete function ..........
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                this.setState({
                    imageUrl: url
                })
            })

        })
    }
    handlePorfile = (e) => {
        console.log(e.target.files[0])
        this.setState({
            selectedFile: e.target.files[0]
        })


    }
    render() {
        return (
            <main>
                <div className="container">
                <div className="row">
                    <div className="img-div">
                        <div className="text-center">
                            <img src={this.state.imageUrl || "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"} className="avatar img-circle img-thumbnail" alt="avatar" />
                            <input type="file" className="text-center center-block file-upload" onChange={this.handlePorfile} id="slctImg" style={{ display: 'none' }}/>
                            <button type="button" className="btn btn-success" onClick={() => { this.handleUpload() }} style={{ display: 'none' }} id="upldImg" >Upload</button>
                        </div><hr /><br />
                    </div>
                    <div class="form-div">                       
                        <form id="profPatient" onSubmit={this.handleSubmit}>
                        <div className="form-box">
                        <div className="item">
                            <h4 id="titre">Profil</h4>
                            <div className="form-row">
                                    <div className="form-group col-md-3">
                                        <label for="civilite">Civilité*</label>  
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
                                    <div  className="form-group col-md-2">
                                            <label for="nom">Nom*</label>
                                            <input type="text" id="nom" name="name" className="form-control" value={this.state.nom} required onChange={this.handleNomChange} disabled />
                                    </div>
                                    <div  className="form-group col-md-2">
                                            <label for="prenom">Prenom*</label>
                                            <input type="text" id="prenom" name="name" className="form-control" value={this.state.prenom} required onChange={this.handlePrenomChange} disabled />
                                    </div>
                                    <div  className="form-group col-md-3">
                                            <label for="bdate">Date de naissance*</label>
                                            <input type="date" name="bdate" required className="form-control" value={this.state.DateNaiss} onChange={this.handleDateNaissChange} readOnly />
                                            <i class="fas fa-calendar-alt"></i>
                                    </div>
                                </div>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <label for="specialite">Spécialité*</label>
                                    <select required onChange={this.handlespecialiteChange} value={this.state.specialite} id="specialite" className="form-control" disabled>
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
                                    <label for="convention">Convention*</label>
                                    <select required onChange={this.handleConventionChange} value={this.state.Convention} id="convention" className="form-control" disabled>
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
                                        <label for="inputstreet">Rue*</label>
                                        <input type="text" name="name" id="inputstreet" className="form-control" value={this.state.NumeroRue} required onChange={this.handleNumeroRueChange} readOnly />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="inputstreet">Rue 2</label>
                                        <input type="text" name="name" className="form-control" value={this.state.NumeroRue2} required onChange={this.handleNumeroRue2Change} readOnly />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="inputcity">Ville*</label>
                                        <input type="text" name="name" id="inputcity" className="form-control" value={this.state.cite} required onChange={this.handleciteChange} readOnly />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-3">
                                        <label for="inputcity">Region*</label>
                                        <input type="text" name="name"  className="form-control" value={this.state.Region} required onChange={this.handleRegionChange} readOnly />
                                    </div>
                                    <div className="form-group col-md-2"> 
                                        <label for="inputcp">Code Postal*</label>
                                        <input type="text" name="name" id="inputctp" className="form-control" value={this.state.codePostal} required onChange={this.handlecodePostalChange} readOnly />
                                    </div>  
                                    <div className="form-group col-md-3">
                                        <label for="pays">Pays de résidence*</label>
                                        <select required value={this.state.Pays} onChange={this.handlePaysChange} id="pays" className="form-control" disabled>
                                            <option>...</option>
                                            <option value="RoyaumeUnis">Royaume uni</option>
                                            <option value="Cameroun">Cameroun</option>
                                            <option value="Belgique">Belgique</option>
                                            <option value="France">France</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-2">
                                    <label for="inputphone">Téléphone Cabinet*</label>
                                    <input type="text" name="phone" id="inputphone" className="form-control" value={this.state.Phone} onChange={this.handlePhoneChange} readOnly />
                                    </div>
                                </div>
                            </div>   
                            <hr />
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label for="inputautre">A savoir sur vous</label>
                                    <textarea rows="3" id="inputautre" onChange={this.handleAutreChange} readOnly value={this.state.Autre} className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="btn-block">
                                <button type="button" className ="btn btn-danger" id="modifier" onClick={this.editerForm} >Modifier</button>
                                <input type="submit" className ="btn btn-primary" value="Enregistrer" id="save" style={{ display: 'none' }} />
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

export default MesDonnees


