// Import necessary modules from React Library
import React from 'react';

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
          <Route path="/StayHealthy/" element={<LandingPage/>}/>
          <Route path="/StayHealthy/signup" element={<SignUp />} />
          <Route path="/StayHealthy/login" element={<Login />} />
          <Route path="/StayHealthy/search" element={<BookingConsultation />} />
          <Route path="/StayHealthy/reviews" element={<ReviewForm />} />
          <Route path="/StayHealthy/profile" element={<ProfileCard />} />
          <Route path="/StayHealthy/reports" element={<Reports />} />
        </Routes>

        {/* <ApptNotification/> */}

    </Router>
  );
}

export default App
