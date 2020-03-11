import React from "react"
import "./Entete.css"
import { Link } from "react-router-dom"


const getId = id =>{
    return document.getElementById(id)
}
const setHtml = (id , srv) => {
 getId(id).innerHTML = srv
}
const handlerConnexion = () =>{
getId('connexion').value === "se connecter" ? setHtml('connexion', '<span>Creer compte</span>') : setHtml('connexion', '<span>Se connecter</span>')
}

const Entete = props => {
    return (

       <header>
<nav class="navbar navbar-light" style={{backgroundColor: "#e3f2fd"}}>
<Link to= '/'><a class="navbar-brand" href="#">
   {/* <img src="/docs/4.4/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" />*/}
    TakeCare
  </a></Link>
 <Link to ='/Login'><button className="btn-outline-success " href="#" id ="connexion" value = "se connecter" onClick ={handlerConnexion}> <span>Se connecter</span></button></Link>
</nav>

        </header>
    )
}
export default Entete