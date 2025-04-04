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
            <section className="home-page-container" style={{ paddingTop: 150 }}>
                    <div className="title">
                        <h1>
                            Your Health:<br/>
                            <span className="text-highlight"> 
                                Anytime, Anywhere
                            </span>
                        </h1>
                    </div>
          
                    <div className="description">
                        <p className="large-body">
                        Connects you with trusted doctors and specialists for online consultations and find prescriptions—bringing quality healthcare to your doorstep, no matter where you are.
                        </p>
                    </div>
        
                    <div className="cta">
                        {isLoggedIn ? (
                            <>
                            <Link to="/search">
                                <button className="button" id="ctaButton">Make an Appointment</button>
                            </Link>
                            </>
                        ) : (
                            <Link to="/signup">
                                <button className="button" id="ctaButton">Let’s Get Started</button>
                            </Link>
                        )}
                    </div>   
            </section>
    );
};


export default LandingPage;