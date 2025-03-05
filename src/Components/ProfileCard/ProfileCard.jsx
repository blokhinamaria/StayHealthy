import React, { useEffect, useState } from "react";

import './ProfileCard.css'

const ProfileCard = () => {
    
    // const [user, setUser] = useState({
    //     name: "",
    //     phone: "",
    //     email: "",
    // });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [isEditing, setIsEditing] = useState(false);

    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        const storedName = sessionStorage.getItem("name");
        const storedPhone = sessionStorage.getItem("phone");
        const storedEmail = sessionStorage.getItem("email");
        if (storedName && storedPhone && storedEmail ) {
            setName(storedName);
            setPhone(storedPhone);
            setEmail(storedEmail);
        }
    }, []); //runs only on mount

    const handleSubmit = (e) => {
        e.preventDefault();

        sessionStorage.setItem('name', name);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('email', email);

        setIsEditing(false);

        setUpdated(true);
    }

    return (
        <>
            <div className="profile-card">
                <h2>My Profile</h2>

                {updated && <p className="update-message">Profile Successfully Updated!</p>}

                {isEditing ? (
                    <div className="form-container mx-auto text-start">
                    <form onSubmit={handleSubmit} >

                            <div className="form-container">
                                <label htmlFor="name" className="form-label">Full Name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" className="form-control"  placeholder={name}/> 
                                {/* {showerr && <div className="err" style={{color:'red'}}>{showerr}</div>} */}
                            </div>
                            
                            <div className="form-container">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="form-control" id="phone" placeholder={phone}  aria-describedby="phoneHelp"/>
                                {/* {showerr ? (
                                    <div className="err" style={{ color: "red"}}>{showerr}</div>
                                    ) : (
                                    <div id="phoneHelp" className="form-text">We'll never share your phone number with anyone</div>
                                    )}             */}
                            </div>
                            
                            <div className="form-container">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder={email} aria-describedby="emailHelp"/>
                                {/* {showerr ? (
                                    <div className="err" style={{color: "red"}}>{showerr}</div>
                                    ) : (
                                    <div id="emailHelp" className="form-text">We'll never share your email address with anyone</div>
                                    )} */}
                            </div>
                            <button className="btn btn-primary w-100" type="submit" >Save</button>
                            <button className="btn btn-primary w-100 mt-3" type="button" id="btn-cancel" onClick={() => setIsEditing(false)} >Cancel</button>
                        
                    </form>
                    </div>

                ) : (
                <div className="profile-info">
                    <h3>Full Name</h3>
                    <p>{name}</p>
                    <h3>Phone</h3>
                    <p>{phone}</p>
                    <h3>Email</h3>
                    <p>{email}</p>
                    <button className="btn btn-primary w-100" id="edit" onClick={() => setIsEditing(true)}>Edit my infromation</button>
                </div>   
                )}

                
            </div>
        </>
    );
};

export default ProfileCard;