import React from "react";
import { Link } from 'react-router-dom';

import './SignUp.css';

function SignUp () {
    return (
        <>
        <div className="container" style={{ marginTop: 150 }}>
            <div className="row justify-content-center w-100">
                <div className="form-container col-sm-8 text-center">
                    <div className="title">
                        <h2 id="title">Sign Up</h2>
                    </div>
                    
                    <div className="description">
                        <p> Already have an account? <Link to="/login">Login Instead</Link></p>
                    </div>
                    
                    <div className="form-container text-start">
                        <form>
                            
                            <div className="form-container">
                                <label for="accountType" className="form-label">Account for</label>
                                <select type="dropdown" className="form-select" id="accountType">
                                    <option id="accountType">Patient</option>
                                    <option id="accountType">Doctor</option>
                                </select>
                            </div>
                            
                            <div className="form-container">
                                <label for="fullName" className="form-label">Full Name</label>
                                <input type="text" className="form-control" id="fullName" placeholder="Enter your name" pattern="[A-Za-z\s'-]+" required/>
                            </div>
                            
                            <div className="form-container">
                                <label for="phone" className="form-label">Phone Number</label>
                                <input type="tel" className="form-control" id="phone"placeholder="Enter your phone number" pattern="(\+?\d{1,4}[\s-])?(\(\d{1,3}\)[\s-]?)?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,4}" required/>
                                <div id="phoneHelp" className="form-text">We'll never share your phone number with anyone</div>
                            </div>
                            
                            <div className="form-container">
                                <label for="email" className="form-label">Email Address</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter your email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required/>
                                <div id="emailHelp" className="form-text">We'll never share your email address with anyone</div>
                            </div>
                            
                            <div className="form-container">
                                <label for="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter your password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                required/>
                                <div id="passwordHelp" className="form-text">Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, a number, and a special character.
                                </div>
                            </div>
                            
                            <button type="submit" className="btn btn-primary w-100" id="submit">Submit</button>
                            
                            <div className="text-center mt-3">
                                <a id="reset" href="#">Reset</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default SignUp;