import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./Performance.css";

const Performance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions, data, selectedAnswers } = location.state || {};

  const goBack = () => {
    navigate("/quiz", {
      state: {
        score: score,
        totalQuestions: totalQuestions,
        showScore: true, // ✅ Flag to show score display
      },
    });
  };

  return (
    <div className="performance-container">
      <h1>📊 Quiz Performance</h1>
      <h2>
        You scored {score} out of {totalQuestions}
      </h2>

      <ul>
        {data.map((question, qIndex) => {
          const correctAnswer = question["option" + question.ans]; // ✅ Correct answer

          // ✅ Map selected answer index to the corresponding option text
          const selectedIndex = selectedAnswers[qIndex];
          const userAnswer =
            selectedIndex !== undefined
              ? question[`option${selectedIndex}`]
              : "Not Answered";

          return (
            <li key={qIndex} className="performance-item">
              <strong>Q{qIndex + 1}:</strong> {question.question}
              <br />
              {/* ✅ User's Answer with Green or Red Highlight */}
              <span
                className={`answer-feedback ${
                  userAnswer === correctAnswer
                    ? "correct-answer"
                    : "wrong-answer"
                }`}
              >
                Your Answer: {userAnswer}
              </span>
              <br />
              {/* ✅ Correct Answer Display */}
              <span className="correct-answer">
                ✅ Correct Answer: {correctAnswer}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="button-group">
        {/* ✅ Back Button */}
        <button className="btn-back" onClick={goBack}>
          🔙 Back
        </button>

        <Link to="/">
          <button className="btn-home">🏠 Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Performance;
