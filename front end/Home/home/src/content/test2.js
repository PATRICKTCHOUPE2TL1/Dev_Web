import React ,{Component} from 'react'
import './Test2.css'
import av from "../image/av.png"
import axios from 'axios'
import ProfMed from './profilNosMed'
import Discussion from './Discussion'
import io from "socket.io-client";




class Test2 extends Component{

constructor(props){
	super(props)
	this.state = {
		MedInfos : " ",
		renderProfil : false,
		renderDiscuss : false
	}
	this.handleMessage = this.handleMessage.bind(this)
	this.handleProfil = this.handleProfil.bind(this)
}

componentDidMount() {
	axios
		.get('http://127.0.0.1:5000/getConsMed')
		.then(response => {
			console.log(response.data[0])
			this.setState({
				MedInfos : response.data[0]
			})

		})
		.catch(erreur => {
			console.log(erreur)
		})

}
handleProfil = () =>{

	this.setState({
		renderProfil : true,
		renderDiscuss :false

	})

}
handleMessage = () =>{
	let private_mess = io.connect("http://localhost:5000/private")
	private_mess.emit("username", this.state.MedInfos[19]);


		this.setState({
			renderProfil : false,
			renderDiscuss :true
		})
}


render(){
 
	const renderComp = () =>{
		if(this.state.renderProfil ===true){
			return <ProfMed userId ={this.state.MedInfos[15]} />
		}else if(this.state.renderDiscuss ===true){
			return <p><Discussion  email ={this.state.MedInfos[19]}/></p>
		}else {
			return <p>default</p>
		}
	}

    return(
        <div>
            <div class="container">
    <div className="row profile">
		<div className="col-md-3">
			<div className="profile-sidebar">
				
				
				<div className="profile-usertitle">
					<div className="profile-usertitle-name">
						{this.state.MedInfos[17] + ' '+this.state.MedInfos[18]}<span class="fa fa-envelope small pull-right"> </span>
					</div>
					<div className="profile-usertitle-job">
						{this.state.MedInfos[2]}
					</div>
				</div>
				<div class="text-center">
				<img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar" />
				</div>
				<div className="profile-userbuttons">
					<button type="button" id="follow" onClick ={() =>{this.handleProfil()}}>Profil</button>
					<button type="button" id="follow" onClick ={() =>{this.handleMessage()}}>Discussion</button>
				</div>
				<div className="profile-usermenu">
					<ul className="nav">
						<li className="active">
							<a href="#">
							<i className="glyphicon glyphicon-home"></i>
							Overview </a>
						</li>
						<li>
							<a href="#">
							<i className="glyphicon glyphicon-user"></i>
							Account Settings </a>
						</li>
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
				</div>
			</div>
		</div>
		<div className="col-md-9">
            <div className="profile-content">
			{renderComp()}
			   
            </div>
		</div>
	</div>
</div>
<center>
<strong>Powered by <a href="http://j.mp/metronictheme" target="_blank">KeenThemes</a></strong>
</center>
<br/>

        </div>
    )
}
}
export default Test2