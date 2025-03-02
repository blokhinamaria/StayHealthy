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
            <form onSubmit={handleFormSubmit} className="appointment-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        pattern="^[A-Za-z\s]+$"
                        title="Only letters and spaces are allowed"/>                    
                </div>
                <div className="form-group">
                    <label htmlFor="phone" >Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        pattern="^\d{10}$"
                        title="Enter a 10-digit phone number"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date of Appointment</label>
                    <input
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
                <div className="form-group">
                    <label htmlFor="timeSlot">Time</label>
                    <select
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
                <button type="submit">Book Now</button>
            </form>
        </>
    );
}

export default AppointmentForm