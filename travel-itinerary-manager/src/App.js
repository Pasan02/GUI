// src/App.js
import React from "react";
//import {SignUpForm} from "./pages/Signup/SignUpForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import { SignInForm } from "./pages/Signin-page/SignInForm";
//import {TripPlannerLayout} from "./pages/Plan-trip/TripPlannerLayout";
//import HomePage  from "./pages/Home/home";
import { AuthProvider } from "./context/AuthContext";
import { DashboardLayout } from "./pages/Dashboard/DashboardLayout";
import{ItinerariesLayout} from "../src/pages/Dashboard/ItinerariesLayout";
import{MyInformationLayout} from "../src/pages/Dashboard/MyInformationLayout";
import {SettingsLayout} from "../src/pages/Dashboard/SettingsLayout";
//import TripItinerary from "./pages/view-itinerary/default-view";

function App() {
  return ( 
    <AuthProvider>
  <Router>
    <Routes>
      
    {/*  <Route path="/" element={<TripItinerary/>} />
   <Route path="/signup" element={<SignUpForm/>} />
    <Route path="/signin" element={<SignInForm/>} />
     
    <Route path="/" element={<HomePage/>} />
    <Route path="/plan-trip" element={<TripPlannerLayout/>} />*/}

       <Route path="/" element={<DashboardLayout/>} />
       <Route path="/dashboard" element={<DashboardLayout/>} />
          <Route path="/my-information" element={<MyInformationLayout/>} />
          <Route path="/settings" element={<SettingsLayout/>} />
          <Route path="/itinerary" element={<ItinerariesLayout/>} />
   {/* <Route path="/" element={<ItinerariesLayout/>} />
    <Route path="/" element={<MyInformationLayout/>} />
    <Route path="/" element={<SettingsLayout/>} />*/}
    </Routes>
  </Router>
  </AuthProvider>
);
}

export default App;
