import React, { useState } from "react";
import Popup from "reactjs-popup";

import './Reports.css'

import patient_report from '../../../public/patient_report.pdf';

const Reports = () => {
    
    const visitedDoctorData = [
        { doctorName: "Dr. Emily Carter", speciality: "Cardiology", visitDate: "2024-09-10"},
        { doctorName: "Dr. Noah Ramirez", speciality: "Dentist", visitDate: "2024-12-01"}
    ];

    const [openPopup, setOpenPopup ] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState('');

    
    
    const handleReviewSubmit = (formData) => {
        
        };
        

    return (
        <>
            <div className="review-form">
                <h1 className="review-title">Reports</h1>
                <div className="review-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Serial Number</th>
                                <th>Doctor Name</th>
                                <th>Doctor Speciality</th>
                                <th>Visit Date</th>
                                <th>View Reports</th>
                                <th>Download Reports</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visitedDoctorData.map((doctor, index) => (
                                    <tr key={`${doctor.doctorName}-${doctor.visitDate}`}>
                                        <td>{index + 1 }</td>
                                        <td>{doctor.doctorName}</td>
                                        <td>{doctor.speciality}</td>
                                        <td>{doctor.visitDate}</td>
                                        <td>
                                            <button className="btn-secondary">
                                            <a className="link" href={patient_report} target="_blank" rel="noreferrer">
                                                    View Report
                                            </a>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn-secondary">
                                            <a className="link" href={patient_report} target="_blank" rel="noreferrer" download={patient_report}>
                                                    Download Report
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
                    modal
                    open={openPopup}
                    onClose={() => setOpenPopup(false)}
                >                    
                    <div>
                    
                        
                    </div>
                </Popup>
             
        </>
    );

}

export default Reports