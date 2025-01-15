import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';  

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();  

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/user/register', { name, email, password });

      if (response.data.status === "success") {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login'); 
        }, 2000);  
      } else {
        setErrorMessage('Registration failed! Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error during registration. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-yellow-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" // Pikachu image
            alt="Pikachu"
            className="w-20 h-20 rounded-full"
          />
        </div>
        <h1 className="text-4xl font-extrabold text-center text-yellow-800 mb-4">Trainer Registration</h1>

        <form onSubmit={handleRegister}>
          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-white font-bold rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition duration-200"
          >
            Register
          </button>

          {/* Error and Success Messages */}
          {errorMessage && <p className="text-center text-red-500 mt-3">{errorMessage}</p>}
          {successMessage && <p className="text-center text-green-500 mt-3">{successMessage}</p>}
        </form>

        {/* Already have an account? */}
        <div className="mt-6 text-center">
          <p className="text-gray-700">Already have an account?</p>
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline mt-2"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
