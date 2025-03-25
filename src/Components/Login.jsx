import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = () => {
    if (!formData.name || !formData.password) {
      alert("Please enter both name and password.");
      return;
    }

    localStorage.setItem("userDetails", JSON.stringify(formData));
    alert("Details saved successfully! Please log in.");

    // Redirect to login page
    navigate("/loginpage");
  };

  const handleGoToLogin = () => {
    navigate("/loginpage"); // Navigate to LoginPage
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.mainHeading}>Quizzy Test</h1>

      <h2 className={styles.title}>Register</h2>
      <input
        type="text"
        name="name"
        placeholder="Username"
        value={formData.name}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="tel"
        name="mobile"
        placeholder="Mobile No."
        value={formData.mobile}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="password"
        name="password"
        placeholder="Set password"
        value={formData.password}
        onChange={handleChange}
        className={styles.input}
      />

      {/* Button container for horizontal alignment */}
      <div className={styles.buttonContainer}>
        <button onClick={handleRegister} className={styles.button}>
          Register
        </button>

        <button
          onClick={handleGoToLogin}
          className={`${styles.button} ${styles.loginButton}`}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
