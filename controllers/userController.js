const bcrypt = require('bcrypt');
const User = require('../models/userModel');


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        //Verifies if user exists
        const existingUser = await User.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }
        //Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //Create new user
        const newUser = await User.createUser(username, email, hashedPassword);

        res.status(201).json({
            message: 'User registered Succesfully',
            user: { id: newUser.id, username: newUser.username, email: newUser.email}
        });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    };
};

module.exports = {
    registerUser
};