const {Router} = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.get('/get-user', authMiddleware.authUser, authController.getUser);

router.get('/logout', authController.logOutUser);

module.exports = router;