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
                <div id="top1">
                    <EntetePat />
                </div>
                <div id="bar1">
                    <NavBarPat />
                </div>
                <div className="text-muted" id="bottom1">
                        &copy;{new Date().getFullYear()} TakeCare Web App - All rights reserved
                </div>
            </div>
        )
    }
}
export default  withRouter(EspacePatient);