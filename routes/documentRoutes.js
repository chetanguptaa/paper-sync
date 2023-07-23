const express = require('express');
const { createDocument } = require('../controllers/documentController');
const { authenticateJwt } = require('../middleware/auth');

const router = express.Router();

router.post('/api/document', authenticateJwt, createDocument);

module.exports = router;