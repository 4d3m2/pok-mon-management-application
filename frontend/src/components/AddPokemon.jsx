import React, { useState } from 'react';
import api from '../services/axios';

const AddPokemon = () => {
  const [form, setForm] = useState({
    name: '',
    type: '',
    imageURL: '',
    abilities: '',
    stats: { hp: '', attack: '', defense: '', speed: '' },
  });

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
      await api.post('/pokemon', {
        ...form,
        type: form.type.split(','),
        abilities: form.abilities.split(','),
      });
      alert('Pokémon added successfully!');
    } catch (error) {
      console.error('Error adding Pokémon:', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-indigo-600 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-yellow-600 mb-8">Add Pokémon</h1>

        {/* Pokémon Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Pokémon Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Type</label>
            <input
              type="text"
              name="type"
              placeholder="Enter Pokémon Types (comma separated)"
              value={form.type}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              name="imageURL"
              placeholder="Enter Pokémon Image URL"
              value={form.imageURL}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Abilities</label>
            <input
              type="text"
              name="abilities"
              placeholder="Enter Abilities (comma separated)"
              value={form.abilities}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Stats Section */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">HP</label>
              <input
                type="number"
                name="hp"
                value={form.stats.hp}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Attack</label>
              <input
                type="number"
                name="attack"
                value={form.stats.attack}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Defense</label>
              <input
                type="number"
                name="defense"
                value={form.stats.defense}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Speed</label>
              <input
                type="number"
                name="speed"
                value={form.stats.speed}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition duration-200"
          >
            Add Pokémon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPokemon;
