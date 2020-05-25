import React ,{Component} from 'react'
import { storage } from './firebase/firebase'
import axios from 'axios'

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
console.log("upload success")
console.log(this.state)
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
            console.log("upload success")
            console.log(this.state)
        })
    }
    handleCarteId = (e) => {
        console.log(e.target.files[0])
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
        console.log(e.target.files[0])
        this.setState({
            selectedFile2: e.target.files[0]
        })


    }
    handleSubmit = event =>{
        event.preventDefault();
        if((this.state.MedCarteId == " ")||(this.state.preuveMed === " " )||(this.state.email === " ")){
            console.log(this.state.MedCarteId)
            console.log(this.state.preuveMed)
            console.log(this.state.email)
            alert("veuiller donner tous les info")
        }else {
            axios
            .post('http://127.0.0.1:5000/AddMed', this.state)
            .then(reponse => {
                console.log(reponse)
            })
            .catch(erreur => {
                console.log(erreur)
            })


        }


    }

    render(){
        return(
            <div>
                <div>
{console.log(this.state)}
                <h1>Message</h1>
                <br />
                <br />
                <hr />

                </div>
                
                <form onSubmit={this.handleSubmit}>
                <div>
                <input type="file" className="text-center center-block file-upload" accept = '.pdf,.jpg' onChange={this.handleCarteId} id="slctImg" />
                <button type="button" onClick={() => { this.handleUploadCarte() }}  id="upldImg" >Upload1</button>
                </div>
                <div>
                <input type="file" class="text-center center-block file-upload" accept = '.pdf,.jpg' onChange={this.handlehandlePreuveMed} id="slctImg" />
                <button type="button" onClick={() => { this.handleUploadMed() }}  id="upldImg" >Upload2</button>
                </div>
                <div>
                <input type="text" id="email" name="emailPers" placeholder="email" value={this.state.email} required onChange={this.handleEmailChange} />

                </div>
                <div>
                </div>
                <input type="submit" value="Enregistrer" id="save"  />

                </form>
                <button type ="button">Retourner</button>

            </div>
        )
    }
}
export default ConfirmId