// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.post('/login',AuthController.adminLogin );
router.post('/register', AuthController.adminRegister);
router.post('/verify_token', AuthController.verifyToken);

module.exports = router;
