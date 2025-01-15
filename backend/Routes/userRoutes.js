const express = require('express');

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    loginController
} = require('../Controllers/userController');
const userRouter = express.Router();

userRouter.post('/register', createUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUserById);
userRouter.delete('/:id', deleteUserById);
userRouter.post('/login', loginController);

module.exports = userRouter;
