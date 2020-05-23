import React , {Component} from 'react';
import Entete from './components3/header'

import
{
BrowserRouter as Router,
Route,
} from "react-router-dom";
import Navbar from './components3/Navbar';
import './Medecin.css'


class MedSpace extends Component {
    constructor(props){
        super(props)
        this.state ={
            id : props.userId

        }
    }
    render(){
return (
 
<div>
    <div id="top">
     <Entete />
   </div>
   <div id="bar">
    <Navbar />
   </div>
   <div className="text-muted" id="bottom">
            &copy;{new Date().getFullYear()} TakeCare Web App - All rights reserved
    </div>
</div>
)
    }
}

export default MedSpace;