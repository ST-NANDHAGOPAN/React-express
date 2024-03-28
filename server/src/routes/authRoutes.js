// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.post('/admin/login',AuthController.adminLogin );
router.post('/admin/register', AuthController.adminRegister);
router.post('/verify_token', AuthController.verifyToken);
router.post('/user/login',AuthController.userLogin );
router.post('/user/register', AuthController.userRegister);
module.exports = router;
