import React, {useState, useEffect} from "react";

import './GiveReview.css'

const GiveReview = ({ doctor, onSubmit }) => {
    
    const [submittedMessage, setSubmittedMessage] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    
    const [formData, setFormData] = useState({
        patientName: '',
        review: '',
        rating: 5
        });

    //Get user information
    useEffect(() => {
        const storedName = sessionStorage.getItem("name");
        if (storedName ) {
            setFormData((prevFormData) => ({...prevFormData, patientName: storedName}));
            };
            
        }, []); //runs only on mount
    
    // Function to handle form submission
    const handleSubmit = (e) => {
        
        e.preventDefault();

        if (formData.patientName && formData.review.trim() && formData.rating > 0) {
            setShowWarning(false);
            setSubmittedMessage(`Thank you, ${formData.patientName}!
                Your review: "${formData.review}". Rating: ${formData.rating}`);
            onSubmit(formData); 
        } else {
            setShowWarning(true);
        }
    
        console.log(formData);
    };   
    
    return (
        <>
            
            <div className="popup-content"> 

                <div className="card-details">
                    <h3>Give Your Feedback to</h3>
                    <h2>{doctor.doctorName}</h2>
                    <div>Speciality: {doctor.speciality}</div>
                    <div>Visit Date: {doctor.visitDate}</div>
                </div>

                {submittedMessage ? (
                    <p className="success-message">{submittedMessage}</p>
                ) : (
                
                <form className="feedback-form mt-3 text-start" onSubmit={handleSubmit}>
                    
                    {/* Display warning message if not all fields are filled */}
                    {showWarning && <p className="warning" style={{ color: 'red'}}>Please fill out all fields.</p>}
                    
                    <div className="form-container">
                        <label className="form-label" htmlFor="patientName">Patient Name</label>
                        <input 
                            className="form-control"
                            type="text"
                            id="patientName"
                            value={formData.patientName}
                            onChange={(e) => setFormData((prevFormData) => ({...prevFormData, patientName: e.target.value}))}
                            required
                            pattern="^[A-Za-z\s]+$"
                            title="Only letters and spaces are allowed"/> 
                        
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="review">Review</label>
                        <textarea className="form-control" id="review" name="review" value={formData.review} 
                        onChange={(e) => setFormData((prevFormData) => ({...prevFormData, review: e.target.value}))}/>
                    </div>

                    <div className="form-container">
                        <label className="form-label" htmlFor="rating">Rating</label>
                            <label className="form-rating" htmlFor="rating">
                                <input
                                    className="form-rating-radio"
                                    type="radio"
                                    name="rating"
                                    id="rating"
                                    value={5}
                                    defaultChecked={true} 
                                    onChange={(e) => setFormData((prevFormData) => ({...prevFormData, rating: Number(e.target.value)}))}/>
                                    ⭐⭐⭐⭐⭐
                            </label>
                            <label className="form-rating" htmlFor="rating">
                                <input
                                    className="form-rating-radio"
                                    type="radio"
                                    name="rating"
                                    id="rating"
                                    value={4}
                                    onChange={(e) => setFormData((prevFormData) => ({...prevFormData, rating: Number(e.target.value)}))}/>
                                    ⭐⭐⭐⭐
                            </label>
                            <label className="form-rating" htmlFor="rating">
                                <input
                                    className="form-rating-radio"
                                    type="radio"
                                    name="rating"
                                    id="rating"
                                    value={3}
                                    onChange={(e) => setFormData((prevFormData) => ({...prevFormData,rating: Number(e.target.value)}))}/>
                                    ⭐⭐⭐
                            </label>
                            <label className="form-rating" htmlFor="rating">
                                <input
                                    className="form-rating-radio"
                                    type="radio"
                                    name="rating"
                                    id="rating"
                                    value={2}
                                    onChange={(e) => setFormData((prevFormData) => ({...prevFormData, rating: Number(e.target.value)}))}/>
                                    ⭐⭐
                            </label>
                            <label className="form-rating" htmlFor="rating">
                                <input
                                    className="form-rating-radio"
                                    type="radio"
                                    name="rating"
                                    id="rating"
                                    value={1}
                                    onChange={(e) => setFormData((prevFormData) => ({...prevFormData, rating: Number(e.target.value)}))}/>
                                    ⭐
                            </label>
                            
                            
                    </div>
                
                    <button className="button w-100" type="submit">Submit</button>
                </form>
                )}
                
            </div>
            
            
            
        </>
    );
}
export default GiveReview;