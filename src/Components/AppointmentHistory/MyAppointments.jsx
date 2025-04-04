import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { useSelector, useDispatch } from "react-redux";
import { updateAppointmentStatus, removeAppointment } from "../BookingConsultation/appointmentSlice.js";

import './MyAppointments.css'

import GiveReview from "./GiveReview.jsx";
import patient_report from '../../assets/patient_report.pdf';


const MyAppointments = () => {
    const visitedDoctorData = [
        { doctorName: "Dr. Emily Carter", speciality: "Cardiology", visitDate: "2024-09-10", patientName: "", reviewData: "" },
        { doctorName: "Dr. Noah Ramirez", speciality: "Dentist", visitDate: "2024-12-01", patientName: "", reviewData: "" }
    ];

    const [patientName ,setPatientName] = useState('');

    useEffect(() => {
            const storedName = sessionStorage.getItem("name");
            if (storedName) {
                setPatientName(storedName);
            }
        }, []); //runs only on mount
    

    const appointments = useSelector(state => state.appointments.appointments);    

    const dispatch = useDispatch();
    
    //Review
    const [openReviewPopup, setOpenReviewPopup ] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState('');

    const [reviewedDoctors, setReviewedDoctors] = useState({});
    
    const handleReviewSubmit = (formData) => {
        console.log("Received doctor name: ", {selectedDoctor})
        console.log("Received data: ", {formData})
        setReviewedDoctors((prev) => ({
            ...prev, [selectedDoctor.doctorName]: "Review Submitted",
        }));
    };


    //Appointment edit and cancel
    const [openCancelPopup, setOpenCancelPopup ] = useState(false);
    const [selectedApp, setSelectedApp] = useState({});

    const handleEdit = () => {
        window.alert('The feature is not available yet. Check back soon!');
      }

    const handleCancel = (appointmentId) => {
        dispatch(updateAppointmentStatus({ id: appointmentId, status: "Cancelled"}))
        setOpenCancelPopup(false);
    }
 
    return (
        <>
            <div style={{ marginTop: '150px'}}>
                    <h2>Scheduled Appoitments</h2>

                    <div className="container">
                            {appointments.map((appointment) => (
                                <div key={appointment.id} className={`appointment ${appointment.status === 'Cancelled' ? ('cancelled-appointment') : ('')}`}>
                                    <div className="appointment-details-container">
                                        <div className="appointment-detail">
                                            <h4>Appointment on</h4>
                                            <div>{appointment.appointmentDate}</div>
                                            <div>{appointment.appointmentTime}</div>
                                        </div>
                                        <div className="appointment-detail">
                                            <h4>Specialist</h4>
                                            <div>{appointment.doctorName}</div>
                                            <div>{appointment.doctorSpeciality}</div>
                                        </div>
                                        <div className="appointment-detail">
                                            <h4>Patient</h4>
                                            <div>{appointment.patientName}</div>
                                            <div className="medium-body">{appointment.patientPhoneNumber}</div>
                                        </div>
                                    </div>
                                   
                                    <div>
                                        {appointment.status === "Cancelled" ? (
                                            <div  className="appointment-buttons">
                                                <h3>{appointment.status}</h3>
                                                <button className="small-button" id="remove" onClick={() => dispatch(removeAppointment(appointment.id))}>Remove</button>
                                            </div>
                                            ) : (
                                        <div className="appointment-buttons">
                                            <h3>{appointment.status}</h3>
                                            <button className="small-button" id="appointment-button" onClick={() => handleEdit()}>Edit</button>
                                            <button className="small-button" id="appointment-button" onClick={() => {setOpenCancelPopup(true); setSelectedApp(appointment)}}>Cancel</button>
                                        </div>

                                        )}
                                    </div>
                                    
                                </div>
                            ))}
                    </div>
            </div>

            <div className="table-container" style={{ marginTop: '100px'}}>
                <h2>Attended Appointments</h2>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Visit Date</th>
                                <th>Doctor Name</th>
                                <th>Doctor Speciality</th>
                                <th>Patient Name</th>
                                <th>Provide Feedback</th>
                                <th>View Report</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visitedDoctorData.map((doctor) => (
                                    <tr key={`${doctor.doctorName}-${doctor.visitDate}`}>
                                        <td>{doctor.visitDate}</td>
                                        <td>{doctor.doctorName}</td>
                                        <td>{doctor.speciality}</td>
                                        <td>{patientName}</td>
                                        <td>
                                            <button className="secondary-button" 
                                                onClick={() => {
                                                    setSelectedDoctor(doctor);
                                                    setOpenReviewPopup(true);
                                                }}
                                                disabled={reviewedDoctors[doctor.doctorName]}
                                                >
                                                    {reviewedDoctors[doctor.doctorName] ? "Review Submitted" : "Provide Review"}
                                            </button>
                                        </td>
                                        <td>
                                            <button className="secondary-button">
                                                <a className="link" href={patient_report} target="_blank" rel="noreferrer">
                                                    View Report
                                                </a>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>

                </div>

            </div>
            
            <Popup
                    className="popup-overlay"
                    modal
                    open={openReviewPopup}
                    onClose={() => setOpenReviewPopup(false)}
                >                    
                    
                        <GiveReview doctor={selectedDoctor} 
                        onClose={() => setOpenReviewPopup(false)}
                        onSubmit={handleReviewSubmit}/>
                    
            </Popup>

            <Popup
                    className="popup-overlay"
                    modal
                    open={openCancelPopup}
                    onClose={() => setOpenCancelPopup(false)}
            >                    
                    
                    <div className="card-details">  
                            <p className="large-body mb-0">Would you like to </p>
                            <h3>cancel the appointment with</h3>
                            
                            <h2>{selectedApp.doctorName}</h2>
                            <div>{selectedApp.doctorSpeciality}</div>
                            
                            <p className="large-body mt-3 mb-1">Scheduled on</p>
                            <h3 className="mt-0">{selectedApp.appointmentDate}</h3>
                            <h3>{selectedApp.appointmentTime}</h3>
                            <p className="large-body">For {selectedApp.patientName}</p>
                        <button className="secondary-button w-100" onClick={() => setOpenCancelPopup(false)}>No, do not cancel</button>
                        <button className="secondary-button w-100 mt-2" id="cancel" onClick={() => handleCancel(selectedApp.id)}>Yes, cancel</button>
                    </div>
                    
            </Popup>

            


             
        </>
    );

};

export default MyAppointments;