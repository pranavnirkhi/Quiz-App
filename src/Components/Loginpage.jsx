import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import backgroundimg from "../assets/backgroundimg.jpg"; //

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedData = JSON.parse(localStorage.getItem("userDetails"));

    if (
      storedData &&
      storedData.name === name &&
      storedData.password === password
    ) {
      setMessage("Login successful!");
      setIsError(false);

      setTimeout(() => navigate("/home"), 1500);
    } else {
      setMessage("Invalid name or password. Please try again.");
      setIsError(true);
    }
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${backgroundimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <h1 className={styles.mainHeading}>Login to Start Test</h1>

      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <button
        onClick={handleLogin}
        className={`${styles.button} ${styles.registerButton}`}
      >
        Login
      </button>

      {/* Message displayed below the button */}
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

export default LoginPage;
