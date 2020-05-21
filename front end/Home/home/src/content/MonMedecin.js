import React, { Component } from 'react'
import './Mon_Medecin.css'
import axios from 'axios'
import ProfMed from './profilNosMed'
import Discussion from './Discussion'
import io from "socket.io-client";




class MonMedecin extends Component {

	constructor(props) {
		super(props)
		this.state = {
			MedInfos: " ",
			renderProfil: false,
			renderDiscuss: false,
			uerSessionName: "  ",
			MedEnAttentent : " "
		}
		this.handleMessage = this.handleMessage.bind(this)
		this.handleProfil = this.handleProfil.bind(this)
	}

	componentDidMount() {
			
		axios
			.get('http://127.0.0.1:5000/getConsMed')
			.then(response => {
				if(response.data ==="attente"){
						this.setState({
							MedEnAttentent : "yes"
						})
				}else{
				
				this.setState({
					MedInfos: response.data[0]
				})
				console.log(this.state.MedInfos)
				axios
				.get('http://127.0.0.1:5000/getSession')
				.then(response => {
					this.setState({
						uerSessionName: response.data
					})
					let private_mess = io.connect("http://localhost:5000/private")
        			console.log('user email sent successfully')
        			private_mess.emit("username", this.state);
	
				})
				.catch(erreur => {
					console.log(erreur)
				})
			}

			})
			.catch(erreur => {
				console.log(erreur)
			})

			

	



	}
	handleProfil = () => {

		this.setState({
			renderProfil: true,
			renderDiscuss: false

		})

	}
	handleMessage = () => {


		this.setState({
			renderProfil: false,
			renderDiscuss: true
		})
	}


	render() {

		

		const renderComp = () => {

			if (this.state.renderProfil === true) {
				return <ProfMed userId={this.state.MedInfos[17]} />
			} else if (this.state.renderDiscuss === true) {
				return <p><Discussion email={this.state.MedInfos[20]} userEmail ={this.state.uerSessionName} /></p>
			} else {
				return <p>Notification</p>
			}
		}

		const renderComponent = () =>{
			if(this.state.MedEnAttentent ==="yes"){
				return(<p>Medecin En attente</p>)
			}else {
				return(<div className="container">
					<div className="row profile">
						<div className="col-md-3">
							<div className="profile-sidebar">


								<div className="profile-usertitle">
									<div className="profile-usertitle-name">
										{this.state.MedInfos[18] + ' ' + this.state.MedInfos[19]}<span className="fa fa-envelope small pull-right"> </span>
									</div>
									<div className="profile-usertitle-job">
										{this.state.MedInfos[2]}
									</div>
								</div>
								<div className="text-center">
									<img src={this.state.MedInfos[15] || "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"} className="avatar img-circle img-thumbnail" alt="avatar" />
								</div>
								<div className="profile-userbuttons">
									<button type="button" id="follow" onClick={() => { this.handleProfil() }}>Profil</button>
									<button type="button" id="follow" onClick={() => { this.handleMessage() }}>Discussion</button>
								</div>
								{/*<div className="profile-usermenu">
									<ul className="nav">
										
										<li>
											<a href="#" target="_blank">
												<i className="glyphicon glyphicon-ok"></i>
							Tasks </a>
										</li>
										<li>
											<a href="#">
												<i className="glyphicon glyphicon-flag"></i>
							Help </a>
										</li>
									</ul>
								</div>*/}
							</div>
						</div>
						<div className="col-md-9">
							<div className="profile-content">
								{renderComp()}

							</div>
						</div>
					</div>
				</div>)
			}
		}

		return (
			<div>
				
				{renderComponent()}
				<center>
				</center>
				<br />

			</div>
		)
	}
}
export default MonMedecin