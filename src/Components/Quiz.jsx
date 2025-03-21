import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Quiz.css";
import { data } from "../assets/data";

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const showScore = location.state?.showScore || false;
  const initialScore = location.state?.score || 0;

  // ✅ Retrieve saved index from localStorage or default to 0
  const savedIndex = parseInt(localStorage.getItem("currentIndex")) || 0;

  const [index, setIndex] = useState(showScore ? data.length : savedIndex);
  const [score, setScore] = useState(initialScore);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);

  // ⏲️ Timer Logic
  useEffect(() => {
    if (timeLeft <= 0 || showScore) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showScore]);

  useEffect(() => {
    if (timeLeft === 0) {
      autoSubmit(); // ✅ Automatically submit when time runs out
    }
  }, [timeLeft]);

  // ✅ Save current index to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("currentIndex", index);
  }, [index]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    let newAnswers = [...selectedAnswers];
    newAnswers[index] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const next = () => {
    if (selectedAnswers[index] !== undefined) {
      if (index === data.length - 1) {
        submitTest();
      }
      setIndex(index + 1);
    }
  };

  const back = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setSelectedAnswers([]);
    setTimeLeft(30);
    localStorage.removeItem("quizData");
    localStorage.removeItem("currentIndex"); // ✅ Clear saved index
  };

  const submitTest = () => {
    const finalScore = selectedAnswers.filter(
      (ans, i) => ans === data[i].ans
    ).length;

    setScore(finalScore);

    const quizData = {
      score: finalScore,
      totalQuestions: data.length,
      data: data,
      selectedAnswers: selectedAnswers,
    };

    localStorage.setItem("quizData", JSON.stringify(quizData));

    navigate("/performance", {
      state: {
        score: finalScore,
        totalQuestions: data.length,
        selectedAnswers: selectedAnswers,
        data: data,
      },
    });
  };

  const autoSubmit = () => {
    // ✅ Auto-submit on timer expiration
    submitTest();
  };

  const showPerformance = () => {
    navigate("/performance");
  };

  const goToScorecard = () => {
    navigate("/scorecard");
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />

      {index < data.length && !showScore && (
        <div className="timer">⏳ Time Left: {formatTime(timeLeft)}</div>
      )}

      {index < data.length ? (
        <>
          <h2>
            {index + 1}. {data[index].question}
          </h2>
          <ul>
            {["option1", "option2", "option3", "option4"].map((option, i) => (
              <li
                key={i}
                className={`option ${
                  selectedAnswers[index] === i + 1 ? "selected" : ""
                }`}
                onClick={() => handleAnswerSelect(i + 1)}
              >
                {data[index][option]}
              </li>
            ))}
          </ul>

          <div className="button-group">
            {index > 0 && <button onClick={back}>Back</button>}

            <button
              onClick={next}
              disabled={selectedAnswers[index] === undefined}
            >
              {index === data.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>
            You Scored {score} out of {data.length}
          </h2>

          <div className="button-group">
            <button onClick={showPerformance}>Show Performance</button>
            <Link to="/">
              <button onClick={reset}>Reset</button>
            </Link>
            <button onClick={goToScorecard}>Scorecard</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
