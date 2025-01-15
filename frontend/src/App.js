import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import AddPokemon from './components/AddPokemon';
import PokemonDetails from './components/PokemonDetails';
import UpdatePokemon from './components/UpdatePokemon';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PrivateRoute from './components/PrivateRoutes';
import MyCollection from './components/MyCollection';  // New MyCollection component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />} 
        />
        <Route 
          path="/" 
          element={<PrivateRoute><PokemonList /></PrivateRoute>} 
        />
        <Route 
          path="/add" 
          element={<PrivateRoute><AddPokemon /></PrivateRoute>} 
        />
        <Route 
          path="/update/:id" 
          element={<PrivateRoute><UpdatePokemon /></PrivateRoute>} 
        />
        <Route 
          path="/pokemons/:id" 
          element={<PrivateRoute><PokemonDetails /></PrivateRoute>} 
        />
        <Route 
          path="/my-collection" 
          element={<PrivateRoute><MyCollection /></PrivateRoute>} 
        />
      </Routes>
    </Router>
  );
};

export default App;
