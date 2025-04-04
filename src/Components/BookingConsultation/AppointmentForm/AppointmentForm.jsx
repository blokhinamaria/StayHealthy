import React, { useState, useEffect } from "react";
import { PatternFormat } from 'react-number-format';

const AppointmentForm = ({doctorName, doctorSpeciality, onSubmit }) => {
    const [patientName, setPatientName] = useState('');
    const [patientPhoneNumber, setPatientPhoneNumber] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [timeOptions, setTimeOptions] = useState([]);
    const [errors, setErrors] = useState({});  

    //Get user information (Name and Phone Number)
    useEffect(() => {
        const storedName = sessionStorage.getItem("name");
        const storedPhone = sessionStorage.getItem("phone");
        if (storedName && storedPhone) {
            setPatientName(storedName);
            setPatientPhoneNumber(storedPhone);
        }
    }, []); //runs only on mount

    const validateForm = () => {
        setErrors({}); // Reset errors before a new request
        const newErrors = {};
  
        if (!/^[A-Za-z]+(?:\s[A-Za-z]+)+$/.test(patientName)) {
          newErrors.name = "Please enter your first and last name.";
        }
  
        if (!/^\+1 \(\d{3}\) \d{3} \d{4}$/.test(patientPhoneNumber)) {
          newErrors.phone = "Phone Number Should Be 10 Digits";
        }
        setErrors(newErrors);
      console.log(errors);
      return Object.keys(newErrors).length === 0; // Returns true if no errors
      };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log("Form submitted successfully!");
          } else {
            setLoading(false);
            console.log("Form has errors!");
          };

  
        onSubmit({
            id: crypto.randomUUID(),
            doctorName,
            doctorSpeciality,
            patientName,
            patientPhoneNumber,
            appointmentDate,
            appointmentTime });
    };

    // Function to generate a random blocked time
    const getRandomTime = () => {
        const hour = Math.floor(Math.random() * (17 - 8)) + 8;  
        const minutes = Math.random() < 0.5 ? "00" : "30";      
        const time24 = `${hour.toString().padStart(2, "0")}:${minutes}`;
        return time24;
    };

    //Generate available time slots
    const timeSlots = () => {
        const slots = [];
        const blockedTimes = new Set();
    
        // Generate random blocked times
        while (blockedTimes.size < 10) {
            const randomTime = getRandomTime();
            blockedTimes.add(randomTime);
        }
    
        // Loop through hours from 8 AM to 5 PM
        for (let hour = 8; hour < 17; hour++) {
            for (let minutes of ["00", "30"]) {
                const time24 = `${hour.toString().padStart(2, "0")}:${minutes}`;
    
                // Skip blocked times
                if (blockedTimes.has(time24)) continue;
    
                // Convert to AM/PM format
                const amPm = hour >= 12 ? "PM" : "AM";
                const displayHour = hour % 12 === 0 ? 12 : hour % 12;
                const time12 = `${displayHour}:${minutes} ${amPm}`;
    
                // Push available slot into the array
                slots.push({ value: time24, label: time12 });
            }
        }
    
        return slots;
    
    };

    // Set the available time slots when the component mounts
    useEffect(() => {
        if (appointmentDate) {
            const slots = timeSlots(); 
            setTimeOptions(slots);
            setAppointmentTime(slots[0].value);
        }
    }, [appointmentDate]); // Runs only when a date is selected

    return (
        <>
            <form onSubmit={handleFormSubmit} className="appointment-form mt-3 text-start">
                <div className="form-container">
                    <label className="form-label" htmlFor="patientName">Patient Name</label>
                    <input 
                        className="form-control"
                        type="text"
                        id="patientName"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        required
                        pattern="^[A-Za-z\s]+$"
                        title="Only letters and spaces are allowed"/> 
                        {errors.name && (
                        <div className="err" style={{color: "red"}}>{errors.name}</div>
                        )}                   
                </div>
                <div className="form-container">
                    <label className="form-label" htmlFor="patientPhoneNumber">Patient's Phone Number</label>
                    <PatternFormat
                        className="form-control"
                        format="+1 (###) ### ####"
                        type="tel"
                        id="patientPhoneNumber"
                        value={patientPhoneNumber}
                        onChange={(e) => setPatientPhoneNumber(e.target.value)}
                        required
                        title="Enter a 10-digit phone number"
                    />
                    {errors.phone && (
                                    <div className="err" style={{color: "red"}}>{errors.phone}</div>
                                    )}
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
                {appointmentDate ? (
                    <div className="form-container">
                    <label htmlFor="timeSlot" className="form-label">Appointment Time</label>
                    <select
                        className="form-control"
                        id="time"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        required
                    >
                        {timeOptions.map((slot) => (
                            <option key={slot.value} value={slot.value}>{slot.label}</option>
                        ))}
                    </select>
                </div>
                ): (<div className="form-container">
                    <label htmlFor="timeSlot" className="form-label">Appointment Time</label>
                    <select
                        className="form-control"
                        id="time"
                        disabled
                    >
                            <option>Select the date</option>
                    </select>
                </div>)}
                
                
                <button type="submit" id="submit" className="button w-100">Book Now</button>
            </form>
        </>
    );
}

export default AppointmentForm;