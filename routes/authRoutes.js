const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'   
}));

router.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Unauthorized'})
    }
    res.json({ message: `Welcome ${req.user.username}`});
});

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.json({ message: 'Logged out succesfully'});
    });
});

module.exports = router;