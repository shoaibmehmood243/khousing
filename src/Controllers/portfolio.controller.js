const Portfolio = require('../Models/Portfolio.model');

const portfolioController = {
    getByUserId: async(req, res, next)=> {
        try {
            const id = req.params.id;
            const data = await Portfolio.getByUserId(id);
            if(data.length > 0) {
                res.status(200).send({status: true, data: data});
            } else {
                res.status(404).send({status: false, message: 'No data exists.'});
            }   
        } catch (error) {
            next(error);
        }
    }
}

module.exports = portfolioController;