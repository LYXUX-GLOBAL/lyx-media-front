// src/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LOGO from '../Assets/img/logo/logo.png';
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here (e.g., API call)
    // On successful login, navigate to the home page
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <div className="text-center mb-4">
          <img src={LOGO} alt="Lyxmedia" className="mx-auto mb-2"/>
          <h2 className="text-xl font-semibold">Welcome Back!</h2>
          <p className="text-gray-600">Sign in to your LYXmedia Admin</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter password"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <input type="checkbox" id="remember-me" className="mr-2"/>
              <label htmlFor="remember-me" className="text-gray-600">Remember me</label>
            </div>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-3 py-2 rounded shadow hover:bg-blue-700"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;