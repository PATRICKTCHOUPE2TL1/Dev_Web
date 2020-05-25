import React ,{Component} from 'react'
import { storage } from './firebase/firebase'
import axios from 'axios'
import { Link } from "react-router-dom"


class ConfirmId  extends Component{
    constructor(props){
        super(props)
    this.state ={
        userId:this.props.location.state,
        email : " ",
            MedCarteId : " ",
            preuveMed : " ",
            selectedFile1: " ",
            selectedFile2 : " "
    }
    this.handleUploadCarte = this.handleUploadCarte.bind(this)
    this.handleUploadMed = this.handleUploadMed.bind(this)
    this.handleCarteId = this.handleCarteId.bind(this)
    this.handleEmailChange =this.handleEmailChange.bind(this)
    this. handlehandlePreuveMed = this. handlehandlePreuveMed.bind(this)
    }
    handleUploadCarte = () => {
        const image = this.state.selectedFile1
        const uploadTask = storage.ref(`docMed/${image.name}`).put(image)
        uploadTask.on('state_changed', (snapshot) => {
            //progess function ..........
        }, (error) => {
            //error function ............
            console.log(error)
        }, () => {
            //complete function ..........
            storage.ref('docMed').child(image.name).getDownloadURL().then(url => {
                this.setState({
                    MedCarteId: url
                })
            })
        })
    }
    
    handleUploadMed = () => {
        const image = this.state.selectedFile2
        const uploadTask = storage.ref(`docMed/${image.name}`).put(image)
        uploadTask.on('state_changed', (snapshot) => {
            //progess function ..........
        }, (error) => {
            //error function ............
            console.log(error)
        }, () => {
            //complete function ..........
            storage.ref('docMed').child(image.name).getDownloadURL().then(url => {
                this.setState({
                    preuveMed: url
                })
            })
        })
    }
    handleCarteId = (e) => {
        this.setState({
            selectedFile1: e.target.files[0]
        })


    }
    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        })
    }

    handlehandlePreuveMed = (e) => {
        this.setState({
            selectedFile2: e.target.files[0]
        })


    }
    handleSubmit = event =>{
       event.preventDefault();
         if((this.state.MedCarteId == " ")||(this.state.preuveMed === " " )||(this.state.email === " ")){
            alert("veuiller donner toutes les info")
        }else {
            axios
            .post('http://127.0.0.1:5000/AddMed', this.state)
            .then(reponse => {
            })
            .catch(erreur => {
                console.log(erreur)
            })


        }

        document.getElementById("valider").innerHTML = "<div><h5>Merci pour Les informations fournies.</h5><h5>Nous vous contacterons sur l'addresse email que vous venez de fournir une fois que tout est en ordre<h5></div>"   
        document.getElementById("valider").style.backgroundColor="rgba(253,27,15,0.3)"
    }

    render(){
        return(
            <div className="container bootstrap snippet">
                <div>
                    <h1>Votre compte est en cours de création, veuillez fournir les informations suivantes pour finaliser sa création.</h1>
                    <br />
                    <br />
                    <hr />
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row"> 
                            <div className="form-group col-md-5">
                                <label htmlFor="slctImg">Pièce d'identité (.pdf,.jpg)</label>
                                <input type="file" className="form-control" accept = '.pdf,.jpg' onChange={this.handleCarteId} id="slctImg" />
                            </div>
                            <div className="form-group col-md-3">
                                <button type="button" className="btn btn-success" onClick={() => { this.handleUploadCarte() }}  id="upldImg" >Upload 1</button>
                            </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            <label htmlFor="slctImg">Certificat de médecine (.pdf,.jpg)</label>
                            <input type="file"  className="form-control" accept = '.pdf,.jpg' onChange={this.handlehandlePreuveMed} id="slctImg" />
                        </div>
                        <div className="form-group col-md-3">
                            <button type="button" className="btn btn-success" onClick={() => { this.handleUploadMed() }}  id="upldImg" >Upload 2</button>
                        </div>
                    </div>
                    <div  className="form-row">
                        <div className="form-group col-md-5">
                            <label htmlFor="email">veuiller fournir votre address email avec le quel on peut vous contacter</label>
                            <input type="text" id="email" className="form-control" name="emailPers" placeholder="email" value={this.state.email} required onChange={this.handleEmailChange} />
                        </div>
                    </div>
                    <div>
                    </div>
                        <input type="submit" className="btn btn-primary" value="Enregistrer" id="save"  /><br /><br />
                        <div id ="valider" style ={{width :'60%',border:"solid,2px,gray",  borderRadius :"4px"}}></div>
                        <Link to ='/Login' > <button type = "button" className="btn btn-primary" value ="retour" id="retour" >Accueil</button> </Link>
                       
                </form>
            </div>
        )
    }
}
export default ConfirmId