import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Quiz.css";
import { data } from "../assets/data";

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const showScore = location.state?.showScore || false;
  const initialScore = location.state?.score || 0;

  const [index, setIndex] = useState(showScore ? data.length : 0);
  const [score, setScore] = useState(initialScore);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

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
      setIndex(data.length);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // ✅ Store the option index instead of content
  const handleAnswerSelect = (optionIndex) => {
    let newAnswers = [...selectedAnswers];
    newAnswers[index] = optionIndex; // Store index (1, 2, 3, 4)
    setSelectedAnswers(newAnswers);
  };

  const next = () => {
    if (selectedAnswers[index] !== undefined) {
      if (index === data.length - 1) {
        const finalScore = selectedAnswers.filter(
          (ans, i) => ans === data[i].ans
        ).length;
        setScore(finalScore);
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
    setTimeLeft(15 * 60);
  };

  const showPerformance = () => {
    navigate("/performance", {
      state: {
        score: score,
        totalQuestions: data.length,
        data: data,
        selectedAnswers: selectedAnswers,
      },
    });
  };

  const goToScorecard = () => {
    navigate("/scorecard", {
      state: {
        score: score,
        totalQuestions: data.length,
      },
    });
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
            <button onClick={reset}>Reset</button>
            <button onClick={goToScorecard}>Scorecard</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
