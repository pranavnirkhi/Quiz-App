import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      {/* Big Quizzy Title */}
      <h1 className="quizzy-title">Quizzy</h1>

      {/* Main Content Block */}
      <div className="home-container">
        <h1 className="home-title">
          Welcome to the Ultimate Quiz Challenge! 🎯
        </h1>
        <p className="home-text">
          Test your knowledge and challenge yourself with our fun and
          interactive quiz. Are you ready to prove your skills? 🚀
        </p>

        {/* Rules and Regulations Section */}
        <div className="rules-section">
          <h2>📜 Rules </h2>
          <ul className="rules-list">
            <li>
              ✅ You have <strong>30 seconds</strong> to complete the quiz.
            </li>
            <li>
              ✅ Each question carries <strong>1 point</strong>.
            </li>
            <li>
              ✅ You cannot return to the previous question once you finish the
              quiz.
            </li>

            <li>✅ Your final score will be displayed at the end.</li>
            <li>
              ✅ Click on <strong>"Show Performance"</strong> to view correct
              answers and your choices.
            </li>
          </ul>
        </div>

        <Link to="/quiz">
          <button className="home-button">Start Test ➜</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
