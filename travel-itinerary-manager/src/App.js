// src/App.js
import React from "react";
//import {SignUpForm} from "./pages/Signup/SignUpForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import { SignInForm } from "./pages/Signin-page/SignInForm";
//import {TripPlannerLayout} from "./pages/Plan-trip/TripPlannerLayout";
//import { DashboardLayout } from "./pages/Dashboard/DashboardLayout";
//import{ItinerariesLayout} from "../src/pages/Dashboard/ItinerariesLayout";
//import{MyInformationLayout} from "../src/pages/Dashboard/MyInformationLayout";
//import {SettingsLayout} from "../src/pages/Dashboard/SettingsLayout";
import {ItineraryView} from "./pages/view-itinerary/default-view";

function App() {
  return ( 
  <Router>
    <Routes>
      <Route path="/" element={<ItineraryView/>} />
    
     {/*<Route path="/signup" element={<SignUpForm/>} />
    <Route path="/signin" element={<SignInForm/>} />*/}
     
     {/* <Route path="/" element={<TripPlannerLayout/>} />

    <Route path="/" element={<DashboardLayout/>} />
    <Route path="/" element={<ItinerariesLayout/>} />
    <Route path="/" element={<MyInformationLayout/>} />
    <Route path="/" element={<SettingsLayout/>} />*/}
    </Routes>
  </Router>
);
}

export default App;
