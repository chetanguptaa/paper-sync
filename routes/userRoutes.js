const express = require('express');
const { createUser, logInUser } = require('../controllers/userController');

const router = express.Router();

router.post('/users/signup', createUser);
router.post('/users/login', logInUser);

module.exports = router;