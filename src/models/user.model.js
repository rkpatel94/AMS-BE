/**
 * User Model
 * Database schema for User entity
 */

const mongoose = require('mongoose');

const VALID_ROLES = ['Admin', 'Operator', 'Supervisor', 'Viewer'];
const VALID_STATUSES = ['Active', 'Inactive', 'Suspended'];

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxLength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxLength: [50, 'Last name cannot exceed 50 characters']
    },
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    personalEmail: {
        type: String,
        lowercase: true,
        trim: true
    },
    contactNumber: {
        type: String,
        trim: true
    },
    dob: {
        type: Date
    },
    doj: {
        type: Date
    },
    department: {
        type: String,
        trim: true
    },
    designation: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: {
            values: VALID_ROLES,
            message: `Role must be one of: ${VALID_ROLES.join(', ')}`
        },
        default: 'Operator'
    },
    status: {
        type: String,
        enum: {
            values: VALID_STATUSES,
            message: `Status must be one of: ${VALID_STATUSES.join(', ')}`
        },
        default: 'Active'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    profileImage: {
        type: String
    },
    lastLogin: {
        type: Date
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for fullName
userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`.trim();
});

// Virtual for avatar with fallback
userSchema.virtual('avatar').get(function () {
    if (this.profileImage) return this.profileImage;
    const name = this.name || `${this.firstName} ${this.lastName}`.trim();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
});

// Pre-save middleware to populate 'name' from firstName and lastName
userSchema.pre('save', function (next) {
    if (!this.name || this.isModified('firstName') || this.isModified('lastName')) {
        this.name = `${this.firstName} ${this.lastName}`.trim();
    }
    next();
});

// Indexing is handled by 'unique: true' in field definitions
// module.exports = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);
