import React, { useState, useEffect } from 'react';
import { Link, replace, useNavigate } from 'react-router-dom'; 
import api from '../services/axios';

const PokemonList = () => {
  const navigate = useNavigate(); 
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [allTypes, setAllTypes] = useState([]); 
  const [sortOrder, setSortOrder] = useState('newest'); 

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        console.log('list token:', sessionStorage.getItem('token'));
        const response = await api.get('/pokemon');
        setPokemons(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    const fetchTypes = async () => {
      try {
        const response = await api.get('/pokemon/types');
        if (Array.isArray(response.data.data)) {
          setAllTypes(response.data.data);
        } else {
          console.error('Invalid response format for types:', response.data.data);
        }
      } catch (error) {
        console.error('Error fetching Pokémon types:', error);
      }
    };

    fetchPokemons();
    fetchTypes();
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await api.get('/pokemon/search', {
          params: { name: searchQuery },
        });
        setPokemons(response.data.data);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    } else {
      // If search query is empty, fetch all Pokémon
      try {
        const response = await api.get('/pokemon');
        setPokemons(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    }
  };

  const handleFilter = async () => {
    try {
      const response = await api.get('/pokemon/filter', {
        params: { type: selectedType },
      });
      setPokemons(response.data.data);
    } catch (error) {
      console.error('Error filtering Pokémon:', error);
    }
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value); 
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login', replace=true); 
  };
  

  const sortedPokemons = pokemons.sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt); 
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  return (
    <div className="bg-gradient-to-r from-blue-400 to-indigo-600 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6">
        {/* Logout Button */}
        <div className="flex justify-end">
          <button onClick={handleLogout} className="text-2xl text-red-600 hover:text-red-800">
            Logout
          </button>
        </div>
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-yellow-600 mb-8">Pokémon List</h1>

        {/* "My Collection" Button */}
        <div className="flex justify-start mb-4">
          <Link to="/my-collection">
            <button className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition duration-200">
              My Collection
            </button>
          </Link>
        </div>


        {/* Search and Filter Section */}
        <div className="flex justify-center space-x-6 mb-8">
          {/* Search Bar */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search Pokémon by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-yellow-400 w-64"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition duration-200"
            >
              Search
            </button>
          </div>

          {/* Filter by Type */}
          <div className="flex items-center space-x-2">
            <select
              onChange={handleTypeChange}
              value={selectedType}
              className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select Type</option>
              {Array.isArray(allTypes) &&
                allTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </select>
            <button
              onClick={handleFilter}
              className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition duration-200"
            >
              Apply Filter
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center">
            <select
              onChange={handleSortChange}
              value={sortOrder}
              className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-yellow-400"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Pokémon List */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedPokemons.map((pokemon) => (
            <li key={pokemon._id} className="bg-white p-4 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
              <Link to={`/pokemons/${pokemon._id}`} className="flex flex-col items-center text-center">
                <img
                  src={pokemon.imageURL}
                  alt={pokemon.name}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h3 className="text-2xl font-semibold text-yellow-600">{pokemon.name}</h3>
                <p className="text-gray-700 mt-2">Type: {pokemon.type.join(', ')}</p>
              </Link>
            </li>
          ))}
        </ul>

        {/* Button to Add Pokémon */}
        <div className="flex justify-center mt-8">
          <Link to="/add">
            <button className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition duration-200">
              Add Pokémon
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
