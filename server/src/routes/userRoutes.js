const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require("multer")
const { validateCreateUser, checkValidationResult } = require('../middleware/validationMiddleware');

const storage = multer.memoryStorage()

const uploads = multer({
    storage : storage
}).single("image")
// GET all users
router.get("/", userController.getAllUsers);

// GET user by ID
router.get("/:id", userController.getUserById);

// Create a new user
router.post("/",uploads,validateCreateUser, checkValidationResult, userController.createUser);

// Update user by ID
router.put("/:id",uploads, userController.updateUserById);

// Delete user by ID
router.delete("/:id", userController.deleteUserById);

module.exports = router;
