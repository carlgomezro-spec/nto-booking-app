const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const passport = require('passport');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Google auth
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        const token = req.user.token;
        const redirectUrl = `${process.env.FRONTEND_REDIRECT_URL}?token=${token}`;
        return res.redirect(redirectUrl);
    }
);

module.exports = router;
