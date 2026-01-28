const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  
    if (!token) {
        return res.status(401).json({ status: 'error', message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ status: 'error', message: 'User not found' });
        }

        req.user = {
            userId: user._id,
            name: user.name,
            lastname: user.lastname,
            role: user.role,
            email: user.email
        };

        next(); 
    } catch (error) {
        return res.status(401).json({ status: 'error', message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
