const router = require("express").Router();
const userController = require('../Controllers/user.controller')

router.get('/permissions/:id', userController.getPermissions);
router.get('/', userController.getUserById);

module.exports = router;