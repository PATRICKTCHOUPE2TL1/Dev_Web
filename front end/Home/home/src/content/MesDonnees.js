import React, { Component } from 'react'
import axios from 'axios'
import './../content2/MesDonneesMed.css'
import { storage } from './../firebase/firebase'

class DonneesPatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userIdt: props.userId,
            Nom: " ",
            Prenom: " ",
            Genre: ' ',
            DateNaiss: " ",
            NumeroRue: " ",
            NumeroRue2: " ",
            cite: " ",
            Region: " ",
            codePostal: " ",
            Pays: " ",
            Phone: " ",
            Poids: " ",
            Taille: " ",
            GroupeSanguin: " ",
            allergies: " ",
            autreAllergie: " ",
            Autre: " ",
            selectedFile: " ",
            imageUrl: " ",

        }

        this.handleNomChange = this.handleNomChange.bind(this);
        this.handlePrenomChange = this.handlePrenomChange.bind(this);
        this.handleAutreChange = this.handleAutreChange.bind(this)
        this.handleGenreChange = this.handleGenreChange.bind(this)
        this.handleGroupeSanguinChange = this.handleGroupeSanguinChange.bind(this)
        this.handleNumeroRue2Change = this.handleNumeroRue2Change.bind(this)
        this.handleNumeroRueChange = this.handleNumeroRueChange.bind(this)
        this.handlePaysChange = this.handlePaysChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.handlePoidsChange = this.handlePoidsChange.bind(this)
        this.handleRegionChange = this.handleRegionChange.bind(this)
        this.handleTailleChange = this.handleTailleChange.bind(this)
        this.handleallergiesChange = this.handleallergiesChange.bind(this)
        this.handleciteChange = this.handleciteChange.bind(this)
        this.handlecodePostalChange = this.handlecodePostalChange.bind(this)
        this.handleDateNaissChange = this.handleDateNaissChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleautreAllergieChange = this.handleautreAllergieChange.bind(this)
        this.editerForm = this.editerForm.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
        this.handlePorfile = this.handlePorfile.bind(this)


    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:5000/fetchPatient')
            .then(response => {
                let value = response.data


                this.setState(
                    {
                        Genre: value[0][1],
                        DateNaiss: value[0][24],
                        NumeroRue: value[0][3],
                        NumeroRue2: value[0][4],
                        cite: value[0][5],
                        Region: value[0][6],
                        codePostal: value[0][7],
                        Pays: value[0][8],
                        Phone: value[0][9],
                        Poids: value[0][10],
                        Taille: value[0][11],
                        GroupeSanguin: value[0][12],
                        allergies: value[0][13],
                        autreAllergie: value[0][14],
                        Autre: value[0][15],
                        nom: value[0][18],
                        prenom: value[0][19],
                        imageUrl: value[0][16]
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
    handleautreAllergieChange = event => {
        this.setState({
            autreAllergie: event.target.value
        })
    }
    handleGenreChange = event => {
        this.setState({
            Genre: event.target.value
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
    handlePoidsChange = event => {
        this.setState({
            Poids: event.target.value
        })
    }
    handleTailleChange = event => {
        this.setState({
            Taille: event.target.value
        })
    }
    handleGroupeSanguinChange = event => {
        this.setState({
            GroupeSanguin: event.target.value
        })
    }
    handleallergiesChange = event => {
        this.setState({
            allergies: event.target.value
        })

        if (event.target.value === "Oui") {
            document.getElementById("autreAlleg").style.display = "block"

        } else if (event.target.value === "Non") {

            document.getElementById("autreAlleg").style.display = 'none'

        } else {
            console.log("erreur")
        }
    }
    handleAutreChange = event => {
        this.setState({
            Autre: event.target.value
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        axios
            .post('http://127.0.0.1:5000/savedata', this.state)
            .then(reponse => {
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
        document.getElementById('genre').disabled = true
        document.getElementById('pays').disabled = true
        document.getElementById('bloodGrp').disabled = true
        document.getElementById('radio_1').disabled = true
        document.getElementById('radio_2').disabled = true
        document.getElementById('modifier').style.display = 'block'

    }
    editerForm = () => {
        let form = document.getElementById("profPatient");
        let elements = form.elements;
        for (let i = 0, len = elements.length; i < len; ++i) {
            elements[i].readOnly = false;
        }
        document.getElementById('save').style.display = 'block';
        document.getElementById('genre').disabled = false
        document.getElementById('pays').disabled = false
        document.getElementById('bloodGrp').disabled = false
        document.getElementById('radio_1').disabled = false
        document.getElementById('radio_2').disabled = false
        document.getElementById('modifier').style.display = 'none'
        document.getElementById('slctImg').style.display = 'block'
        document.getElementById('upldImg').style.display = 'block'

    }
    handlePorfile = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })


    }
    handleUpload = () => {
        const image = this.state.selectedFile
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on('state_changed', (snapshot) => {
            //progess function .......................
        }, (error) => {
            //error function .........................
            console.log(error)
        }, () => {
            //complete function ......................
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                this.setState({
                    imageUrl: url
                })
            })

        })
    }

    render() {
        return (

            <div className="container bootstrap snippet">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="text-center">
                            <img src={this.state.imageUrl || "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"} className="avatar img-circle img-thumbnail" alt="avatar" />
                            <input type="file" className="text-center center-block file-upload" onChange={this.handlePorfile} id="slctImg" style={{ display: 'none' }} />
                            <button type="button" className ="btn btn-success" onClick={() => { this.handleUpload() }} style={{ display: 'none' }} id="upldImg" >Upload</button>
                        </div><hr /><br />
                    </div>
                    <div className="col-sm-9">
                    <div className="tab-content">
                    <form id="profPatient" onSubmit={this.handleSubmit}>

                            <div className="item">
                                <h3 id="titre1">Profil</h3>
                                <div className="form-row">
                                    <div className="form-group col-md-3">
                                        <label for="genre">Genre</label>
                                        <select required onChange={this.handleGenreChange}  className="form-control" value={this.state.Genre || ''} id="genre" disabled>
                                            <option>...</option>
                                            <option value="Masculin">Masculin</option>
                                            <option value="Feminin">Feminin</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="nom">Nom</label>
                                        <input type="text" id="nom" name="name"  className="form-control" value={this.state.nom || ''} disabled />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="prenom">Prénom</label>
                                        <input type="text" id="prenom" name="name" className="form-control" value={this.state.prenom || ''} required disabled />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="the_date">Date de naissance</label>
                                        <input type="date" name="the_date" className="form-control" value={this.state.DateNaiss || ''} onChange={this.handleDateNaissChange} readOnly />
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <div className="item">
                                <h3 id="titre1">Adresse</h3>
                                <div className="form-row">
                                    <div className="form-group col-md-3">
                                        <label for="rue">Rue</label>
                                        <input type="text" name="rue"  className="form-control" value={this.state.NumeroRue || ''} onChange={this.handleNumeroRueChange} readOnly />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="rue2">Rue 2</label>
                                        <input type="text" name="rue2" className="form-control" value={this.state.NumeroRue2 || ''} onChange={this.handleNumeroRue2Change} readOnly />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="cite">Ville</label>
                                        <input type="text" name="cite"  className="form-control" value={this.state.cite || ''} required onChange={this.handleciteChange} readOnly />
                                    </div>  
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-3">
                                        <label for="region">Region</label>
                                        <input type="text" name="region" className="form-control"  value={this.state.Region || ''} required onChange={this.handleRegionChange} readOnly />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="codePostal">Code Postal</label>
                                        <input type="number" name="codePostal" className="form-control"  value={this.state.codePostal || ''} required onChange={this.handlecodePostalChange} readOnly />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="pays">Pays de résidence</label>
                                        <select required value={this.state.Pays || ''} className="form-control"  onChange={this.handlePaysChange} id="pays" disabled>
                                                <option>...</option>
                                                <option value="RoyaumeUnis">Royaume unis</option>
                                                <option value="Cameroun">Cameroun</option>
                                                <option value="Belgique">Belgique</option>
                                                <option value="France">France</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-3">
                                        <label for="phone">Téléphone</label>
                                        <input type="text" name="phone" className="form-control"  value={this.state.Phone || ''} onChange={this.handlePhoneChange} readOnly />
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div className="item">
                                <h3 id="titre1">Carnet Medical</h3> 
                                <div className="form-row">
                                    <div className="form-group col-md-3">
                                        <label for="poids">Poids</label>
                                        <input type="text" name="poids" className="form-control" value={this.state.Poids || ''} onChange={this.handlePoidsChange} readOnly />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="taille">Taille</label>
                                        <input type="text" name="taille" className="form-control" value={this.state.Taille || ''} onChange={this.handleTailleChange} readOnly />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="bloodGrp">Groupe</label>
                                        <select id="bloodGrp" value={this.state.GroupeSanguin || ''} className="form-control" onChange={this.handleGroupeSanguinChange} disabled>
                                            <option>...</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="question">
                                <p>Avez vous des allergies ?</p>
                                <div className="question-answer">
                                    <div className="form-check form-check-inline" >
                                        <label htmlFor="radio_1" className="form-check-label"><span>Oui</span></label>
                                        <input type="radio" value="Oui" id="radio_1" className="form-check-input" name="allergie" onChange={this.handleallergiesChange} disabled />
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <label htmlFor="radio_2" className="form-check-label"><span>Non</span></label>
                                        <input type="radio" value="Non" id="radio_2" className="form-check-input" name="allergie" onChange={this.handleallergiesChange} disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row" style={{ display: "none" }} id="autreAlleg">
                                <div className="form-group col-md-5">
                                    <label for="otherAl">A quoi êtes vous allergiques ?</label>
                                    <input type="text" id="otherAl" className="form-control" onChange={this.handleautreAllergieChange} value={this.state.autreAllergie || ''} readOnly />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-5">
                                    <label for="other">A savoir sur vous</label>
                                    <textarea rows="3" id="other" onChange={this.handleAutreChange} className="form-control" readOnly value={this.state.Autre || ''}></textarea>
                                </div>
                            </div>
                            <div className="btn-block">
                                <button type="button" id="modifier" className ="btn btn-danger"  onClick={this.editerForm} >Modifier</button>
                                <input type="submit" value="Enregistrer" className ="btn btn-primary"  id="save" style={{ display: 'none' }} />
                            </div>
                     </form>
                </div>
                </div>

                </div>
            </div>

        )
    }
}

export default DonneesPatient