import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./Components/Quiz";
import Home from "./Components/Home";
import Performance from "./Components/Performance";
import Scorecard from "./Components/Scorecard"; //

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/scorecard" element={<Scorecard />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
