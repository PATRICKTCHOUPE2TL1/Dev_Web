import React from 'react'
import './Home.css'
import { Link, Redirect } from "react-router-dom"

const Home = () =>{
    return (
        <div className="contain">
            <p className="text3"> 
            Un doute sur votre état de santé vous <em>turlupine</em>...
            </p><br></br>
            <p>
            <Link to = 'Signin'><button type="button" class="btn btn-success btn-lg" >Créer un compte gratuit</button></Link><br/><br></br>
            <Link to = '/Login' ><a href="#"><i>Vous avez déjà un compte ?</i></a></Link>
            </p>
        </div>
    )
}

export default Home