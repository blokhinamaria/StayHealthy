import React, { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import { v4 as uuidv4 } from 'uuid';
import { PatternFormat } from 'react-number-format';
import { useSelector, useDispatch } from "react-redux";

import { addAppointment, updateAppointmentStatus } from "../appointmentSlice";
import AppointmentForm from "../AppointmentForm/AppointmentForm.jsx";

import './DoctorCard.css'

const DoctorCard = ({ name, speciality, experience, distance, ratings, image }) => {
    
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    //Load appointments from Redux store
    const appointments = useSelector(state => state.appointments.appointments);

    //check if the current doctor has an appointment booked
    const hasAppointment = appointments.some(app => app.doctorName === name && app.status === "Scheduled");
    
    const handleFormSubmit = (appointmentData) => {
      const newAppointment = {
          id: uuidv4(),
          doctorName: name,
          doctorSpeciality: speciality,
          status: "Scheduled",
          ...appointmentData,
        };

        dispatch(addAppointment(newAppointment));
      };

    const handleCancel = (appointmentId) => {
        dispatch(updateAppointmentStatus({ id: appointmentId, status: "Cancelled"}));
        setShowModal(false);
      };

    const handleEdit = () => {
      window.alert('The feature is not available yet. Check back soon!');
    }

    return (
        <>
        <div className="card-container card-details">
          <img src={image} alt={name} width="140" height="140" className="m-3"></img>
          <h3>{name}</h3>
          <div>{speciality}</div>
          <div>Experience: {experience} years</div>            
          <div>Distance: {distance}</div>
          <div>Rating: {ratings}</div>

          <button className={`secondary-button mt-3`} id={hasAppointment ? 'cancel' : ''} onClick={() => setShowModal(true)}>
              {hasAppointment ? (
                          <div>Cancel Appointment</div>
                        ) : (
                          <div>Book Appointment</div>
                        )}
          </button>
          
          <Popup
                className="popup-overlay"
                modal
                open={showModal}
                onClose={() => setShowModal(false)}
                >
            <div className="">
              <div className="card-details">
                <h3>Schedule an appointment with</h3>
                <h2>{name}</h2>
                <div>{speciality}</div>
                <div>Experience: {experience} years</div>            
                <div>Distance: {distance}</div>
                <div>Rating: {ratings}</div>
              </div>

              {hasAppointment ? (
                <>
                <div className="mt-3">
                  <h3>Appointment Booked!</h3>
                      {appointments.filter(appointment => appointment.doctorName === name && appointment.status === "Scheduled")
                      .map((appointment) => (
                        <div key={appointment.id}>
                        <div className="appointment-details align-items-center" >
                          <div>Appointment for <strong>{appointment.patientName}</strong></div>
                          <div>Appointment Date: <strong>{appointment.appointmentDate}</strong></div>
                          <div>Appointment Time: <strong> {appointment.appointmentTime}</strong></div>
                          <br></br>
                          <div>Patient phone number for communication <br></br>{appointment.patientPhoneNumber}</div>
                        </div>
                          <button className="button mb-2 w-100" onClick={() => handleEdit(appointment.id)}>Edit Appointment</button>
                          <button className="button w-100" id="cancel" onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                          </div>
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