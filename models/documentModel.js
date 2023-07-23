const mongoose = require('mongoose');
const User = require('./userModel');

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: true,
    },
    collaborators: [{
        type: mongoose.Schema.Types.String,
        ref: 'User',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;