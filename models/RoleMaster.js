const mongoose = require('mongoose');

const roleMasterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('RoleMaster', roleMasterSchema);
