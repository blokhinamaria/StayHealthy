import React from "react";
import { useState } from "react";
import Popup from 'reactjs-popup';
import { v4 as uuidv4 } from 'uuid';


import AppointmentForm from "../AppointmentForm/AppointmentForm.jsx";

import './DoctorCard.css'

const DoctorCard = ({ name, speciality, experience, distance, ratings, image }) => {
    
    const [showModal, setShowModal] = useState(false);
    const [appointments, setAppointments] = useState([]);

    const handleCancel = (appointmentId) => {
        const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
        setAppointments(updatedAppointments);
        setShowModal(false);
        localStorage.removeItem('Patient name');
        localStorage.removeItem('Doctor name');
        localStorage.removeItem('Speciality');
        localStorage.removeItem('appointmentDate');
        localStorage.removeItem('appointmentTime');
      };

    const handleEdit = (appointmentID) => {
      window.alert('The feature is not available yet. Check back soon!');
    }

    const handleFormSubmit = (appointmentData) => {
        const newAppointment = {
          id: uuidv4(),
          ...appointmentData,
        };
        const updatedAppointments = [...appointments, newAppointment];
        setAppointments(updatedAppointments);
      };

    return (
        <>
        <div className="doctor-card-container doctor-card-details">
          <img src={image} alt={name} width="140" height="140" className="m-3"></img>
          <h3>{name}</h3>
          <div>{speciality}</div>
          <div>Experience: {experience} years</div>            
          <div>Distance: {distance}</div>
          <div>Rating: {ratings}</div>

          <button className={`secondary-button mt-3`} id={appointments.length > 0 ? 'cancel' : ''} onClick={() => setShowModal(true)}>
              {appointments.length > 0 ? (
                          <div>Cancel Appointment</div>
                        ) : (
                          <div>Book Appointment</div>
                        )}
          </button>
          
          <Popup
                className="popup-overlay"
                style={{ backgroundColor: '#FFFFFF' }}
                modal
                open={showModal}
                onClose={() => setShowModal(false)}
                >
            <div className="popup-content">
              <div className="doctor-card-details">
                <h3>Schedule an appointment with</h3>
                <h2>{name}</h2>
                <div>{speciality}</div>
                <div>Experience: {experience} years</div>            
                <div>Distance: {distance}</div>
                <div>Rating: {ratings}</div>
              </div>

              {appointments.length > 0 ? (
                <>
                <div className="appointment-confirmation mt-3">
                  <h3>Appointment Booked!</h3>
                      {appointments.map((appointment) => (
                        <>
                        <div className="appointment-details align-items-center" key={appointment.id}>
                          <div>Appointment for <strong>{appointment.name}</strong></div>
                          <div>Appointment Date: <strong>{appointment.appointmentDate}</strong></div>
                          <div>Appointment Time: <strong> {appointment.appointmentTime}</strong></div>
                          <br></br>
                          <div>Your phone number for communication <br></br>{appointment.phoneNumber}</div>
                          </div>
                          <button className="button mb-2 w-100" onClick={() => handleEdit(appointment.id)}>Edit Appointment</button>
                          <button className="button w-100" id="cancel" onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                          </>
                      ))}
                  </div>
                </>
                        ) : (
                            <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
                        )}
                    </div>
                </Popup>
                <div className="m-2" style={{fontSize: '0.875 em', color: 'grey'}}>No Booking fee</div>
            </div>
        </>
    )
};

export default DoctorCard;