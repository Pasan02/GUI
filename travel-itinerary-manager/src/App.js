// src/App.js
import React from "react";
import {SignUpForm} from "./pages/Signup/SignUpForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignInForm } from "./pages/Signin-page/SignInForm";
import {TripPlannerLayout} from "./pages/Plan-trip/TripPlannerLayout";
 

function App() {
  return ( 
  <Router>
    <Routes>
      
    <Route path="/signup" element={<SignUpForm/>} />
    <Route path="/signin" element={<SignInForm/>} />
     
      <Route path="/" element={<TripPlannerLayout/>} />
    </Routes>
  </Router>
);
}

export default App;
