import React, { useState } from "react";
import Popup from "reactjs-popup";

import patient_report from '../../assets/patient_report.pdf';

const Reports = () => { 
    
    const visitedDoctorData = [
        { doctorName: "Dr. Emily Carter", speciality: "Cardiology", visitDate: "2024-09-10"},
        { doctorName: "Dr. Noah Ramirez", speciality: "Dentist", visitDate: "2024-12-01"}
    ];

    return (
        <>
            <div className="table-container" style={{ marginTop: '150px'}}>
                <h2>Reports</h2>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Visit Date</th>
                                <th>Doctor Name</th>
                                <th>Doctor Speciality</th>
                                <th>View Reports</th>
                                <th>Download Reports</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visitedDoctorData.map((doctor, index) => (
                                    <tr key={`${doctor.doctorName}-${doctor.visitDate}`}>
                                        <td>{doctor.visitDate}</td>
                                        <td>{doctor.doctorName}</td>
                                        <td>{doctor.speciality}</td>
                                        <td>
                                            <button className="secondary-button">
                                            <a className="link" href={patient_report} target="_blank" rel="noreferrer">
                                                    View Report
                                            </a>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="secondary-button">
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
        </>
    );

}

export default Reports