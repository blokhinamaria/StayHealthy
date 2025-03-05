import React, {useState} from "react";

import './GiveReview.css'

const GiveReview = ({ doctor, onClose, onSubmit }) => {

    const [submittedMessage, setSubmittedMessage] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        review: '',
        rating: 0
        });
  
    


    // Function to handle form input changes
    const handleChange = (e) => {
        // Update the form data based on user input
        setFormData({ ...formData, [e.target.name]: e.target.value });
        };
    
    // Function to handle form submission
    const handleSubmit = (e) => {
        
        e.preventDefault();
        
        if (formData.name && formData.review && formData.rating > 0) {
            setShowWarning(false);
            setSubmittedMessage(`Thank you, ${formData.name}!
                Your review: "${formData.review}". Rating: ${formData.rating}`);
            // setFormData({
            //     name: '',
            //     review: '',
            //     rating: 0
            // });
            } else {
            setShowWarning(true);
            };
            
            onSubmit({ formData });
        };    

    
    return (
        <>
            <div className="modal-content"> 
                <div className="form-intro">
                <button className="close-btn" onClick={onClose}>x</button>
                <h2>Give Your Feedback for <br /> <strong>{doctor.doctorName}</strong></h2>
                <p>Speciality: {doctor.speciality}</p>
                <p>Visit Date: {doctor.visitDate}</p>
                </div>

                {submittedMessage ? (
                    <p className="success-message">{submittedMessage}</p>
                ) : (
                
                <form className="feedback-form" onSubmit={handleSubmit}>
                    
                    {/* Display warning message if not all fields are filled */}
                    {showWarning && <p className="warning" style={{ color: 'red'}}>Please fill out all fields.</p>}
                    
                    <div className="form-container">
                        <label className="form-label" htmlFor="name">Your Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="review">Review</label>
                        <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
                    </div>

                    <div className="form-container">
                        <label className="form-label" htmlFor="rating">Rating</label>
                        <input 
                            type="number"
                            id="rating"
                            name="rating"
                            min="1"
                            max='5'
                            value={formData.rating}
                            onChange={handleChange}
                        />
                    </div>
                
                    {/* Submit button for form submission */}
                    <button className="submit-btn" type="submit">Submit</button>
                </form>
                )}
                
            </div>
            
            
            
        </>
    );
}
export default GiveReview;