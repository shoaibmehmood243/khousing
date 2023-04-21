const Lease = require('../Models/lease.model');

const leaseController = {
    add: async(req, res, next)=> {
        try {
            const leaseObj = new Lease(req.body.lease);
            const data = await Lease.add(leaseObj, req.body.residents);
            res.status(200).send({status: true, message: 'Resident setup successfully.'});
        } catch (error) {
            next(error);
        }
    },
    get: async(req, res, next)=> {
        try {
            const id = req.params.id;
            const search = req.body.search;
            const data = await Lease.get(id, search);
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

module.exports = leaseController;