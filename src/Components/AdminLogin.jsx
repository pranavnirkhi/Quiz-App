import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminLogin.module.css";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const adminUser = "admin";
    const adminPass = "admin123";

    if (
      credentials.username === adminUser &&
      credentials.password === adminPass
    ) {
      setMessage("Login Successful!");
      setIsError(false);

      setTimeout(() => navigate("/adminDashboard"), 1500);
    } else {
      setMessage("Invalid Admin Credentials!");
      setIsError(true);
    }
  };

  return (
    <div className={styles.container}>
      {/* Admin Logo */}
      <img src="/user.png" alt="user" className={styles.logo} />
      <h1 className={styles.title}>Admin Login</h1>
      <input
        type="text"
        name="username"
        placeholder="Admin Username"
        value={credentials.username}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="password"
        name="password"
        placeholder="Admin Password"
        value={credentials.password}
        onChange={handleChange}
        className={styles.input}
      />
      <button onClick={handleLogin} className={styles.loginButton}>
        Login
      </button>

      {message && (
        <div
          className={styles.message}
          style={{ color: isError ? "red" : "green", marginTop: "10px" }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
