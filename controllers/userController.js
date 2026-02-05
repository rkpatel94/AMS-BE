const User = require('../models/User');
const mongoose = require('mongoose');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        const usersWithFullName = users.map(user => ({
            id: user._id,
            fullName: `${user.firstName} ${user.lastName}`.trim(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            department: user.department,
            designation: user.designation,
            status: user.status,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }));
        res.json(usersWithFullName);
    } catch (err) {
        console.error('getAllUsers error:', err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error('getUserById error:', err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
};

// Upsert User
exports.upsertUser = async (req, res) => {
    console.log('upsertUser body:', req.body);
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
        console.error('upsertUser error:', err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully', userId: req.params.id });
    } catch (err) {
        console.error('deleteUser error:', err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
};
