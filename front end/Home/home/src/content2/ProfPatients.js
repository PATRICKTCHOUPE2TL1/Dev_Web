import React, { Component } from 'react'
import io from "socket.io-client"

class ProfPatients extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nom : this.props.nom,
            prenom : this.props.prenom,
            image : this.props.image,
            id : this.props.userId,
            email : this.props.email

        }
this.handleDiscussion = this.handleDiscussion.bind(this)
this.handleProfil =this.handleProfil.bind(this)
    }

    handleDiscussion =() =>{
        let private_mess = io.connect("http://localhost:5000/private")
        			console.log('user email sent successfully')
        			private_mess.emit("username", {uerSessionName : this.state.id});

        this.props.callback("message",this.state.id,this.state.email)
    }
    handleProfil = () =>{
        this.props.callback("profil",this.state.id,this.state.email)
    }

    render() {
        return (

            
                    <div className="col-md-3" id="patient">
                            <div className="text-center">
                                <img src={this.state.image || "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"} className="avatar img-circle img-thumbnail" alt="avatar" />
                            </div>
                            <div className="profile-usertitle">
                                <div className="profile-usertitle-name">
                                    {this.state.nom + ' ' + this.state.prenom}<span className="fa fa-envelope small pull-right"> </span>
                                </div>
                            </div>
                            <div className="profile-userbuttons">
                                <div>
                                    <button type="button" className ="btn btn-primary" id="follow" onClick ={() =>{this.handleProfil()}} >Profil</button>
                                </div>
                                <div>
                                    <button type="button" className ="btn btn-primary" id="follow" onClick ={() =>{this.handleDiscussion()}} >Discussion</button>
                                </div>
                            </div>
                    </div>

        )
    }
}
export default ProfPatients