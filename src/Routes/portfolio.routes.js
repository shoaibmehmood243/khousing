const router = require("express").Router();
const portfolioController = require('../Controllers/portfolio.controller')

router.get('/:id', portfolioController.getByUserId);

module.exports = router;