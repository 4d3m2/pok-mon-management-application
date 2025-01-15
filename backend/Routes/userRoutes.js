const express = require("express");
const {
    createUser,
    loginController,
    addPokemonToCollection,
    getUserCollection,
} = require("../Controllers/userController");
const authenticate = require("../auth/middleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginController);

// Secure routes
router.post("/collection/add", authenticate, addPokemonToCollection);
router.get("/collection", authenticate, getUserCollection);

module.exports = router;
