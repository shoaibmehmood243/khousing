const Payment = require('../Models/Payment.model');

const paymentController = {
    add: async(req, res, next)=> {
        try {
            const paymentObj = new Payment(req.body);
            const data = await Payment.add(paymentObj);
            res.status(200).send({status: true, data: data});
        } catch (error) {
            next(error);
        }
    },
    get: async(req, res, next)=> {
        try {
            const id = req.params.id;
            const search = req.body.search;
            const data = await Payment.get(id, search);
            if(data.length > 0) {
                res.status(200).send({status: true, data: data});
            } else {
                res.status(404).send({status: false, message: 'No data exists.'});
            }   
        } catch (error) {
            next(error);
        }
    },
    getByPropertyId: async(req, res, next)=> {
        try {
            const id = req.params.id;
            const search = req.body.search;
            const propertyId = req.body.propertyId;
            const data = await Payment.getById(id, propertyId, search);
            if(data.length > 0) {
                res.status(200).send({status: true, data: data});
            } else {
                res.status(404).send({status: false, message: 'No data exists.'});
            }   
        } catch (error) {
            next(error);
        }
    },
}

module.exports = paymentController;