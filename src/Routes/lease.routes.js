const router = require("express").Router();
const leaseController = require('../Controllers/lease.controller');

router.post('/', leaseController.add);
router.post('/:id', leaseController.get);

module.exports = router;