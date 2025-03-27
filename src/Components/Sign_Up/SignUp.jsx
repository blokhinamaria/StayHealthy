import React, {use, useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';

import './SignUp.css';


import { API_URL } from '../../config.js';


const SignUp = () => {

    //password for test $wcq6F7Mzw$U

    //State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('');
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();

    //Check if logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
      const storedName = sessionStorage.getItem("name");
          if (storedName) {
              setIsLoggedIn(true);
              }
            })

    //Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // prevent default form submission
    
        
        try {
          const response = await fetch(`${API_URL}api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              accountType: accountType,
              name: name,
              phone: phone,
              email: email,
              password: password,
            }),
          });
          
          if (!response.ok) {
            const text = await response.text(); // Read response even if JSON parsing fails
            console.error(`Server responded with ${response.status}: ${text}`);
            throw new Error(`Server Error ${response.status}: ${text}`);
          }
      
            
          const json = await response.json();
          console.log('Success:', json);
          
      
          // Store user data in session storage
          if (json.authtoken) {
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('name', name);
            sessionStorage.setItem('phone', phone);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('accountType', accountType);
            navigate('/');
            window.location.reload();
          } else {
            if (json.errors) {
              setShowerr(json.errors.map((error) => error.msg));
            } else {
              setShowerr(json.error);
            }
          }
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };

    return (
      <>
        {isLoggedIn ? (
          
            <div className="container" style={{ marginTop: 150 }}>
              <div className="row justify-content-center w-100">
                <div className="col-sm-8 text-center">
                  <div className="intro">
                    <h2>You already have an account</h2>
                  </div>
                
                  <div className="description">
                    <p>If you need to create another account, Logout and Sign Up again </p>
                  </div>
                </div>
              </div>
            </div>
      ) : (
        <div>
        <div className="container" style={{ marginTop: 150 }}>
            <div className="row justify-content-center w-100">
                <div className="col-sm-8 text-center">
                    <div className="intro">
                        <h2>Sign Up</h2>
                    </div>
                    
                    <div className="description">
                        <p> Already have an account? <Link to="/StayHealthy/login">Login Instead</Link></p>
                    </div>
                    
                    <div className="form-container mx-auto text-start">
                        <form id="SignUp" method="POST" onSubmit={register}>
                            
                            <div className="form-container">
                                <label htmlFor="accountType" className="form-label">Account for</label>
                                <select onChange={(e) => setAccountType(e.target.value)} className="form-select" id="accountType" defaultValue="Patient">
                                    <option value="Patient">Patient</option>
                                    <option value="Doctor">Doctor</option>
                                </select>
                                {accountType === "Doctor" && <div className="err" style={{color: "red"}}>The account type for Doctors is not available at this time.</div>}
                            </div>
                            
                            <div className="form-container">
                                <label htmlFor="name" className="form-label">Full Name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" className="form-control"  placeholder="Enter your name"  required/> 
                                {showerr && <div className="err" style={{color:'red'}}>{showerr}</div>}
                            </div>
                            
                            <div className="form-container">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="form-control" id="phone" placeholder="Enter your phone number"  aria-describedby="phoneHelp" required/>
                                {showerr ? (
                                    <div className="err" style={{ color: "red"}}>{showerr}</div>
                                    ) : (
                                    <div id="phoneHelp" className="form-text">We'll never share your phone number with anyone</div>
                                    )}            
                            </div>
                            
                            <div className="form-container">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="Enter your email" aria-describedby="emailHelp" required/>
                                {showerr ? (
                                    <div className="err" style={{color: "red"}}>{showerr}</div>
                                    ) : (
                                    <div id="emailHelp" className="form-text">We'll never share your email address with anyone</div>
                                    )}
                            </div>
                            
                            <div className="form-container">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Enter your password"  aria-describedby={showerr? "passwordError" : "passwordHelp"}
                                required/>
                                {showerr ? (
                                    <div id="passwordError" className="err" style={{color: "red"}}>{showerr}</div>
                                    ) : (
                                    <div id="passwordHelp" className="form-text">Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, a number, and a special character.
                                    </div>
                                )}
                            </div>
                            
                            <button type="submit" className="button w-100" id="submit" disabled={accountType === "Doctor"}>Create Account</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
      )}
      </> 
    );
};

export default SignUp;