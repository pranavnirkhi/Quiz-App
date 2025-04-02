import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { fetchData } from "../assets/data"; // Import fetch function
import { supabase } from "../createClient";
import "./Quiz.css";

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [index, setIndex] = useState(
    parseInt(localStorage.getItem("currentIndex")) || 0
  );
  const [score, setScore] = useState(location.state?.score || 0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showScore, setShowScore] = useState(
    location.state?.showScore || false
  );

  // ✅ Fetch data from Supabase when the component mounts
  useEffect(() => {
    fetchData().then(setData);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 || showScore) return;
    const timer = setInterval(
      () => setTimeLeft((prevTime) => prevTime - 1),
      1000
    );
    return () => clearInterval(timer);
  }, [timeLeft, showScore]);

  useEffect(() => {
    if (timeLeft === 0) autoSubmit();
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem("currentIndex", index);
  }, [index]);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const handleAnswerSelect = (optionIndex) => {
    let newAnswers = [...selectedAnswers];
    newAnswers[index] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const next = () => {
    if (selectedAnswers[index] !== undefined) {
      if (index === data.length - 1) {
        submitTest();
      } else {
        setIndex(index + 1);
      }
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
    setShowScore(false);
    localStorage.removeItem("quizData");
    localStorage.removeItem("currentIndex");
  };

  const submitTest = () => {
    console.log("Selected Answers:", selectedAnswers);
    console.log(
      "Correct Answers:",
      data.map((q) => q.answer)
    );

    const finalScore = selectedAnswers.filter(
      (ans, i) => ans === data[i].answer // ✅ Compare correctly
    ).length;

    console.log("Final Score:", finalScore); // Debugging output

    setScore(finalScore);
    setShowScore(true);

    const quizData = {
      score: finalScore,
      totalQuestions: data.length,
      selectedAnswers: selectedAnswers,
      correctAnswers: data.map((q) => q.answer),
      data: data,
    };

    localStorage.setItem("quizData", JSON.stringify(quizData));
  };

  const autoSubmit = () => {
    submitTest();
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {!showScore && index < data.length && (
        <div className="timer">⏳ Time Left: {timeLeft}</div>
      )}

      {showScore ? (
        // ✅ Final Score Page (Displayed after finishing the test)
        <>
          <h2>
            You Scored {score} out of {data.length}
          </h2>
          <div className="button-group">
            <button onClick={() => navigate("/performance")}>
              Show Performance
            </button>
            <Link to="/">
              <button onClick={reset}>Reset</button>
            </Link>
            <button onClick={() => navigate("/scorecard")}>Scorecard</button>
          </div>
        </>
      ) : (
        // ✅ Quiz Question Display
        <>
          <h2>
            {index + 1}. {data[index].question}
          </h2>
          <ul>
            {["option1", "option2", "option3", "option4"].map((option, i) => (
              <li
                key={i}
                className={`option${
                  selectedAnswers[index] === i + 1 ? " selected" : ""
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
      )}
    </div>
  );
};

export default Quiz;
