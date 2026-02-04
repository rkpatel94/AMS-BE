const User = require('../models/User');
const mongoose = require('mongoose');

// Get all users
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        next(err);
    }
};

// Get user by ID
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        next(err);
    }
};

// Upsert User
exports.upsertUser = async (req, res, next) => {
    try {
        const { id, ...userData } = req.body;

        let user;
        if (id && mongoose.Types.ObjectId.isValid(id)) {
            user = await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
            if (!user) return res.status(404).json({ error: 'User not found for update' });
        } else {
            user = new User(userData);
            await user.save();
        }

        res.status(id ? 200 : 201).json(user);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        next(err);
    }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully', userId: req.params.id });
    } catch (err) {
        next(err);
    }
};
