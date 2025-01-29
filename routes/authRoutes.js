const express = require('express');
const passport = require('passport');
const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user with username and password.
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'   
}));

/**
 * @swagger
 * /auth/dashboard:
 *   get:
 *     summary: User dashboard
 *     description: Returns a welcome message if authenticated.
 *     responses:
 *       200:
 *         description: Welcome message
 *       401:
 *         description: Unauthorized
 */

router.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Unauthorized'})
    }
    res.json({ message: `Welcome ${req.user.username}`});
});

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: User logout
 *     description: Logs out the authenticated user.
 *     responses:
 *       200:
 *         description: Logout successful
 */

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.json({ message: 'Logged out succesfully'});
    });
});

module.exports = router;