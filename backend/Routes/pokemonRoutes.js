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

pokemonRouter.get('/:id', getPokemonById);  


pokemonRouter.get('/filter', token, filterPokemonByType);
pokemonRouter.get('/sort', token, getPokemonSortedByDate);
pokemonRouter.get('/search', token, searchPokemonByName);  
pokemonRouter.get('/types', token, getPokemonTypes);

pokemonRouter.get('/', token, getAllPokemon);
pokemonRouter.post('/', token, addPokemon);
pokemonRouter.delete('/:id', token, deletePokemon);
pokemonRouter.put('/:id', token, updatePokemon);


module.exports = pokemonRouter;
