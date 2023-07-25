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

const collaborate = async (req, res) => {
    const username = req.user.username;
    const documentId = req.params.documentId;
    try {
        const document = await Document.findById(documentId);
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        if (document.owner.toString() !== username && !document.collaborators.includes(username)) {
            return res.status(403).json({ error: 'You are not authorized to collaborate on this document' });
        }
        res.status(200).json({ message: `${username} successfully joined the document` });
    } catch (error) {
        res.status(500).json({ error: `${username} failed to join on the document` });
    }
  }

module.exports = {
    createDocument,
    collaborate
};