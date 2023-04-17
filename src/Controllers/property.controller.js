const Property = require('../Models/Property.model');

const controller = {
    add: async(req, res, next)=> {
        try {
            const propertyObj = new Property(req.body.property);
            const response = await Property.Add(propertyObj, req.body.propertyUnit);
            if(response) {
                res.status(200).send({status: true,message: 'Property added successfully.'});
            } else {
                res.status(200).send({status: false,message: 'Something went wrong.'});
            }
        } catch (error) {
            next(error);
        }
    },
    get: async(req, res, next)=> {
        try {
            const id = req.params.id;
            const response = await Property.get(id);
            if(response) {
                res.status(200).send({status: true,data: response});
            } else {
                res.status(200).send({status: false,message: 'Something went wrong.'});
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = controller;