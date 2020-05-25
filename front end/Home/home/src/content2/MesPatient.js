import React, { Component } from 'react'
import './../content/Mon_Medecin.css'
import axios from 'axios'
import Pat from './pat'
import Discussion from './Discussion'
import io from "socket.io-client";
import ProfPatients from './ProfPatients'
import ls from "local-storage"



class MesPatient extends Component {

	constructor(props) {
		super(props)
		this.state = {
			userId :ls.get("userId"),
			MedInfos: " ",
			renderProfil: false,
			renderDiscuss: false,
			uerSessionName: "  ", 
            MedEnAttentent : " ",
			loaded : " ",
			callBack : 1,
			callBack2:1,
			idPat : ' ',
			patEmail: ' '
			
        }
        
		this.handleMessage = this.handleMessage.bind(this)
		this.handleProfil = this.handleProfil.bind(this)
		this.myCallBack = this.myCallBack.bind(this)
	}
	myCallBack = (dataFromChild,dataFromChild2,dataFromChild3) => {
		if(dataFromChild === "profil"){
			this.setState({
				renderProfil :true,
				renderDiscuss :false,
				idPat : dataFromChild2,
				callBack : 1,
				patEmail : dataFromChild3
			})
		}else if(dataFromChild === "message"){
			this.setState({
				renderProfil :false,
				renderDiscuss :true,
				idPat : dataFromChild2,
				callBack2 :1,
				patEmail : dataFromChild3
			})
		}
	  }
	componentDidMount() {
			
		axios
			.post('http://127.0.0.1:5000/getConsPat',this.state)
			.then(response => {
				
                    this.setState({
                        MedInfos : response.data,
                        loaded :"true"
					})
				
			

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
				//return(<p>Profil</p>)
				if(this.state.callBack === 1){
				return(<div><p>hello</p>{this.setState({callBack : 2})}</div>)}
				else if(this.state.callBack === 2){
				return( <Pat userId={this.state.idPat}  />)
				}
			} else if (this.state.renderDiscuss === true) {
				//return (<p>message</p>)
				if(this.state.callBack2 === 1){
					return(<div><p>hello</p>{this.setState({callBack2 : 2})}</div>)}
					else if(this.state.callBack2 === 2){
					return <p><Discussion email={this.state.patEmail} userEmail ={this.state.idPat} myEmail ={this.state.MedInfos[0][0]} /></p>}
			} else {
				return <p>Notification</p>
            }
            
           
        }
        

        const arr = []
        for(let i=0; i<this.state.MedInfos.length;i++){
          arr.push(<ProfPatients key={i} idElt ={i} nom ={this.state.MedInfos[i][6]} prenom ={this.state.MedInfos[i][7]} image ={this.state.MedInfos[i][27]} userId={this.state.MedInfos[i][1]} email ={this.state.MedInfos[i][8]} callback  ={this.myCallBack}/>)
        
	  }
	  
		return (

	
		<div className="container"> 
			<div className="row profile">               
				{this.state.loaded ==="true" ? arr : <p>not loaded</p>}
			</div>
			<div className="col-md-9">
				<div className="profile-content" id="contMed">
                    {renderComp()}
				</div>
			</div>
         </div>
				
                      
			
		)
	}
}
export default MesPatient