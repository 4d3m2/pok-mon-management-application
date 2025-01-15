import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate for routing
import api from '../services/axios';  // Your Axios instance

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  // Handle form submit for login
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.post('/user/login', { email, password }, { withCredentials: true });
      
      if (response.data.status === "success") {
        const token = response.data.token; 
        console.log('Token:', token);
  
        sessionStorage.setItem('token', token);

          const storedToken = sessionStorage.getItem('token');
          if (storedToken) {
            navigate('/');
          } else {
            setErrorMessage('Failed to store token');
          }

      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('Error logging in');
      console.error('Login error:', error);
    }
  };
  

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" // Pikachu image
            alt="Pikachu"
            className="w-20 h-20 rounded-full"
          />
        </div>
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-4">Trainer Login</h1>
        
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-white font-bold rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition duration-200"
          >
            Login
          </button>
          
          {/* Error Message */}
          {errorMessage && <p className="text-center text-red-500 mt-3">{errorMessage}</p>}
        </form>

        {/* Register Button */}
        <div className="mt-6 text-center">
          <p className="text-gray-700">Don't have an account?</p>
          <button
            onClick={handleRegisterClick}
            className="text-blue-600 hover:underline mt-2"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
