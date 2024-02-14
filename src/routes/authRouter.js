const authController = require('../controllers/authController');
const router = require('express').Router();


router.post('/signup', authController.signup_post);


router.post('/login', authController.login_post);

module.exports = router;