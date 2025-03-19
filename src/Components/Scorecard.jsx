import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Scorecard.css";

const Scorecard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scorecardRef = useRef();

  const { score, totalQuestions } = location.state || {};

  const passingScore = Math.floor(totalQuestions * 0.5);
  const isPass = score >= passingScore;

  // ✅ Generate PDF from the Scorecard
  const downloadScorecardAsPDF = () => {
    const input = scorecardRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth - 20; // Add some margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("Quiz_Scorecard.pdf");
    });
  };

  // ✅ Navigate back to the Score Display Page
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
    <div className="scorecard-wrapper" ref={scorecardRef}>
      <div className="scorecard-box">
        <h1 className="scorecard-title">🎯 Your Scorecard</h1>

        <div className="score-details">
          <div className="score-info">
            <p>
              📊 <strong>Score:</strong> {score} / {totalQuestions}
            </p>
            <p className={isPass ? "pass" : "fail"}>
              {isPass ? "🎉 PASS" : "❌ FAIL"}
            </p>
          </div>
        </div>

        <div className="button-group">
          <button className="back-btn" onClick={goBack}>
            🔙 Back
          </button>
          <button className="download-btn" onClick={downloadScorecardAsPDF}>
            ⬇️ Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
