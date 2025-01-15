import React, { useState, useEffect } from 'react';
import api from '../services/axios';  // Assuming you have API configured

const MyCollection = () => {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await api.get('/user/collection'); // Adjust API endpoint as needed
        setCollection(response.data.data); // Assuming the response contains an array of Pokémon
      } catch (error) {
        console.error('Error fetching collection:', error);
      }
    };

    fetchCollection();
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-yellow-600 mb-8">My Pokémon Collection</h1>

        {/* List of Pokémon in the collection */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {collection.map((pokemon) => (
            <li
              key={pokemon._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
            >
              <div className="flex flex-col items-center">
                <img
                  src={pokemon.imageURL}
                  alt={pokemon.name}
                  className="w-28 h-28 rounded-full mb-6 object-cover"
                />
                <h3 className="text-2xl font-semibold text-yellow-600">{pokemon.name}</h3>
                <p className="text-gray-700 mt-2 text-center">
                  Type: {pokemon.type.join(', ')}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyCollection;
