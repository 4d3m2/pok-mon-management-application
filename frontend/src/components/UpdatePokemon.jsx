import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/axios';

const UpdatePokemon = () => {
  const [form, setForm] = useState({
    name: '',
    type: '',
    imageURL: '',
    abilities: '',
    stats: { hp: '', attack: '', defense: '', speed: '' },
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await api.get(`/pokemon/id/${id}`);
        setForm({
          name: response.data.data.name,
          type: Array.isArray(response.data.data.type) ? response.data.data.type.join(', ') : '',
          imageURL: response.data.data.imageURL || '', 
          abilities: Array.isArray(response.data.data.abilities) ? response.data.data.abilities.join(', ') : '',
          stats: response.data.data.stats || { hp: '', attack: '', defense: '', speed: '' }, 
        });
      } catch (error) {
        console.error('Error fetching Pokémon for editing:', error);
      }
    };
    fetchPokemon();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.stats) {
      setForm({ ...form, stats: { ...form.stats, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/pokemon/${id}`, {
        ...form,
        type: form.type.split(',').map((item) => item.trim()), 
        abilities: form.abilities.split(',').map((item) => item.trim()), 
      });
      alert('Pokémon updated successfully!');
      navigate(`/pokemons/${id}`);
    } catch (error) {
      console.error('Error updating Pokémon:', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-400 to-yellow-500 min-h-screen flex justify-center items-center p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-yellow-600">Update Pokémon</h1>

        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Pokémon Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Type</label>
          <input
            type="text"
            name="type"
            placeholder="Enter Pokémon Types (comma separated)"
            value={form.type}
            onChange={handleChange}
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Image URL</label>
          <input
            type="text"
            name="imageURL"
            placeholder="Enter Image URL"
            value={form.imageURL}
            onChange={handleChange}
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Abilities</label>
          <input
            type="text"
            name="abilities"
            placeholder="Enter Abilities (comma separated)"
            value={form.abilities}
            onChange={handleChange}
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium">HP</label>
            <input
              type="number"
              name="hp"
              placeholder="HP"
              value={form.stats.hp}
              onChange={handleChange}
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Attack</label>
            <input
              type="number"
              name="attack"
              placeholder="Attack"
              value={form.stats.attack}
              onChange={handleChange}
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Defense</label>
            <input
              type="number"
              name="defense"
              placeholder="Defense"
              value={form.stats.defense}
              onChange={handleChange}
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Speed</label>
            <input
              type="number"
              name="speed"
              placeholder="Speed"
              value={form.stats.speed}
              onChange={handleChange}
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition duration-300"
        >
          Update Pokémon
        </button>
      </form>
    </div>
  );
};

export default UpdatePokemon;
