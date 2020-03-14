import React, { Component} from 'react'
import { Link } from "react-router-dom"

class Home extends Component {
    constructor(props ){
        super(props)
    }

    render (){
        return(
            <div>
            <h1>Welcome to my home page !</h1>
            <Link to = "/login"><a href ="#">Login</a></Link><br/>
            <Link to = "/signin"><a href ="#">Signin</a></Link><br/>

            </div>
        )
    }
}

export default  Home

