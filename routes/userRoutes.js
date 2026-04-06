const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/', auth, roleCheck(['Admin']), userController.getAllUsers);
router.put('/:id', auth, roleCheck(['Admin']), userController.updateUser);
router.delete('/:id', auth, roleCheck(['Admin']), userController.deleteUser);

module.exports = router;