/**
 * Role Master Model
 * Database schema for Role master entity
 */

const mongoose = require('mongoose');

const roleMasterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Role name is required'],
        unique: true,
        trim: true,
        maxLength: [100, 'Role name cannot exceed 100 characters']
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

// Index for name lookups
roleMasterSchema.index({ name: 1 });

module.exports = mongoose.model('RoleMaster', roleMasterSchema);
