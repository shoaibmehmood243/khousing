const router = require("express").Router();
const paymentMethodController = require('../Controllers/payment-method.controller');

router.post('/', paymentMethodController.add);
router.get('/:id', paymentMethodController.get);

module.exports = router;