const mongoose = require('mongoose');
const Pokemon = require('../Models/Pokemon');

const getAllPokemon = async (req, res) => {
    try {
        const pokemons = await Pokemon.find();
        res.json(pokemons);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getPokemonById = async (req, res) => {
    try {
        const id = req.params.id;
        const pokemon = await Pokemon.findById(id);
        if (!pokemon) {
            return res.status(404).json({ message: 'Pokémon not found' });
        }
        res.json({
            status: 'success',
            data: pokemon,
        });
    }catch (error){
        console.log(error)
        res.status(500).json({ message: 'Server Error' });
    }
};

const addPokemon = async (req, res) => {
    const { name, type, imageURL, abilities, stats } = req.body;

    try {
        const existingPokemon = await Pokemon.findOne({ name });
        if (existingPokemon) {
            return res.status(400).json({ message: 'Pokémon already exists' });
        }

        const newPokemon = new Pokemon({ name, type, imageURL, abilities, stats });
        await newPokemon.save();
        res.status(201).json({
            status: 'success',
            data: newPokemon,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const deletePokemon = async (req, res) => {
    try {
        const id = req.params.id;
        const pokemon = await Pokemon.findByIdAndDelete(id);
        if (!pokemon) {
            return res.status(404).json({ message: 'Pokémon not found' });
        }
        res.json({ message: 'Pokémon deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


const updatePokemon = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, imageURL, abilities, stats } = req.body;

        const existingPokemon = await Pokemon.findOne({ name });
        if (existingPokemon && existingPokemon._id.toString() !== id) {
            return res.status(400).json({ message: 'Name conflicts with an existing Pokémon' });
        }

        const updatedPokemon = await Pokemon.findByIdAndUpdate(
            id,
            { name, type, imageURL, abilities, stats },
            { new: true }
        );

        if (!updatedPokemon) {
            return res.status(404).json({ message: 'Pokémon not found' });
        }

        res.status(200).json({ status: 'success', data: updatedPokemon });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


const filterPokemonByType = async (req, res) => {
    try {
        const { type } = req.query;
        if (!type) {
            return res.status(400).json({ message: 'Type query parameter is required' });
        }
        const pokemons = await Pokemon.find({ type: { $in: [type] } });

        res.json({ status: 'success', data: pokemons });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


const getPokemonSortedByDate = async (req, res) => {
    try {
        const pokemons = await Pokemon.find().sort({ createdAt: -1 });
        res.json({ status: 'success', data: pokemons });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const searchPokemonByName = async (req, res) => {
    try {
        const { name } = req.query;
        const pokemons = await Pokemon.find({
            name: { $regex: name, $options: 'i' },
        });
        res.json({ status: 'success', data: pokemons });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getPokemonTypes = async (req, res) => {
    try {
        const types = await Pokemon.distinct('type');
        res.json({ status: 'success', data: types });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = { 
    getAllPokemon, 
    getPokemonById,
    addPokemon,
    deletePokemon,
    updatePokemon,
    filterPokemonByType,
    getPokemonSortedByDate,
    searchPokemonByName,
    getPokemonTypes,
};
