import React, { Component } from 'react'
import {
    withRouter
  } from 'react-router-dom'
  import axios from 'axios'
import { Link,Redirect } from "react-router-dom"




class EntetePat  extends Component{
    constructor(props){

    super(props)
this.deconnecter = this.deconnecter.bind(this)    
}
    deconnecter = () => {

        axios.defaults.withCredentials = true
        axios
             .post('http://127.0.0.1:5000/logout', this.state,)
             .then(reponse =>{
                if(reponse.data=="success"){
                    this.props.history.push('/Login');
                  }else {
                  }
             })
             .catch(erreur =>{
                 console.log(erreur)
             })
    }
    render(){
    return (
        <header>
        <nav className="navbar navbar-light">
            <a className="navbar-brand" href="#">
                TakeCare
            </a>
            <button className="btn btn-danger " href="#" id ="deconnexion" value = "Deconnexion"  onClick = {this.deconnecter} > <span>Deconnexion</span></button>
        </nav>
        
        </header>
    )
    }
}
export default withRouter(EntetePat)