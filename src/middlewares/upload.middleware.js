/**
 * Upload Middleware
 * Handles multipart/form-data for file uploads using Multer
 */

const multer = require('multer');
const ApiError = require('../utils/api-error.util');

// Memory storage is preferred if we're processing files (e.g. to Base64 or cloud storage)
const storage = multer.memoryStorage();

// File filter for images only
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(ApiError.badRequest('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
});

module.exports = upload;
