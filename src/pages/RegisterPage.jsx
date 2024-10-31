// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useAuth } from "../contextApi/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, username, password);
      navigate("/"); // Redirect to content page after registration
    } catch (err) {
      setError(err.message); // Display error if registration fails
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-dim">
        <h2 className="text-3xl font-bolder mb-6">Register</h2>
        <form
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-dark font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-dark font-medium mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-dark font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-dark text-white py-2 rounded-lg font-medium hover:bg-medium transition-colors"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-sm">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </>
  );
};

export default RegisterPage;
