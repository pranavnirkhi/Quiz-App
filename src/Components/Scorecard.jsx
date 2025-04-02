import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../createClient";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./Scorecard.css";
import { Link } from "react-router-dom";

const Scorecard = () => {
  const navigate = useNavigate();
  const scorecardRef = useRef();
  const [isSaving, setIsSaving] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "N/A", age: "N/A" });

  useEffect(() => {
    const savedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (savedUserDetails) {
      setUserDetails({
        name: savedUserDetails.name || "N/A",
        age: savedUserDetails.age || "N/A",
      });
    }
  }, []);

  const quizData = JSON.parse(localStorage.getItem("quizData")) || {};
  const { score, totalQuestions, selectedAnswers, data, timeTaken } = quizData;

  const passingScore = Math.floor(totalQuestions * 0.5);
  const isPass = score >= passingScore;
  const attemptedQuestions =
    selectedAnswers?.filter((ans) => ans !== undefined).length || 0;

  const saveScoreToSupabase = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("Results")
        .insert([{ name: userDetails.name, score: score }]);
      if (error) {
        console.error("Error inserting data:", error.message);
      } else {
        console.log("Score saved successfully!");
      }
    } catch (error) {
      console.error("Error saving to Supabase:", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (userDetails.name !== "N/A" && score !== undefined) {
      saveScoreToSupabase();
    }
  }, [userDetails, score]);

  const downloadScorecardAsPDF = () => {
    const input = scorecardRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("Quiz_Scorecard.pdf");
    });
  };

  const goBack = () => {
    navigate("/quiz", {
      state: {
        score,
        totalQuestions,
        selectedAnswers,
        data,
        showScore: true,
        timeTaken,
      },
    });
  };

  return (
    <div className="scorecard-wrapper" ref={scorecardRef}>
      <div className="scorecard-box">
        <h1 className="scorecard-title">🎯 Quiz Scorecard</h1>
        <div className="student-info">
          <p>
            👤 <strong>Name:</strong> {userDetails.name}
          </p>
          <p>
            🎂 <strong>Age:</strong> {userDetails.age}
          </p>
          <p>
            ⏱️ <strong>Time Taken:</strong> {timeTaken || "N/A"} mins
          </p>
        </div>
        <div className="score-details">
          <div className="score-info">
            <p>
              📊 <strong>Score:</strong> {score} / {totalQuestions}
            </p>
            <p>
              ✅ <strong>Questions Attempted:</strong> {attemptedQuestions} /{" "}
              {totalQuestions}
            </p>
            <p className={isPass ? "pass" : "fail"}>
              {isPass ? "🎉 PASS" : "❌ FAIL"}
            </p>
          </div>
        </div>
        <div className="result-details">
          <h2>📚 Result Overview</h2>
          {data &&
            data.map((q, i) => (
              <div
                key={i}
                className={`question-result ${
                  selectedAnswers[i] === q.answer ? "correct" : "wrong"
                }`}
              >
                <p>
                  <strong>Q{i + 1}:</strong> {q.question}
                </p>
                <p>
                  ✅ <strong>Correct Answer:</strong> {q[`option${q.answer}`]}
                </p>
                <p>
                  📝 <strong>Your Answer:</strong>{" "}
                  {selectedAnswers[i]
                    ? q[`option${selectedAnswers[i]}`]
                    : "Not Attempted"}
                </p>
              </div>
            ))}
        </div>
        <div className="button-group">
          <button className="back-btn" onClick={goBack}>
            🔙 Back
          </button>
          {isPass && (
            <Link to="/certificate">
              <button className="download-btn" onClick={downloadScorecardAsPDF}>
                Certificate
              </button>
            </Link>
          )}
        </div>
        {isSaving && <p>Saving score...</p>}
      </div>
    </div>
  );
};

export default Scorecard;
