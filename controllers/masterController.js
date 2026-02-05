const Department = require('../models/Department');
const RoleMaster = require('../models/RoleMaster');
const Designation = require('../models/Designation');
const mongoose = require('mongoose');

const getModel = (type) => {
    switch (type.toLowerCase()) {
        case 'department': return Department;
        case 'role': return RoleMaster;
        case 'designation': return Designation;
        default: return null;
    }
};

// Get all items
exports.getAll = async (req, res) => {
    try {
        const Model = getModel(req.params.type);
        if (!Model) return res.status(400).json({ error: 'Invalid master type' });

        const items = await Model.find().sort({ name: 1 });
        res.json(items);
    } catch (err) {
        console.error('getAll error:', err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
};

// Get by ID
exports.getById = async (req, res) => {
    try {
        const Model = getModel(req.params.type);
        if (!Model) return res.status(400).json({ error: 'Invalid master type' });

        const item = await Model.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
    } catch (err) {
        console.error('getById error:', err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
};

// Upsert
exports.upsert = async (req, res) => {
    try {
        const Model = getModel(req.params.type);
        if (!Model) return res.status(400).json({ error: 'Invalid master type' });

        const { id, ...data } = req.body;

        let item;
        if (id && mongoose.Types.ObjectId.isValid(id)) {
            item = await Model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
            if (!item) return res.status(404).json({ error: 'Item not found for update' });
        } else {
            item = new Model(data);
            await item.save();
        }

        res.status(id ? 200 : 201).json(item);
    } catch (err) {
        console.error('upsert error:', err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Name already exists' });
        }
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
};

// Delete
exports.delete = async (req, res) => {
    try {
        const Model = getModel(req.params.type);
        if (!Model) return res.status(400).json({ error: 'Invalid master type' });

        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Deleted successfully', id: req.params.id });
    } catch (err) {
        console.error('delete error:', err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
};
