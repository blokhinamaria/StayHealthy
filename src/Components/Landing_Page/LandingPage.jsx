import React from "react";

import './LandingPage.css'

function LandingPage () {
    return (
        <div>
            <section className="flex-container">
                    <div className="title">
                            <h1>
                                Your Health:<br/>
                                <span className="text-highlight"> 
                                    Anytime, Anywhere
                                </span>
                            </h1>
                    </div>
          
                    <div className="description">
                    <h4>
                        Connects you with trusted doctors and specialists for online consultations and prescriptions—bringing quality healthcare to your doorstep, no matter where you are.
                    </h4>
                    </div>
        
                    <div className="cta">
                        <a href="../Sign_Up/SignUp.html">
                                <button className="ctaButton">Let’s Get Started</button>
                        </a>
                    </div>
                    
            </section>
        </div>
    );
};


export default LandingPage;