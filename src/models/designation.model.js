/**
 * Designation Model
 * Database schema for Designation master entity
 */

const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Designation name is required'],
        unique: true,
        trim: true,
        maxLength: [100, 'Designation name cannot exceed 100 characters']
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

module.exports = mongoose.model('Designation', designationSchema);
