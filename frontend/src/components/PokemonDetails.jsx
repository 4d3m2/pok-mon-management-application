import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/axios';

const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await api.get(`/pokemon/id/${id}`);
        console.log(response.data); 
        setPokemon(response.data.data); 
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };
    fetchPokemon();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/pokemon/${id}`);
      alert('Pokémon deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting Pokémon:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/update/${id}`);
  };

  const handleAddToCollection = async () => {
    try {
      const token = sessionStorage.getItem('token'); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await api.post('/user/collection/add', { pokemonId: id }, config);
      alert('Pokémon added to your collection successfully!');
    } catch (error) {
      console.error('Error adding Pokémon to collection:', error);
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  if (!pokemon) return <p>Loading...</p>;

  const type = pokemon.type && pokemon.type.length ? pokemon.type.join(', ') : 'No type available';
  const abilities = pokemon.abilities && pokemon.abilities.length ? pokemon.abilities.join(', ') : 'No abilities available';
  const stats = pokemon.stats || {};

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <div className="flex justify-center mb-6">
          <img
            src={pokemon.imageURL}
            alt={pokemon.name}
            className="w-32 h-32 rounded-full border-4 border-yellow-400"
          />
        </div>
        <h1 className="text-4xl font-extrabold text-center text-yellow-600 mb-4">{pokemon.name}</h1>

        <h3 className="text-xl font-semibold text-gray-800">Type: {type}</h3>
        <h3 className="text-xl font-semibold text-gray-800 mt-2">Abilities: {abilities}</h3>

        <h3 className="text-xl font-semibold text-gray-800 mt-4">Stats:</h3>
        <ul className="ml-4">
          <li>HP: {stats?.hp ?? 'N/A'}</li>
          <li>Attack: {stats?.attack ?? 'N/A'}</li>
          <li>Defense: {stats?.defense ?? 'N/A'}</li>
          <li>Speed: {stats?.speed ?? 'N/A'}</li>
        </ul>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-200"
          >
            Delete Pokémon
          </button>
          <button
            onClick={handleEdit}
            className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition duration-200"
          >
            Edit Pokémon
          </button>
          <button
            onClick={handleAddToCollection}
            className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-200"
          >
            Add to My Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
