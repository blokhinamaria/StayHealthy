import React, { useEffect, useState } from "react";
import { PatternFormat } from 'react-number-format';


import './ProfileCard.css'

const ProfileCard = () => {
    
    const [user, setUser] = useState({
        name: "",
        phone: "",
        email: "",
    });

    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        const storedName = sessionStorage.getItem("name");
        const storedPhone = sessionStorage.getItem("phone");
        const storedEmail = sessionStorage.getItem("email");
        if (storedName && storedPhone && storedEmail ) {
            setUser({
                name: storedName,
                phone: storedPhone,
                email: storedEmail,
            })
        }
    }, []); //runs only on mount

    const handleSubmit = (e) => {
        e.preventDefault();

        sessionStorage.setItem('name', user.name);
        sessionStorage.setItem('phone', user.phone);
        sessionStorage.setItem('email', user.email);

        setIsEditing(false);

        setUpdated(true);
    };

    return (
        <>
            <div className="card-container" style={{marginTop: "110px"}}>
                <h2>My Profile</h2>
                {updated && !isEditing && <p className="update-message">Profile Successfully Updated!</p>}

                <div className="profile-info">
                    <div><img src="./assets/Doctor1.png" alt={user.name} width="140" height="140" className="m-3"></img></div>

                    {isEditing ? (
                    <div className="mx-auto text-start">
                    <form onSubmit={handleSubmit}>

                            <div className="form-container">
                                <label htmlFor="name" className="form-label">Full Name</label>
                                <input value={user.name} onChange={(e) => setUser((prevUser) => ({...prevUser, name: e.target.value}))} type="text" id="name" className="form-control"  placeholder={user.name}/> 
                                
                            </div>
                            
                            <div className="form-container">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                
                                <PatternFormat
                                    className="form-control"
                                    format="+1 (###) #### ###"
                                    type="tel"
                                    id="phone"
                                    value={user.phone}
                                    onChange={(e) => setUser((prevUser) => ({...prevUser, phone: e.target.value}))}
                                    placeholder={user.phone}
                                    required
                                    aria-describedby="phoneHelp"
                                    title="Enter a 10-digit phone number"
                                    />

                            </div>
                            <div className="form-container">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input value={user.email} onChange={(e) => setUser((prevUser) => ({...prevUser, email: e.target.value}))} type="email" className="form-control" id="email" placeholder={user.email} aria-describedby="emailHelp"/>
                                
                            </div>
                            <button className="secondary-button w-100" type="submit" id="submit">Save</button>
                            <button className="secondary-button w-100 mt-3" type="button" id="btn-cancel" onClick={() => setIsEditing(false)} >Cancel</button>
                        
                    </form>
                    </div>

                ) : (
                
                    
                    <div className="profile-info-text">
                        <h4>Full Name</h4>
                        <h3>{user.name}</h3>
                        <h4>Phone Number</h4>
                        <h3>{user.phone}</h3>
                        <h4>Email Address</h4>
                        <h3>{user.email}</h3>
                     <button className="secondary-button w-100" id="edit" onClick={() => setIsEditing(true)}>Edit my infromation</button>
                    </div>
                    
                  
                )}
                </div>
                
            </div>
        </>
    );
};

export default ProfileCard;