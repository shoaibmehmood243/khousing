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
    },
    getByCompany: async(req, res, next)=> {
        try {
            const id = req.params.id;
            const search = req.body.search;
            const data = await Portfolio.getByCompany(id, search);
            if(data.length > 0) {
                res.status(200).send({status: true, data: data});
            } else {
                res.status(404).send({status: false, message: 'No data exists.'});
            }   
        } catch (error) {
            next(error);
        }
    },
    add: async(req, res, next)=> {
        try {
            const portfolioObj = new Portfolio(req.body);
            const data = await Portfolio.add(portfolioObj);
            res.status(200).send({status: true, data: data});
        } catch (error) {
            next(error);
        }
    },
}

module.exports = portfolioController;