require('dotenv').config();

const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    try {
        const {name, email, password } = req.body;

        const chale = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, chale);
        const user = await User.create({
            name, email, password: hashedPassword
        });

        res.json({
            status: "success",
            data: user,

        })
    }catch (error){
        res.json(error.message);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        res.json({
            status: "success",
            data: user,
        })
    }catch (error) {
        res.json(error.message);
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json({
            status: "success",
            data: user,
        })
    } catch (error){
        res.json(error.message);
    }
};

const updateUserById = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );

        res.json({
            status: "success",
            data: user,
        })
    }catch (error) {
        res.json(error.message);
    }
};

const deleteUserById = async (req, res) => {
    try {
        const user = await User.deleteOne(
            {_id: req.params.id}
        );
        res.json({
            status: "success",
            data: user
        })
    }catch (error) {
        res.json(error.message);
    }
};

const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({status : 'error', message: "invalid email"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(401).json({status : 'error', message: "invalid password"});
        }

        const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: '1h'});
        return res.json({
            status: "success",
            data: token,
        });
    }catch (error) {
        return res.status(500).json({
            status: 'error',

            message: error.message || 'An error occurred',
        });
    }
};


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    loginController
}