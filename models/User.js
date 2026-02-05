const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    name: String, // Combined name for convenience
    email: { type: String, required: true, unique: true }, // Work email
    personalEmail: String,
    contactNumber: String,
    dob: Date,
    doj: Date,
    department: String,
    designation: String,
    role: {
        type: String,
        enum: ['Admin', 'Operator', 'Supervisor', 'Viewer'],
        default: 'Operator'
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Suspended'],
        default: 'Active'
    },
    isActive: { type: Boolean, default: true },
    profileImage: String,
    lastLogin: Date
}, { timestamps: true });

// Pre-save middleware to populate 'name' from firstName and lastName if not provided
userSchema.pre('save', function () {
    if (!this.name) {
        this.name = `${this.firstName} ${this.lastName}`.trim();
    }
});

module.exports = mongoose.model('User', userSchema);
