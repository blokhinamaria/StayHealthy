import React, {use, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';

import './SignUp.css';


// import { API_URL } from './src/config.js';

const SignUp = () => {

    //State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('');
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();
    const API_URL = "http://localhost:8181";

    //password for test $wcq6F7Mzw$U

    //Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // prevent default form submission
    
        let data;
        try {
          const response = await fetch(`${API_URL}/api/auth/register`, {
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
          console.log('Success:', data);
      
          // Store user data in session storage
          if (json.authtoken) {
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('name', name);
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
        <div className="container" style={{ marginTop: 150 }}>
            <div className="row justify-content-center w-100">
                <div className="col-sm-8 text-center">
                    <div className="title">
                        <h2 id="title">Sign Up</h2>
                    </div>
                    
                    <div className="description">
                        <p> Already have an account? <Link to="/login">Login Instead</Link></p>
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
                            
                            <button type="submit" className="btn btn-primary w-100" id="submit" disabled={accountType === "Doctor"}>Submit</button>
                            
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