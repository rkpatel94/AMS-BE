const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: ['Admin', 'Operator', 'Supervisor', 'Viewer'],
        default: 'Operator'
    },
    department: String,
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Suspended'],
        default: 'Active'
    },
    lastLogin: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
