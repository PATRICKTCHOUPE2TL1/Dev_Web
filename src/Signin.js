import React,{Component} from 'react'
import './SignIn.css'

class SignIn extends Component {

    constructor(props){

        super(props);
        this.state =  {
            nom : ' ',
            prenom : ' ',
            email : ' ',
            motDepasse :' ',
            dateNaiss : ' ',
            nationalite : ' ',
            sexe : ' ',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNomChange = this.handleNomChange.bind(this);
        this.handlePrenomChange = this.handlePrenomChange.bind(this);
        this.handleEmailChange =this.handleEmailChange.bind(this);
        this.handlePasswordChange =this.handlePasswordChange.bind(this);
        this.handleDateNaiss = this.handleDateNaiss.bind(this);
        this.handleNationaliteChange = this.handleNationaliteChange.bind(this);
        this.handleSexeChange =this.handleSexeChange.bind(this);
    }
    handleNomChange = event =>{
        this.setState({
            nom : event.target.value
        })

    };
    handlePrenomChange = event =>{
        this.setState({
            prenom : event.target.value
        })
    };
    handleEmailChange = event =>{
        this.setState({
            email : event.target.value
        })
    };
    handlePasswordChange = event =>{
        this.setState({
            password: event.target.value
        })
    };
    handleDateNaiss = event =>{
        this.setState({
            dateNaiss : event.target.value
        })
    };
    handleNationaliteChange = event =>{
        this.setState({
            nationalite : event.target.value
        })
    };
    handleSexeChange = event =>{
        this.setState({
            sexe: event.target.value
        })
    };
    handleSubmit = event =>{
        console.log(this.state.nom);
        event.preventDefault();
    };


    render() {
        return (
            <form onSubmit={this.handleSubmit }>
                <div>
                    <legend>Cree un Compte</legend>
                </div>
                <div>
                    <label htmlFor= 'nom'>Nom :</label>
                    <input type ="text" id = 'nom' placeholder= "username" required  onChange={this.handleNomChange}/>
                </div>
                <div>
                    <label htmlFor= 'prenom'>PreNom :</label>
                    <input type ="text" id ='prenom' placeholder= "username" required  onChange={this.handlePrenomChange}/>
                </div>
                <div>
                    <label htmlFor='email'>Email :</label>
                    <input type ="text" id='email' placeholder= "Email" required  onChange={this.handleEmailChange}/>
                </div>
                <div>
                    <label htmlFor='password'> Mot de passe :</label>
                    <input type ="password" id="password" placeholder= "password" required onChange={this.handlePasswordChange}/>
                </div>
                <div>
                    <label htmlFor="confpassword"> Confirmer Mot de passe :</label>
                    <input type ="password" id="confpassword" placeholder= "password" required />
                </div>
                <div>
                <label htmlFor= "dateNaiss">Date de Naissance</label>
                <input type = "date" id ="dateNaiss" required onChange={this.handleDateNaiss}/>

                </div>
                <div>
                    <label htmlFor ="country">Nationalité :</label>
                    <select id="country">
                        <option value="cameroun">Cameroun</option>
                        <option value ="gabon"> Gabon</option>
                    </select>
                </div>
                <div>
                    <label>Sexe :</label>
                </div>
                <div>
                    <label htmlFor="male">Male :</label>
                    <input type='radio' name ="sexe" value ="male" id = "male"/>
                </div>
                <div>
                    <label htmlFor="female">Female :</label>
                    <input type='radio' name ="sexe" value ="Female" id="female"/>
                </div>


                <div>
                    <input type="submit" value ="Creer compte" className="creer"/>
                </div>

            </form>
        )

    }
}
export default SignIn
