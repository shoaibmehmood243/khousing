const router = require("express").Router();
const authController = require('../Controllers/auth.controller')

router.post('/register', authController.register);
router.post('/register/customer', authController.customerRegister);
router.post('/login', authController.login);

module.exports = router;