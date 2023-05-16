const router = require("express").Router();
const billController = require('../Controllers/bill.controller');

router.post('/', billController.add);

module.exports = router;