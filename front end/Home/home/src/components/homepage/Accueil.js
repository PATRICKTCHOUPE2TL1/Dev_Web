import React, { Component} from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "./Navbar"
import Home from './Home'
import Footer from './Footer'




class Accueil extends Component {
    constructor(props ){
        super(props)
    }
  render (){
        return(     
      <div className="App">
          <Navbar />
          <Home />
          <Footer />
      </div>
            
        )
    }
}

export default Accueil

