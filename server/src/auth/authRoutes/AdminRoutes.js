// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const AdminController = require('../authControllers/AdminController');

router.post('/login', AdminController.adminLogin);
router.post('/register', AdminController.adminRegister);
router.post('/verify_token', AdminController.verifyToken);

module.exports = router;
