import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Certificate.css";

const Certificate = () => {
  const certificateRef = useRef();

  const downloadCertificateAsPDF = () => {
    html2canvas(certificateRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("landscape", "mm", "a4"); // Landscape PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      pdf.save("Certificate_of_Completion.pdf");
    });
  };

  return (
    <div className="certificate-page">
      <div className="certificate-container" ref={certificateRef}>
        <div className="certificate-content">
          <h1 className="certificate-heading">Certificate of Completion</h1>
          <p className="certificate-text">
            This is to certify that <strong>Pranav Nirkhi</strong> has
            successfully passed the <strong>Quizzy Test</strong>.
          </p>

          <div className="appreciation-lines">
            <p> Congratulations on your outstanding achievement!</p>
          </div>

          <div className="company-name">Novapex InfoHub</div>
        </div>
      </div>

      <div className="download-btn-container">
        <button className="download-btn" onClick={downloadCertificateAsPDF}>
          ⬇️ Download Certificate
        </button>
      </div>
    </div>
  );
};

export default Certificate;
