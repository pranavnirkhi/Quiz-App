import React, { useState } from "react";
import "./Quiz.css";
import { data } from "../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  const handleAnswerSelect = (ans) => {
    let newAnswers = [...selectedAnswers];
    newAnswers[index] = ans; // Store selected answer per question
    setSelectedAnswers(newAnswers);
  };

  const next = () => {
    if (selectedAnswers[index] !== undefined) {
      if (index === data.length - 1) {
        let finalScore = selectedAnswers.filter(
          (ans, i) => ans === data[i].ans
        ).length;
        setScore(finalScore);
      }
      setIndex(index + 1);
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setSelectedAnswers([]);
    setShowCorrectAnswers(false);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {index < data.length ? (
        <>
          <h2>
            {index + 1}. {data[index].question}
          </h2>
          <ul>
            {"option1 option2 option3 option4".split(" ").map((option, i) => (
              <li
                key={i}
                className={`${
                  selectedAnswers[index] === i + 1
                    ? "selected black-border"
                    : ""
                }`}
                onClick={() => handleAnswerSelect(i + 1)}
              >
                {data[index][option]}
              </li>
            ))}
          </ul>
          <button
            onClick={next}
            disabled={selectedAnswers[index] === undefined}
          >
            {index === data.length - 1 ? "Finish" : "Next"}
          </button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      ) : (
        <>
          <h2>
            You Scored {score} out of {data.length}
          </h2>
          {showCorrectAnswers && (
            <ul>
              {data.map((question, qIndex) => (
                <li key={qIndex}>
                  <strong>Q{qIndex + 1}:</strong> {question.question} <br />
                  <span
                    className={
                      selectedAnswers[qIndex] === question.ans
                        ? "correct"
                        : "wrong"
                    }
                  >
                    Your Answer:{" "}
                    {question["option" + selectedAnswers[qIndex]] ||
                      "Not Answered"}
                  </span>
                  <br />
                  <span className="correct">
                    Correct Answer: {question["option" + question.ans]}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {!showCorrectAnswers && (
            <button onClick={() => setShowCorrectAnswers(true)}>
              Show Performance
            </button>
          )}
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default Quiz;
