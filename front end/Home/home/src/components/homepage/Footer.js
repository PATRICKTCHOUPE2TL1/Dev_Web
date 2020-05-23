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
                                <li><a href="">Twitter</a></li>
                                <li><a href="">Facebook</a></li>
                                <li><a href="">Youtube</a></li>
                            </ul>
                    </div>
                    <div className="col-md-3 col-sm-6">
                            <br/><h4>Actualités</h4>
                            <ul className="list-unstyled">
                                <li><a href="https://www.info-coronavirus.be/fr/" target = "blank">Covid-19 : Précautions</a></li>
                                <li><a href="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6" target = "blank">Carte mondiale des cas</a></li>
                                <li><a href="https://huis.vub.ac.be/corona/intro.php?taal=Fra" target = "blank">Test préventif</a></li>
                            </ul>
                    </div>
                </div>
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
