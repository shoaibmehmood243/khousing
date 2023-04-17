const router = require("express").Router();
const portfolioController = require('../Controllers/portfolio.controller')

router.get('/:id', portfolioController.getByUserId);
router.get('/get-by-company/:id', portfolioController.getByCompany);
router.post('/', portfolioController.add);

module.exports = router;