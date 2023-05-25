const router = require("express").Router();
const propertyController = require('../Controllers/property.controller')

router.post('/', propertyController.add);
router.post('/:id', propertyController.get);
router.delete('/:id', propertyController.delete);
router.post('/leases/:id', propertyController.getPropertyByLease);
router.post('/customer/payments', propertyController.getCustomerPayments);

module.exports = router;