import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextApi/AuthContext"; // Import useAuth

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/content"); // Redirect to content page on successful login
    } catch (err) {
      setError(err.message); // Display error if login fails
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dim">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bolder text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
              autoComplete="username" // Recommended autocomplete attribute
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
              autoComplete="current-password" // Recommended autocomplete attribute
            />
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-dark text-white p-2 rounded hover:bg-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
