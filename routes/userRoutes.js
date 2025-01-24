const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

//Auth middleware
router.post('/register', userController.registerUser);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
