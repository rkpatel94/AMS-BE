/**
 * Department Model
 * Database schema for Department master entity
 */

const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Department name is required'],
        unique: true,
        trim: true,
        maxLength: [100, 'Department name cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'Description cannot exceed 500 characters']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Indexing is handled by 'unique: true' in field definition

module.exports = mongoose.model('Department', departmentSchema);
