import React, { Component } from 'react'
import { withRouter} from 'react-router-dom'
import axios from 'axios'
import { Link,Redirect } from "react-router-dom"




class EnteteAdmin  extends Component{
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
        <nav class="navbar navbar-light" style={{backgroundColor: "#e3f2fd"}}>
        <a class="navbar-brand" href="#">
           {/* <img src="/docs/4.4/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" />*/}
            TakeCare
          </a>
         <button className="btn-outline-success " href="#" id ="deconnexion" value = "Deconnexion"  onClick = {this.deconnecter} > <span>deconnexion</span></button>
        </nav>
        
        </header>
    )
    }
}
export default withRouter(EnteteAdmin)