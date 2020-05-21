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
<<<<<<< HEAD
            <Link to = 'Signin'><button type="button" className="btn btn-success btn-lg" >Créer un compte gratuit</button></Link><br/><br></br>
            <Link to = '/Login' ><a href="#" className="link"><i>Vous avez déjà un compte ?</i></a></Link>
=======
            <Link to = 'Signin'><button type="button" id="btn" class="btn btn-success btn-lg" target="blank" >Créer un compte gratuit</button></Link><br/><br></br>
            <Link to = '/Login'><a href="#" className="link"><i>Vous avez déjà un compte ?</i></a></Link>
>>>>>>> f67313fc34587786cc01f99abe77cdf067f0f425
            </p>
        </div>
    )
}
export default Home