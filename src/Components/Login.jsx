import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
    setMessage("Details saved successfully! Please log in.");
    setIsError(false);

    setTimeout(() => navigate("/loginpage"), 1500);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-4 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Top-right corner buttons */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={() => navigate("/loginpage")}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded shadow transition duration-300 transform hover:scale-105"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/adminlogin")}
          className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-4 py-2 rounded shadow transition duration-300 transform hover:scale-105"
        >
          Admin Login
        </button>
      </div>

      {/* Main content */}
      <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow mb-4 z-10">
        Quizzy Test
      </h1>

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-slide-in-up z-10">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
          className="mb-3 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-yellow-600 focus:outline-none"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="mb-3 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-yellow-600 focus:outline-none"
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile No."
          value={formData.mobile}
          onChange={handleChange}
          className="mb-3 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-yellow-600 focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-3 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-yellow-600 focus:outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Set password"
          value={formData.password}
          onChange={handleChange}
          className="mb-4 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-yellow-600 focus:outline-none"
        />

        {/* Only Register Button */}
        <button
          onClick={handleRegister}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 w-full rounded transition-transform transform hover:scale-105"
        >
          Register
        </button>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              isError ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
