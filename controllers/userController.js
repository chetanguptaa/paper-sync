const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const SALT_FACTOR = config.get('saltWorkFactor');
const SECRET = config.get('secret');

const createUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        username
    });
    if( user ) {
        res.status(403).json({
            message: 'User already exists'
        })
    } else {
        const hashedPassword = await bcrypt.hash(password, SALT_FACTOR);
        const newUser = new User({
            username,
            password: hashedPassword, 
        });
        await newUser.save(); 
        const token = jwt.sign({ username }, SECRET, {expiresIn: '1h'});
        res.json({
            message: 'User created successfully', 
            token,
        })
    }
}
const logInUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }
        res.status(200).json({
            message: 'Login successful',
            user: {
                _id: user._id,
                username: user.username,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error during login',
            error: error.message,
        });
    }
}


module.exports = {
    createUser,
    logInUser,
}