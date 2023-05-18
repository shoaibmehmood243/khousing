const {Payment, Transactions} = require('../Models/Payment.model');

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
    getByPaymentId: async(req, res, next)=> {
        try {
            const id = req.params.id;
            const search = req.body.search;
            const paymentId = req.body.paymentId;
            const data = await Payment.getById(id, paymentId, search);
            if(data.length > 0) {
                res.status(200).send({status: true, data: data});
            } else {
                res.status(200).send({status: false, message: 'No data exists.'});
            }   
        } catch (error) {
            next(error);
        }
    },
    getTransactions: async(req, res, next)=> {
        try {
            const id = req.params.id;
            const leaseId = req.body.leaseId;
            const data = await Payment.getTransactions(id, leaseId);
            if(data.length > 0) {
                res.status(200).send({status: true, data: data});
            } else {
                res.status(404).send({status: false, message: 'No data exists.'});
            }   
        } catch (error) {
            next(error);
        }
    },
    recordPayment: async(req, res, next)=> {
        try {
            const transactionObj = new Transactions(req.body);
            const response = await Payment.RecordPayment(transactionObj);
            if(response) {
                res.status(200).send({status: true,message: 'Transaction logged successfully.'});
            } else {
                res.status(200).send({status: false,message: 'Something went wrong.'});
            }
        } catch (error) {
            next(error);
        }
    },
}

module.exports = paymentController;