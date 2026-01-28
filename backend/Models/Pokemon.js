const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: [String], required: true },
    imageURL: { type: String, required: true },
    abilities: { type: [String] },
    stats: {
        hp: { type: Number, required: false },
        attack: { type: Number, required: false },
        defense: { type: Number, required: false },
        speed: { type: Number, required: false },
    },
}, { timestamps: true });

module.exports = mongoose.model('Pokemon', PokemonSchema);
