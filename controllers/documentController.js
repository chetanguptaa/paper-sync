const Document = require('../models/documentModel');

const createDocument = async (req, res) => {
    try {
        // const ownerId = req.user.id;
        const owner = req.user.username;
        if(!owner) {
            res.status(401).json({
                error: 'Should be a authorized User'
            })
        }
        const { title, content } = req.body;
        if(!title) {
            res.status(403).json({
                message: 'Document should have a title'
            })
        }
        const newDocument = new Document({
        title,
        content,
        owner: owner,
        });
        await newDocument.save();
        res.status(201).json(newDocument);
    } catch (error) {
        console.error('Error creating document:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createDocument,
};