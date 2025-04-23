import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import backgroundimg from "../assets/backgroundimg.jpg";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    setMessage("");
    setFormData({ name: "", age: "", mobile: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = () => {
    if (!formData.name || !formData.password) {
      setMessage("Please enter both name and password.");
      setIsError(true);
      return;
    }

    localStorage.setItem("userDetails", JSON.stringify(formData));
    setMessage("Registered successfully! Switch to login.");
    setIsError(false);
  };

  const handleLogin = () => {
    const storedData = JSON.parse(localStorage.getItem("userDetails"));
    if (
      storedData &&
      storedData.name === formData.name &&
      storedData.password === formData.password
    ) {
      setMessage("Login successful!");
      setIsError(false);
      setTimeout(() => navigate("/home"), 1500);
    } else {
      setMessage("Invalid credentials. Try again.");
      setIsError(true);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundimg})` }}
    >
      <h1 className="absolute top-10 text-6xl font-bold text-white z-10">
        Quizzy Test
      </h1>

      <button
        className="absolute top-6 right-6 bg-red-700 hover:bg-red-400 text-white px-4 py-2 rounded-lg font-semibold shadow-lg z-20"
        onClick={() => navigate("/adminlogin")}
      >
        Admin Login
      </button>

      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 p-8 rounded-xl shadow-2xl max-w-md w-full z-10"
      >
        <h2 className="text-4xl font-bold text-center mb-6 text-white">
          {isLogin ? "Login" : "Register"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
        />

        {!isLogin && (
          <>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile No."
              value={formData.mobile}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
            />
          </>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
        />

        <button
          onClick={isLogin ? handleLogin : handleRegister}
          className={`w-full py-3 rounded-lg font-semibold text-white text-lg ${
            isLogin
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLogin ? "Login" : "Register"}
        </button>

        {message && (
          <p
            className={`mt-4 text-center font-medium text-sm ${
              isError ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-sm text-center text-gray-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-white hover:underline font-semibold"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
