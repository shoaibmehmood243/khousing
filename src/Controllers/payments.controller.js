const {Payment, Transactions} = require('../Models/Payment.model');
const dwolla = require('./../Utilities/dwollaClient');

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
    getPayment: async(req, res, next)=> {
        try {
            const id = req.params.id;
            const data = await Payment.getPayment(id);
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
                res.status(200).send({status: false, message: 'No data exists.'});
            }   
        } catch (error) {
            next(error);
        }
    },
    getUpcomingTransactions: async(req, res, next)=> {
        try {
            const id = req.params.id;
            const leaseId = req.body.leaseId;
            const data = await Payment.getUpcomingTransactions(id, leaseId);
            if(data.length > 0) {
                res.status(200).send({status: true, data: data});
            } else {
                res.status(200).send({status: false, message: 'No data exists.'});
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
    checkout: async(req, res, next)=> {
        try {
            const transactionData = {
                amount: req.body.amount,
                payment_id: req.body.payment_id
            }
            const paymentData = await Payment.getPaymentById(transactionData.payment_id);
            var requestBody = {
                _links: {
                  source: {
                    href: req.body.funding_source,
                  },
                  destination: {
                    href: paymentData[0].funding_source,
                  },
                },
                amount: {
                  currency: "USD",
                  value: transactionData.amount,
                },
            }
            // dwolla.post('transfers', requestBody)
            //     .then(async(dRes)=> {
            //         console.log(dRes);
            //         const transactionObj = new Transactions(transactionData);
            //         const response = await Payment.RecordPayment(transactionObj);
            //         if(response) {
            //             res.status(200).send({status: true,message: 'Transaction logged successfully.'});
            //         } else {
            //             res.status(200).send({status: false,message: 'Something went wrong.'});
            //         }
            //     })
            //     .catch((err)=> {
            //         console.log(err);
            //         next(err);
            //     })
            const transactionObj = new Transactions(transactionData);
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