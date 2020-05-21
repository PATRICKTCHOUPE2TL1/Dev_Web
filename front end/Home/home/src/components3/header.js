import React, { Component } from 'react'
import { withRouter} from 'react-router-dom'
import axios from 'axios'

class EnteteMed  extends Component{
    constructor(props){

    super(props)
this.deconnecter = this.deconnecter.bind(this)    
}

    deconnecter = () => {

        axios.defaults.withCredentials = true
        axios
             .post('http://127.0.0.1:5000/logout', this.state,)
             .then(reponse =>{
                 console.log(reponse)
                if(reponse.data=="success"){
                    this.props.history.push('/Login');
                  }else {
                      console.log(reponse)
                  }
                 
             })
             .catch(erreur =>{
                 console.log(erreur)
             })
    }
    render(){
    return (
<<<<<<< HEAD
        <header>
        <nav class="navbar navbar-light" style={{backgroundColor: "#e3f2fd"}}>
        <a class="navbar-brand" href="#">
           {/* <img src="/docs/4.4/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" />*/}
            TakeCare
          </a>
         <button className="btn-outline-success " href="#" id ="deconnexion" value = "Deconnexion"  onClick = {this.deconnecter} > <span>deconnexion</span></button>
        </nav>
        
=======
        <header id="head" >
        <div id="name">
            Test
        </div>
        <div id="time">
             <button className="btn btn-danger " href="#" id ="deconnexion" value = "Deconnexion"  onClick = {this.deconnecter} > <span>Deconnexion</span></button>
        </div>    
>>>>>>> f67313fc34587786cc01f99abe77cdf067f0f425
        </header>
    )
    }
}
export default withRouter(EnteteMed)