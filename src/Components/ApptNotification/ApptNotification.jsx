import React, { useState, useEffect } from "react";

import './ApptNotification.css'

const ApptNotification = () => {
    const [appointmentData, setAppointmentData] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('name')) {
            setIsLoggedIn(true);
        }

        const storedData = {
            patientName: localStorage.getItem("Patient name"),
            doctorName: localStorage.getItem("Doctor name"),
            doctorSpeciality: localStorage.getItem("Speciality"),
            appointmentDate: localStorage.getItem("appointmentDate"),
            appointmentTime: localStorage.getItem("appointmentTime"),
        };
        console.log("Retrieved from localStorage:", storedData);

        if (storedData.appointmentDate && storedData.appointmentTime) {

            setAppointmentData(storedData);
        }
        
    }, []);

    return (
        <>
            {isLoggedIn && appointmentData && (
                <div className="appointment-card">
                    <h3>Upcoming Appointment</h3>
                    <p>Doctor: <strong>{appointmentData.doctorName}, {appointmentData.doctorSpeciality}</strong></p>
                    <p>Patient: <strong>{appointmentData.patientName}</strong></p>
                    <p>Date: <strong>{appointmentData.appointmentDate}</strong></p>
                    <p>Time: <strong>{appointmentData.appointmentTime}</strong></p>
                </div>
            )}
        </>
    );
};

export default ApptNotification;
