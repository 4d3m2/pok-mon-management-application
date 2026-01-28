require('dotenv').config();

const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.json({
            status: "success",
            data: user,
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: 'error', message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: 'error', message: "Invalid password" });
        }

        
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        return res.json({
            status: 'success',
            token: token,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message || 'An error occurred',
        });
    }
};

const addPokemonToCollection = async (req, res) => {
    try {
        const { pokemonId } = req.body;

        // Use req.user.userId provided by the middleware
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        if (user.collection.includes(pokemonId)) {
            return res.status(400).json({ status: "error", message: "Pokemon already in collection" });
        }

        user.collection.push(pokemonId);
        await user.save();

        res.json({
            status: "success",
            data: user.collection,
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

const getUserCollection = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate("collection");

        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        res.json({
            status: "success",
            data: user.collection,
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

module.exports = {
    createUser,
    loginController,
    addPokemonToCollection,
    getUserCollection,
};
