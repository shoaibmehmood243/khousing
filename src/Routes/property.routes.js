const router = require("express").Router();
const propertyController = require('../Controllers/property.controller')

router.post('/', propertyController.add);
router.post('/:id', propertyController.get);

module.exports = router;