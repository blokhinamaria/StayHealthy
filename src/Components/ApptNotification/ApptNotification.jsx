import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import './ApptNotification.css'

const ApptNotification = () => {
    const appointments = useSelector(state => state.appointments.appointments);
    const upcomingAppointments = appointments.filter(app => app.status === 'Scheduled');
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //visibility control
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const storedName = sessionStorage.getItem("name");
        if (storedName) {
                setIsLoggedIn(true);
            }
        }, []);

    return (
        <>
            {isLoggedIn && upcomingAppointments.length > 0 && (
                <div className="appointment-notification">
                    <div className={`notification-toggle ${isOpen ? "notification-toggle-wide" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                        <h4 style={{ margin: "0" }}>{isOpen ? "Hide Appointments" : "Upcoming Appointments"}</h4>
                    </div>
                    
                    {isOpen && <div className={`notification-container`}>
                        {upcomingAppointments.map(appointment => (
                            <div className="appointment-card" key={appointment.id}>
                                <h5>Upcoming Appointment</h5>
                                <p className="medium-body">With <strong>{appointment.doctorName}, {appointment.doctorSpeciality}</strong></p>
                                <p className="medium-body">On <strong>{appointment.appointmentDate}</strong> At <strong>{appointment.appointmentTime}</strong></p>                     
                                <p className="medium-body">For <strong>{appointment.patientName}</strong></p>
                            </div>
                        ))}       
                    </div> }
                    
                </div>
            )}
        </>
    );
};

export default ApptNotification;
