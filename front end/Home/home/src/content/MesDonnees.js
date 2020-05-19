import React, { Component } from 'react'
import axios from 'axios'
import './../content2/MesDonneesMed.css'
import { storage } from './../firebase/firebase'
class MesDonnees extends Component {
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
                console.log(response)
                let value = response.data

                this.setState(
                    {
                        Genre: value[0][1],
                        DateNaiss: value[0][2],
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
                        nom: value[0][19],
                        prenom: value[0][20],
                        imageUrl:value[0][16]
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
        console.log(this.state)
        axios
            .post('http://127.0.0.1:5000/savedata', this.state)
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
        document.getElementById('slctImg').style.display ='block'
        document.getElementById('upldImg').style.display ='block'

    }
    handlePorfile = (e) => {
        console.log(e.target.files[0])
        this.setState({
            selectedFile: e.target.files[0]
        })


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

    render() {
        return (

            <div class="container bootstrap snippet">
                
                <div class="row">
                    <div class="col-sm-3">


                        <div class="text-center">
                            <img src={this.state.imageUrl || "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"} class="avatar img-circle img-thumbnail" alt="avatar" />
                            <input type="file" class="text-center center-block file-upload" onChange={this.handlePorfile} id="slctImg" style={{ display: 'none' }}/>
                            <button type="button" onClick={() => { this.handleUpload() }} style={{ display: 'none' }} id="upldImg" >Upload</button>
                        </div><hr /><br />


                      {/*  <div class="panel panel-default">
                            <div class="panel-heading">Website <i class="fa fa-link fa-1x"></i></div>

        </div>*/}


                       {/*} <ul class="list-group">
                            <li class="list-group-item text-muted">Activity <i class="fa fa-dashboard fa-1x"></i></li>
                            <li class="list-group-item text-right"><span class="pull-left"><strong>Nombre De Patient</strong></span> 125</li>
                            <li class="list-group-item text-right"><span class="pull-left"><strong>Likes</strong></span> 13</li>
                            <li class="list-group-item text-right"><span class="pull-left"><strong>Posts</strong></span> 37</li>
                            <li class="list-group-item text-right"><span class="pull-left"><strong>Followers</strong></span> 78</li>
                        </ul>*/}

                       {/* <div class="panel panel-default">
                            <div class="panel-heading">Social Media</div>
                            <div class="panel-body">
                                <i class="fa fa-facebook fa-2x"></i> <i class="fa fa-github fa-2x"></i> <i class="fa fa-twitter fa-2x"></i> <i class="fa fa-pinterest fa-2x"></i> <i class="fa fa-google-plus fa-2x"></i>
                            </div>
                    </div>*/}

                    </div>
                    <div class="col-sm-9">
                       {/* <ul class="nav nav-tabs">
                            <li class="active"><a data-toggle="tab" href="#home">Home</a></li>
                            <li><a data-toggle="tab" href="#messages">Menu 1</a></li>
                            <li><a data-toggle="tab" href="#settings">Menu 2</a></li>
                        </ul>*/}


                        <div class="tab-content">


                            <form id="profPatient" onSubmit={this.handleSubmit}>

                                <div className="item">
                                    <p>Profil</p>

                                    <div class="city-item">
                                        <input type="text" id="nom" name="name" placeholder="Nom" value={this.state.nom} required onChange={this.handleNomChange} disabled />
                                        <input type="text" id="prenom" name="name" placeholder="Prenom" value={this.state.prenom} required onChange={this.handlePrenomChange} disabled />


                                        <select required onChange={this.handleGenreChange} value={this.state.Genre} id="genre" disabled>
                                            <option value="" disabled selected>Genre</option>
                                            <option value="Masculin">Masculin</option>
                                            <option value="Feminin">Feminin</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                        <input type="date" name="bdate" value={this.state.DateNaiss} onChange={this.handleDateNaissChange} readOnly />
                                        <i class="fas fa-calendar-alt"></i>
                                    </div>
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
                                <p>Carnet Medical</p>
                                <div className="item">
                                    <p>Poids</p>
                                    <div className="city-item">
                                        <input type="text" name="poids" placeholder="Poids" value={this.state.Poids} onChange={this.handlePoidsChange} readOnly />
                                        <input type="text" name="taille" placeholder="Taille" value={this.state.Taille} onChange={this.handleTailleChange} readOnly />
                                        <select required id="bloodGrp" value={this.state.GroupeSanguin} onChange={this.handleGroupeSanguinChange} disabled>
                                            <option value=" " disabled selected>Groupe Sanguin</option>
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
                                <div class="question">
                                    <p>Avez vous des allergies ?</p>
                                    <div class="question-answer">
                                        <div>
                                            <input type="radio" value="Oui" id="radio_1" name="allergie" onChange={this.handleallergiesChange} disabled />
                                            <label for="radio_1" class="radio"><span>oui</span></label>

                                            <input type="radio" value="Non" id="radio_2" name="allergie" onChange={this.handleallergiesChange} disabled />
                                            <label for="radio_2" class="radio"><span>Non</span></label>
                                        </div>
                                    </div>
                                </div>
                                <div className="item" style={{ display: "none" }} id="autreAlleg">
                                    <p>A quoi etes vous allergique?</p>
                                    <div className="city-item">
                                        <input type="text" onChange={this.handleallergiesChange} value={this.state.autreAllergie} readOnly />
                                    </div>
                                </div>

                                <div className="item">
                                    <p>A savoir sur vous</p>
                                    <textarea rows="3" onChange={this.handleAutreChange} readOnly value={this.state.Autre}></textarea>
                                </div>
                                <div className="btn-block">
                                    <button type="button" id="modifier" onClick={this.editerForm} >Modifier</button>
                                    <input type="submit" value="Enregistrer" id="save" style={{ display: 'none' }} />
                                </div>

                            </form>

                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default MesDonnees