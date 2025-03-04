import React, { useState } from "react";
import Popup from "reactjs-popup";

import './ReviewForm.css'

import GiveReview from "./GiveReview.jsx";

const ReviewForm = () => {
    const visitedDoctorData = [
        { doctorName: "Dr. Emily Carter", speciality: "Cardiology", visitDate: "2024-09-10", reviewData: "" },
        { doctorName: "Dr. Noah Ramirez", speciality: "Dentist", visitDate: "2024-12-01", reviewData: "" }
    ];
    

    const [openPopup, setOpenPopup ] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState('');

    const [reviewedDoctors, setReviewedDoctors] = useState({});
    

    const handleReviewSubmit = (formData) => {
        console.log("Received doctor name: ", {selectedDoctor})
        console.log("Received data: ", {formData})
        setReviewedDoctors((prev) => ({
            ...prev, [selectedDoctor.doctorName]: "Review Submitted",
        }));
        // setOpenPopup(false);
        
    };


    return (
        <>
            <div className="review-form">
                <h1 className="review-title">Reviews</h1>
                <div className="review-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Serial Number</th>
                                <th>Doctor Name</th>
                                <th>Doctor Speciality</th>
                                <th>Visit Date</th>
                                <th>Provide Feedback</th>
                                <th>Reviewed</th>
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
                                            <button className="btn-secondary" 
                                                onClick={() => {
                                                    setSelectedDoctor(doctor);
                                                    setOpenPopup(true);
                                                }}
                                                disabled={reviewedDoctors[doctor.doctorName]}
                                                >
                                                    {reviewedDoctors[doctor.doctorName] ? "Review Submitted" : "Provide Review"}
                                            </button>
                                        </td>
                                        <td>{reviewedDoctors[doctor.doctorName] || "Not Reviewed"}</td>
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
                    
                        <GiveReview doctor={selectedDoctor} 
                        onClose={() => setOpenPopup(false)}
                        onSubmit={handleReviewSubmit}/>
                    </div>
                </Popup>
             
        </>
    );

};

export default ReviewForm;

// // <button className="btn-secondary" 
// onClick={() => handleReview(doctor.doctorName)}>
// {reviewedDoctors[doctor.doctorName] ? "Edit Review" : "Provide Feedback"}
// </button>