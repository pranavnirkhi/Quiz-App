import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./Components/Quiz";
import Home from "./Components/Home";
import Performance from "./Components/Performance";
import Scorecard from "./Components/Scorecard"; //
import Certificate from "./Components/Certificate";
import Login from "./Components/Login";
import LoginPage from "./Components/Loginpage";
import AdminLogin from "./Components/AdminLogin";
import AdminDashboard from "./Components/AdminDashboard";
import ManageQ from "./Components/ManageQ";
import Results from "./Components/Results";
import AuthPage from "./Components/AuthPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/scorecard" element={<Scorecard />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/manageQ" element={<ManageQ />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
