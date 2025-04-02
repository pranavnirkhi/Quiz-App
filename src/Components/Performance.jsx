import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Performance.css";

const Performance = () => {
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState(() => {
    const savedData = localStorage.getItem("quizData");
    return savedData ? JSON.parse(savedData) : {};
  });

  const { score, totalQuestions, data, selectedAnswers } = quizData;

  const goBack = () => {
    navigate("/quiz", {
      state: { score, totalQuestions, showScore: true },
    });
  };

  const resetQuiz = () => {
    localStorage.removeItem("quizData");
    navigate("/quiz");
  };

  if (!data || !selectedAnswers) {
    return (
      <div className="performance-container">
        <h1>No Performance Data Found</h1>
        <Link to="/">🏠 Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="performance-container">
      <h1>📊 Quiz Performance</h1>
      <h2>
        You scored {score} out of {totalQuestions}
      </h2>

      <ul>
        {data.map((question, index) => {
          const correctAnswer = question[`option${question.answer}`]; // ✅ Fetch correct answer dynamically
          const selectedIndex = selectedAnswers[index];
          const userAnswer = selectedIndex
            ? question[`option${selectedIndex}`]
            : "Not Answered";

          return (
            <li key={index} className="performance-item">
              <strong>Q{index + 1}:</strong> {question.question}
              <br />
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
              <span className="correct-answer">
                ✅ Correct Answer: {correctAnswer}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="button-group">
        <button className="btn-back" onClick={goBack}>
          🔙 Back
        </button>
        <Link to="/">
          <button className="btn-home">🏠 Home</button>
        </Link>
        <button className="btn-reset" onClick={resetQuiz}>
          🔄 Reset
        </button>
      </div>
    </div>
  );
};

export default Performance;
