const router = require("express").Router();
const paymentController = require('../Controllers/payments.controller');

router.post('/', paymentController.add);
router.post('/get/:id', paymentController.get);
router.post('/get-property/:id', paymentController.getByPropertyId);

module.exports = router;