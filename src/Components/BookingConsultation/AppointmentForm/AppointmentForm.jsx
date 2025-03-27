import React, { useState, useEffect } from "react";

const AppointmentForm = ({doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');

    useEffect(() => {
        const storedName = sessionStorage.getItem("name");
        const storedPhone = sessionStorage.getItem("phone");
        if (storedName && storedPhone) {
            setName(storedName);
            setPhoneNumber(storedPhone);
        }
    }, []); //runs only on mount

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, phoneNumber, appointmentDate, appointmentTime });
        localStorage.setItem('Patient name', name);
        localStorage.setItem('Doctor name', doctorName);
        localStorage.setItem('Speciality', doctorSpeciality);
        localStorage.setItem('appointmentDate', appointmentDate);
        localStorage.setItem('appointmentTime', appointmentTime);
    };

    //Generate available time slots
    const timeSlots = () => {
        const slots = [];
        for (let hour = 8; hour < 17; hour++){
            for (let minutes of ["00", "30"]) {
                const time = `${hour.toString().padStart(2, "0")}:${minutes}`;
                slots.push(time);
            }
        }
        return slots;
    };



    return (
        <>
            <form onSubmit={handleFormSubmit} className="appointment-form mt-3 text-start">
                <div className="form-container">
                    <label className="form-label" htmlFor="name">Patient Name</label>
                    <input 
                        className="form-control"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        pattern="^[A-Za-z\s]+$"
                        title="Only letters and spaces are allowed"/>                    
                </div>
                <div className="form-container">
                    <label className="form-label" htmlFor="date">Date of Appointment</label>
                    <input
                        className="form-control"
                        type="date"
                        id="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        max={new Date(new Date().setMonth(new Date().getMonth() + 6))
                            .toISOString()
                            .split("T")[0]}
                    />
                </div>
                <div className="form-container">
                    <label htmlFor="timeSlot" className="form-label">Time</label>
                    <select
                        className="form-select"
                        id="time"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        required
                    >
                        {timeSlots().map((time) => (
                            <option key={time} value={time} >{time}</option>
                        ))}
                    </select>
                </div>
                <div className="form-container">
                    <label className="form-label" htmlFor="phone" >Phone Number</label>
                    <input
                        className="form-control"
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        pattern="^\d{10}$"
                        title="Enter a 10-digit phone number"
                    />
                </div>
                <button type="submit" id="submit" className="button w-100">Book Now</button>
            </form>
        </>
    );
}

export default AppointmentForm