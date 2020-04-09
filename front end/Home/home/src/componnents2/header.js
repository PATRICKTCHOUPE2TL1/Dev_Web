import React from 'react'


const Entete = () =>{
    return (
        <header>
        <nav class="navbar navbar-light" style={{backgroundColor: "#e3f2fd"}}>
        <a class="navbar-brand" href="#">
           {/* <img src="/docs/4.4/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" />*/}
            TakeCare
          </a>
         <button className="btn-outline-success " href="#" id ="connexion" value = "se connecter" > <span>Se connecter</span></button>
        </nav>
        
        </header>
    )
}
export default Entete