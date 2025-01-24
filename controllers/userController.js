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
const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, username, email, created_at FROM users');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

const getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query('SELECT id, username, email, created_at FROM users WHERE id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};



module.exports = {
    registerUser,
    getAllUsers,

};