import React, { Component } from 'react';
import EntetePat from './componnents2/header'
import NavBarPat from './componnents2/Navbar';
import './PersonalSpace.css';
import { withRouter} from "react-router-dom"


class EspacePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.userId
        }
    }
    render() {
        return (
            <div>

                <EntetePat />
                
                    <div className="App2">
                        <NavBarPat />
                         <p>Espace Patient</p>

                    </div>
            </div>
        )
    }
}
export default  withRouter(EspacePatient);