const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');


router.post('/register', userController.registerUser);

router.get('/', passport.authenticate('jwt', { session: false }), userController.getAllUsers);

router.get('/:userId', passport.authenticate('jwt', { session: false }), userController.getUserById);

router.put('/:userId', passport.authenticate('jwt', { session: false }), userController.updateUser);

router.delete('/:userId', passport.authenticate('jwt', { session: false }), userController.deleteUser);

module.exports = router;
