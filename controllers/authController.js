const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.microsoftLogin = async (req, res, next) => {
    try {
        const { email, name, microsoftId } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // 1. Find the user in our database
        let user = await User.findOne({ email });

        // 2. If user doesn't exist, we can either create them or return an error
        // In many Enterprise AMS systems, users are pre-provisioned.
        // However, for this demo/setup, we'll create them if they don't exist.
        if (!user) {
            user = new User({
                name: name || email.split('@')[0],
                email: email,
                role: 'Operator', // Default role
                status: 'Active'
            });
            await user.save();
        }

        // 3. Check if user is active
        if (user.status !== 'Active') {
            return res.status(403).json({ error: 'User account is inactive or suspended' });
        }

        // 4. Update last login
        user.lastLogin = new Date();
        await user.save();

        // 5. Generate JWT Token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET || 'ams_default_secret_key',
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        next(err);
    }
};
