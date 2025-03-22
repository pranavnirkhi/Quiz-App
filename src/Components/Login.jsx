import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = () => {
    localStorage.setItem("userDetails", JSON.stringify(formData));
    alert("Details saved successfully!");
    setFormData({ name: "", age: "", mobile: "", email: "" });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.mainHeading}>Quizzy Test</h1>

      <h2 className={styles.title}>Register</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
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
        value={formData.password}
        onChange={handleChange}
        className={styles.input}
      />
      <Link to="/home">
        <button onClick={handleRegister} className={styles.button}>
          Register
        </button>
      </Link>
    </div>
  );
};

export default Login;
