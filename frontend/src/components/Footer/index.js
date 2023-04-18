import React from "react";
import "./Footer.css"
import logo from "../Navigation/airbnb-11-722672.png";

const Footer = () => {
    return (
        <>

            <div id="main-footer" className="main-footer">
                <div className="main-footer-container">
                    <div className="main-footer-row">
                        <div style={{ display: "flex", alignItems: "center", color: "#ea547f" }}>
                            <img className="logo-image" src={logo} alt="logo"></img>
                            &nbsp;
                            <span className='home-button-text'>Bnb-Ria</span>
                        </div>
                        &nbsp;
                        <div>© 2023 Nick Murphy</div>
                    </div>
                    <br></br>
                    <div className="main-footer-row">
                        <a
                            className="social-icon"
                            href="https://www.linkedin.com/in/nicholas-murphy-1167b226b/"
                        >
                            <i className="fab fa-linkedin-in main-footer-icon"></i>
                        </a>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a className="social-icon" href="https://github.com/Murphyn5">
                            <i className="fab fa-github main-footer-icon"></i>
                        </a>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a className="social-icon" href="https://murphyn5.github.io/">
                            <i className="fas fa-user-circle main-footer-icon"></i>
                        </a>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a className="social-icon" href="mailto:nlimurphy@gmail.com">
                            <i className="fa-solid fa-envelope main-footer-icon"></i>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer