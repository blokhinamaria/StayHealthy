import React from "react";
import { Link } from 'react-router-dom';


import './Login.css' ;

function Login () {
    return (
        <>
            <div className="container" style={{ marginTop: 150 }}>
                <div className="row justify-content-center w-100">
                <div className="col-sm-8 text-center">
                    <div className="title">
                        <h2 id="title">Login</h2>
                    </div>
                    <div className="description">
                        <p> New here? <Link to="/signup">Sign Up Here</Link></p>
                    </div>
                    <div className="form-container mx-auto text-start">
                        <form>
                            
                            <div className="form-container" id="email">
                                <label for="email" className="form-label">Email Address</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter your email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required/>
                            </div>
                            <div className="form-container" id="password">
                                <label for="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter your password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" required/>  
                            </div>
                            <button type="submit" className="btn btn-primary w-100" id="submit">Submit</button>
                            <div className="text-center mt-4">
                                <a id="forgotPassword" href="#">Forgot Password?</a>
                            </div>
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

export default Login;