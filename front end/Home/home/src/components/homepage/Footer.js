import React from 'react'
import './Footer.css'
//import styled from 'styled-components'

function Footer() {
    return (
        <div className="main-footer">
            <div className="footer-middle">
            <div className="container">
            <div><p className="Advise">Takecare n'est pas un <b>service d'urgence</b>,en cas d'urgences contactez le <em>115</em> depuis l'Europe.</p></div>

                <div className="row">
                    <div className="col-md-3 col-sm-6">
                            <br/><h4>Contact Us</h4>
                            <ul className="list-unstyled">
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">Facebook</a></li>
                                <li><a href="#">Youtube</a></li>
                            </ul>
                    </div>
                    <div className="col-md-3 col-sm-6">
                            <br/><h4>Lorem ipsum</h4>
                            <ul className="list-unstyled">
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                            </ul>
                    </div>
                    <div className="col-md-3 col-sm-6">
                            <br/><h4>Lorem ipsum</h4>
                            <ul className="list-unstyled">
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                            </ul>
                    </div>
                </div>
                {/* Footer bottom */}
                <div className="footer-bottom">
                    <p className="text-xs-center">
                        &copy;{new Date().getFullYear()} TakeCare Web App - All rights reserved 
                    </p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;
