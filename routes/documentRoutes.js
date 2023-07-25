const express = require('express');
const { createDocument, collaborate } = require('../controllers/documentController');
const { authenticateJwt } = require('../middleware/auth');

const router = express.Router();

router.post('/api/document', authenticateJwt, createDocument);
router.post('/api/document/collaborate/:documentId', authenticateJwt, collaborate);

module.exports = router;