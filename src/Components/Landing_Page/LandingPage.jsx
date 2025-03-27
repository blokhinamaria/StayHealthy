import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';

import './LandingPage.css'

function LandingPage () {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
            const storedName = sessionStorage.getItem("name");
            if (storedName) {
                setIsLoggedIn(true);
            }
        })
    

    return (
        <div>
            <section className="flex-container" style={{ paddingTop: 150 }}>
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
                        Connects you with trusted doctors and specialists for online consultations and find prescriptions—bringing quality healthcare to your doorstep, no matter where you are.
                    </h4>
                    </div>
        
                    <div className="cta">
                        {isLoggedIn ? (
                            <>
                            <Link to="/StayHealthy/search">
                                <button className="button" id="ctaButton">Make an Appointment</button>
                            </Link>
                            </>
                        ) : (
                            <Link to="/StayHealthy/signup">
                                <button className="button" id="ctaButton">Let’s Get Started</button>
                            </Link>
                        )}
                    </div>   
            </section>
        </div>
    );
};


export default LandingPage;