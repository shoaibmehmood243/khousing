const router = require("express").Router();
const leaseController = require('../Controllers/lease.controller');

router.post('/', leaseController.add);
router.post('/:id', leaseController.get);
router.get('/detail/:id', leaseController.getLeaseDetail);
router.get('/residents/:id', leaseController.getResidents);

module.exports = router;