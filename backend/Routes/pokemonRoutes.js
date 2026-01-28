const express = require('express');
const { 
    getAllPokemon, 
    getPokemonById,
    addPokemon,
    deletePokemon,
    updatePokemon,
    filterPokemonByType,
    getPokemonSortedByDate,
    searchPokemonByName,
    getPokemonTypes
} = require('../Controllers/pokemonController');
const token = require('../auth/middleware');
const pokemonRouter = express.Router();


pokemonRouter.get('/filter', token, filterPokemonByType);
pokemonRouter.get('/sort', token, getPokemonSortedByDate);
pokemonRouter.get('/search', token, searchPokemonByName);  
pokemonRouter.get('/types', token, getPokemonTypes);

pokemonRouter.get('/', token, getAllPokemon);
pokemonRouter.post('/', token, addPokemon);
pokemonRouter.delete('/:id', token, deletePokemon);
pokemonRouter.put('/:id', token, updatePokemon);
pokemonRouter.get('/:id', getPokemonById);  

module.exports = pokemonRouter;
