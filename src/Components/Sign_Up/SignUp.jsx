import React, {use, useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { PatternFormat } from 'react-number-format';

import './SignUp.css';


import { API_URL } from '../../config.js';


const SignUp = () => {

    //password for test $wcq6F7Mzw$U

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('Patient');

  const [errors, setErrors] = useState({});  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Check if logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
        navigate("/");
        setIsLoggedIn(true);
        }
      }, []);

  //Validate form submission
      const validateForm = () => {
      setErrors({}); // Reset errors before a new request
      const newErrors = {};

      if (!/^[A-Za-z]+(?:\s[A-Za-z]+)+$/.test(name)) {
        newErrors.name = "Please enter your first and last name.";
      }

      if (!/^\+1 \(\d{3}\) \d{3} \d{4}$/.test(phone)) {
        newErrors.phone = "Phone Number Should Be 10 Digits";
      }

      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        newErrors.password =
          "Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, a number, and a special character.";
      }

      setErrors(newErrors);
      console.log(errors);
      return Object.keys(newErrors).length === 0; // Returns true if no errors
      };

    

    //Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // prevent default form submission
        setLoading(true);

        if (validateForm()) {
          console.log("Form submitted successfully!");
        } else {
          setLoading(false);
          console.log("Form has errors!");
        };

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

          let json;
          try {
          json = await response.json();

          } catch (error) {
            console.error("Failed to parse JSON response:", error);
            setErrors((prevErrors) => ({
                ...prevErrors,
                general: "An unexpected error occurred. Please try again later.",
            }));
            return; // Stop execution if response is invalid
        };
          
          if (!response.ok) {
            console.error(`Server responded with ${response.status}:`, json);

            if (json.error) {
              if (json.error.includes("email")) {
                  setErrors((prevErrors) => ({ ...prevErrors, email: json.error }));
              }
              // if (json.error.includes("password")) {
              //     setErrors((prevErrors) => ({ ...prevErrors, password: json.error }));
              // }
            //   if (json.error.includes("phone")) {
            //     setErrors((prevErrors) => ({ ...prevErrors, phone: json.error }));
            // }
          } else {
            setErrors((prevErrors) => ({ ...prevErrors, general: json.error || "Registration failed." }));
          };

          if (json.errors) {
            const fieldErrors = {};
            json.error.forEach((error) => {
                if (error.param === "email") fieldErrors.email = error.msg;
                // if (error.param === "password") fieldErrors.password = error.msg;
        //         if (error.param === "phone") fieldErrors.phone = error.msg;
            });
            setErrors(fieldErrors);
        };
        return;
        };
      
            
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
          } 
        } catch (error) {
          console.error('Fetch error:', error);
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: "Network error. Please check your connection and try again.",
        }));
        } finally {
          setLoading(false);
      };};
      

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
                    
                    <div>
                        <p className="medium-body"> Already have an account? <Link className="link" to="/login">Login Instead</Link></p>
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
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" className="form-control"  placeholder="Enter your name" required /> 
                                {errors.name && (
                                    <div className="err" style={{color: "red"}}>{errors.name}</div>
                                    )}
                            </div>
                            
                            <div className="form-container">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <PatternFormat
                                  className="form-control"
                                  format="+1 (###) ### ####"
                                  allowEmptyFormatting
                                  mask="_"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  type="tel"
                                  id="phone"
                                  placeholder="Enter your phone number"
                                  aria-describedby="phoneHelp"
                                  required
                                  />
                                  {errors.phone ? (
                                    <div className="err" style={{color: "red"}}>{errors.phone}</div>
                                    ) : (
                                    <div id="phoneHelp" className="form-text">We'll never share your phone number with anyone</div>
                                    )}    
                            </div>
                            
                            <div className="form-container">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="Enter your email" aria-describedby="emailHelp" required/>
                                {errors.email ? (
                                    <div className="err" style={{color: "red"}}>{errors.email}</div>
                                    ) : (
                                    <div id="emailHelp" className="form-text">We'll never share your email address with anyone</div>
                                    )}
                            </div>
                            
                            <div className="form-container">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Enter your password"  aria-describedby="passwordHelp"
                                required/>
                                {errors.password ? (
                                    <div id="passwordError" className="err" style={{color: "red"}}>{errors.password}</div>
                                    ) : (
                                    <div id="passwordHelp" className="form-text">Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, a number, and a special character.
                                    </div>
                                )}
                            </div>
                            
                            <button type="submit" className="button w-100" id="submit" disabled={accountType === "Doctor" || loading}>Create Account</button>
                                {/* Loading spinner */}
                              {loading && (
                                <div className="text-center mt-3">
                                    <div className="spinner-border" role="status"></div>
                                    <p className="medium-body">We are using the free server for this project demonstration, so the request can take slightly longer. Thank you for your patience!</p>
                                </div>
                              )}
                              {errors.general && (
                                    <div id="passwordError" className="err" style={{color: "red"}}>{errors.general}</div>
                                    )}
                        </form>
                        
                    </div>
                    <p className="medium-body">
                            You can signup with your credentials or use the sample credentials to <Link className="link" to="/login">Login</Link> for the test <br></br>
                            Email: <strong>mm@mail.com</strong><br></br>Password: <strong>$wcq6F7Mzw$U</strong>
                        </p>
                </div>
            </div>
        </div>
        </div>
      )}
      </> 
    );    
}

export default SignUp;