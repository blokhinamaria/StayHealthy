import React from "react";
import './DoctorCard.css'

const DoctorCard = ({ name, speciality, experience, rating, profilePic }) => {
    
    return (
        <div className="doctor-card-container">
            <div className="doctorCardImage">
                <img src="src/assets/Search.png" width="46" height="46"></img>
            </div>
            <div className="doctor-card-details" >
                <div>{name}</div>
                <div>{speciality}</div>
                <div>{experience} years of experience</div>
                <div>Rating: {rating}</div>
            </div>
            <div>
                <button className="book-appointment-btn">Book Appointment</button>
            </div>
        </div>
    )
};

export default DoctorCard;