import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { API_URL } from '../../config.js';

import './Login.css' ;

const Login = () => {
    // State variables for email and password
    const [name, setName] = useState("");
    const [password, setPassword] = useState ("");
    const [email, setEmail] = useState("");


    const navigate = useNavigate();

    //Check if the user already authenticated, then redirect to home page
    useEffect(() => {
        if (sessionStorage.getItem("auth-token")) {
            navigate("/");
        }
    }, []);

    //function to handle login form submission
    const login = async (e) => {
        e.preventDefault(); // prevent default form submission
    
        try {
            // Send a POST request to the login API endpoint
          const response = await fetch(`${API_URL}api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: name,  
              email: email,
              password: password,
            }),
          });
          
          if (!response.ok) {
            const text = await response.text(); // Read response even if JSON parsing fails
            console.error(`Server responded with ${response.status}: ${text}`);
            throw new Error(`Server Error ${response.status}: ${text}`);
          }
      
          // Parse the response JSON
          const json = await response.json();
          console.log('Success:', json);
      
          // If authentication token is received, store it in session storage
          if (json.authtoken) {
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('name', json.user.name);
            sessionStorage.setItem('phone', json.user.phone);
            sessionStorage.setItem('email', json.user.email);
            sessionStorage.setItem('accountType', json.user.accountType);
            navigate('/');
            window.location.reload();
          } else {
            
            alert(json.errors ? json.errors.map((error) => error.msg).join(", ") : json.error);

          }
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };

      //password for test $wcq6F7Mzw$U

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
                        <form onSubmit={login}>
                            
                            <div className="form-container">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" className="form-control" id="email" placeholder="Enter your email" aria-describedby="helpEmail" required/>
                                
                            </div>
                            <div className="form-container">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" className="form-control" id="password" placeholder="Enter your password" required/>  
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