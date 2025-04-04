import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { API_URL } from '../../config.js';


const Login = () => {
    // State variables for email and password
    const [name, setName] = useState("");
    const [password, setPassword] = useState ("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "" });

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
        setLoading(true);
        setErrors({ email: "", password: "" }); //Reset errors before the new request
    
        try {
            // Send a POST request to the login API endpoint
          const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: name,
              phone: phone,  
              email: email,
              password: password,
            }),
          });
          
          const json = await response.json();

        if (!response.ok) {
            console.error(`Server responded with ${response.status}:`, json);

            if (json.error) {
              if (json.error.includes("Email")) {
                  setErrors((prevErrors) => ({ ...prevErrors, email: json.error }));
              }
              if (json.error.includes("Password")) {
                  setErrors((prevErrors) => ({ ...prevErrors, password: json.error }));
              }
          }

          if (json.errors) {
            const fieldErrors = {};
            json.errors.forEach((error) => {
                if (error.param === "email") fieldErrors.email = error.msg;
                if (error.param === "password") fieldErrors.password = error.msg;
            });
            setErrors(fieldErrors);
        }
        return; // Stop execution here if login fails
    }

        console.log("Success:", json);

        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", json.user.name);
            sessionStorage.setItem("phone", json.user.phone);
            sessionStorage.setItem("email", json.user.email);
            sessionStorage.setItem("accountType", json.user.accountType);
            navigate('/');
            window.location.reload();
        }
    } catch (error) {
        console.error("Fetch error:", error);
    } finally {
        setLoading(false);
    }
};

    return (
        <>
            <div className="container" style={{ marginTop: 150 }}>
                <div className="row justify-content-center w-100">
                <div className="col-sm-8 text-center">
                    <div className="intro">
                        <h2>Login</h2>
                    </div>
                    <div>
                        <p className="medium-body"> New here? <Link className="link" to="/signup">Sign Up Here</Link></p>
                    </div>
                    <div className="form-container mx-auto text-start">
                        <form onSubmit={login}>
                            
                            <div className="form-container">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" className="form-control" id="email" placeholder="Enter your email" aria-describedby="helpEmail" required/>
                                {errors.email && <p className="text-danger mt-1">We don't have this email address</p>}
                            </div>
                            <div className="form-container">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" className="form-control" id="password" placeholder="Enter your password" required/>  
                                {errors.password && <p className="text-danger mt-1">The password doesn't match the email address</p>}
                            </div>
                            <button type="submit" className="button w-100" id="submit" disabled={loading}>
                              {loading ? "Logging in..." : "Login"}
                            </button>
                            {/* Loading spinner */}
                              {loading && (
                                <div className="text-center mt-3">
                                    <div className="spinner-border" role="status"></div>
                                    <p className="medium-body">We are using the free server for this project demonstration, so the request can take slightly longer. Thank you for your patience!</p>
                                </div>
                              )}
                            <div className="text-center mt-4">
                                <a className="secondary-link" id="forgotPassword" href="#">Forgot Password?</a>
                            </div>
                        </form>
                    </div>
                    <div>
                        <p className="medium-body">
                            You can login with your credentials or use the sample credentials for the test <br></br>
                            Email: <strong>mm@mail.com</strong><br></br>Password: <strong>$wcq6F7Mzw$U</strong>
                        </p>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
};

export default Login;