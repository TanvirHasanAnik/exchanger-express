const express = require('express');
const router = express();
const controller = require('../controllers/userController');

router.post('/register',controller.register);
router.post('/login',controller.login);

module.exports = router;