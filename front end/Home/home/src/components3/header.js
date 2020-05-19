import React, { Component } from 'react'
import { withRouter} from 'react-router-dom'
import axios from 'axios'
import { Link,Redirect } from "react-router-dom"




class Entete  extends Component{
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
    timer = new Date()
    render(){
    return (
        <header id="head">
        <div id="name">
            Test
        </div>
        <div id="time">
            { this.timer.getDay() + "/" + this.timer.getMonth()+ "/" + this.timer.getFullYear() +"-"+ this.timer.getHours() + ":" +this.timer.getMinutes()}
        </div>    
        </header>
    )
    }
}
export default withRouter(Entete)