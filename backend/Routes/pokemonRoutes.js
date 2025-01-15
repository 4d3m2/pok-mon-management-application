const express = require('express');
const { 
    getAllPokemon, 
    addPokemon,
    deletePokemon,
    updatePokemon,
    filterPokemonByType,
    getPokemonSortedByDate,
    searchPokemonByName, 
} = require('../Controllers/pokemonController');
const token = require('../auth/middleware');
const pokemonRouter = express.Router();

pokemonRouter.get('/', getAllPokemon);
pokemonRouter.post('/', addPokemon);
pokemonRouter.delete('/:id', token, deletePokemon);
pokemonRouter.put('/:id', token, updatePokemon);
pokemonRouter.get('/filter', token, filterPokemonByType);
pokemonRouter.get('/sort', token, getPokemonSortedByDate);
pokemonRouter.get('/search', token, searchPokemonByName);

module.exports = pokemonRouter;