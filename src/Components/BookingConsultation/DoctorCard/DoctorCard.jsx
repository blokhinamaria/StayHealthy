import React from "react";
import { useState } from "react";
import Popup from 'reactjs-popup';
import { v4 as uuidv4 } from 'uuid';


import AppointmentForm from "../AppointmentForm/AppointmentForm.jsx";

import './DoctorCard.css'

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
    
    const [showModal, setShowModal] = useState(false);
    const [appointments, setAppointments] = useState([]);
    

    const handleOpenPopup = () => setShowModal(true);
    const handleClosePopup = () => setShowModal(false);

    const handleBooking = () => {
        setShowModal(true);
      };

      const handleCancel = (appointmentId) => {
        const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
        setAppointments(updatedAppointments);
        localStorage.removeItem('Patient name');
        localStorage.removeItem('Doctor name');
        localStorage.removeItem('Speciality');
        localStorage.removeItem('appointmentDate');
        localStorage.removeItem('appointmentTime');
      };

    const handleFormSubmit = (appointmentData) => {
        const newAppointment = {
          id: uuidv4(),
          ...appointmentData,
        };
        const updatedAppointments = [...appointments, newAppointment];
        setAppointments(updatedAppointments);
        setShowModal(false);


       

      };

    return (
        <>

        <div className="doctor-card-container">
            <div className="doctorCardImage m-3">
                <img src="src/assets/Doctor1.png" width="140" height="140"></img>
            </div>
            <div className="doctor-card-details" >
                <h3>{name}</h3>
                <div>{speciality}</div>
                <div>Experience: {experience}</div>            
                <div>Rating: {ratings}</div>
            </div>
            <div className="m-3">
            <Popup
                style={{ backgroundColor: '#FFFFFF' }}
                trigger={
                    <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
                        {appointments.length > 0 ? (
                            <div>Cancel Appointment</div>
                        ) : (
                            <div>Book Appointment</div>
                        )}
                    </button>
                    }
                modal
                open={showModal}
                onClose={() => setShowModal(false)}
                >
            {(close) => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll', marginTop: 100 }}>
                    
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">{experience} years experience</div>
                </div>
              

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <p>Appointment Date: {appointment.appointmentDate}</p>
                      <p>Appointement Time: {appointment.appointmentTime}</p>
                      <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
              )}
            </div>
            )}
            </Popup> 
                <div className="m-2" style={{fontSize: '0.875 em', color: 'grey'}}>No Booking fee</div>
            </div>

        </div>        

        
       
            
            
            {/* Manual popup */}
            {/* <div className="m-3">
                <button className="book-appointment-btn" onClick={handleOpenPopup}>Book Appointment</button>                
                {showModal && (
                    <div className="popup-overlay" style={{paddingTop: 100}} >
                        <div className="popup-content" >
                        <div className="doctor-card-details" >
                                <h3>{name}Dr. Emily Carter</h3>
                                <div>{speciality}Dentist</div>
                                <div>Experience: {experience}12 years</div>            
                                <div>Rating: {ratings}⭐⭐⭐⭐⭐ (495)</div>
                        </div>
                        <button onClick={handleClosePopup} className="close-btn">x</button>
                        <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} onClose={handleClosePopup}/>
                        </div>
                    </div>
                )}
                <div className="m-2" style={{fontSize: '0.875 em', color: 'grey'}}>No Booking fee</div>
            </div> */}
        </>
    )
};

export default DoctorCard;