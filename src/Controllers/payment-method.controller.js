const PaymentMethods = require('../Models/payment-method.model');

const paymentMethodController = {
    add: async(req, res, next)=> {
        try {
            const paymentMethodObj = new PaymentMethods(req.body);
            const data = await PaymentMethods.add(paymentMethodObj);
            res.status(200).send({status: true, data: data});
        } catch (error) {
            next(error);
        }
    },
    get: async (req, res, next) => {
        try {
            const id = req.params.id;
            const data = await PaymentMethods.get(id);
            if (data.length > 0) {
                res.status(200).send({ status: true, data: data });
            } else {
                res.status(404).send({ status: false, message: 'No data exists.' });
            }
        } catch (error) {
            next(error);
        }
    },
}

module.exports = paymentMethodController;