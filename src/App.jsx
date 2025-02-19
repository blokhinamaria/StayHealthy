// Import necessary modules from React Library
import { useEffect, useState } from 'react';

// Import Componenets fro routing from react-router-dom library
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Import Custom components
import Navbar from './Components/Navbar/Navbar.jsx';
import LandingPage from './Components/Landing_Page/LandingPage.jsx';
import SignUp from './Components/Sign_Up/SignUp.jsx';
import Login from './Components/Login/Login.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'




// Function component for the main app
function App() {

//Render the main app componenet
  return (
    <>
      <div className='App'>

        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>

          {/* Display Navbar  Componenet */}
          <Navbar/>

          {/* Set up the Routers for diffrent pages */}
          
          <LandingPage/>
          {/* <Routes>
            <Route path="/" element={<LandingPage/>}/>
          </Routes> */}

          <SignUp/>

          <Login/>

        </BrowserRouter>
      </div>
      
    </>
  );
}

export default App
