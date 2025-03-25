import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedData = JSON.parse(localStorage.getItem("userDetails"));

    if (
      storedData &&
      storedData.name === name &&
      storedData.password === password
    ) {
      alert("Login successful! ");
      navigate("/home");
    } else {
      alert("Invalid name or password. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
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
      <button onClick={handleLogin} className={styles.button}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
