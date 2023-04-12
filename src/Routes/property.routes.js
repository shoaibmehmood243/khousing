const router = require("express").Router();
const propertyController = require('../Controllers/property.controller')

router.post('/', propertyController.add);

module.exports = router;