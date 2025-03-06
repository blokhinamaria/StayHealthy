// Import necessary modules from React Library
import React from 'react';
import { useEffect, useState } from 'react';

// Import Componenets fro routing from react-router-dom library
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Import Custom components
import Navbar from './Components/Navbar/Navbar.jsx';
import LandingPage from './Components/Landing_Page/LandingPage.jsx';
import SignUp from './Components/Sign_Up/SignUp.jsx';
import Login from './Components/Login/Login.jsx';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation.jsx';
import BookingConsultation from './Components/BookingConsultation/BookingConsultation.jsx';
import ApptNotification from './Components/ApptNotification/ApptNotification.jsx'
import ReviewForm from './Components/ReviewForm/ReviewForm.jsx';
import ProfileCard from './Components/ProfileCard/ProfileCard.jsx';
import Reports from './Components/Reports/Reports.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'





// Function component for the main app
function App() {

//Render the main app componenet
  return (
    <Router>
      <Navbar/>
      
      <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/consultation" element={<InstantConsultation />} />
          <Route path="/search" element={<BookingConsultation />} />
          <Route path="/reviews" element={<ReviewForm />} />
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>

        {/* <ApptNotification/> */}

    </Router>
  );
}

export default App
