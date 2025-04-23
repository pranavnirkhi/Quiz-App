import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>

      <div className={styles.buttonContainer}>
        <button onClick={() => navigate("/manageQ")} className={styles.button}>
          Manage Quiz Questions
        </button>

        <button onClick={() => navigate("/results")} className={styles.button}>
          View Quiz Results
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
