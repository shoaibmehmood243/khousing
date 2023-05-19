const router = require("express").Router();
const paymentController = require('../Controllers/payments.controller');

router.post('/', paymentController.add);
router.post('/get/:id', paymentController.get);
router.post('/get-payments/:id', paymentController.getByPaymentId);
router.post('/record',paymentController.recordPayment);
router.post('/transactions/:id', paymentController.getTransactions);
router.post('/transactions/upcoming/:id', paymentController.getUpcomingTransactions);

module.exports = router;