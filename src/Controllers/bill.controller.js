const Bill = require('../Models/bill.model');

const billController = {
    add: async(req, res, next)=> {
        try {
            const billObj = new Bill(req.body);
            const data = await Bill.add(billObj);
            res.status(200).send({status: true, data: data});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = billController;