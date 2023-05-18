const Lease = require('../Models/lease.model');

function addMonths(date, monthsToAdd) {
    const dateProvide = date.split('T')[0];
    const dated = new Date(dateProvide)
    const newDate = new Date(dated.getTime());
    newDate.setMonth(newDate.getMonth() + Number(monthsToAdd));
    return newDate;
}

const leaseController = {
    add: async (req, res, next) => {
        try {
            let lease_end_date;
            if (req.body.lease.lease_length) {
                lease_end_date = addMonths(req.body.lease.lease_start_date, req.body.lease.lease_length.split(' ')[0])
            } else {
                lease_end_date = addMonths(req.body.lease.lease_start_date, 1);
            }
            const leaseObj = {...req.body.lease, lease_end_date: lease_end_date.toISOString()}
            const newLeaseObj = new Lease(leaseObj);
            const data = await Lease.add(newLeaseObj, req.body.residents);
            res.status(200).send({status: true, message: 'Resident setup successfully.'});
        } catch (error) {
            next(error);
        }
    },
    get: async (req, res, next) => {
        try {
            const id = req.params.id;
            const search = req.body.search;
            const tab = req.body.tab;
            const data = await Lease.get(id, tab, search);
            if (data.length > 0) {
                res.status(200).send({ status: true, data: data });
            } else {
                res.status(404).send({ status: false, message: 'No data exists.' });
            }
        } catch (error) {
            next(error);
        }
    },
    getLeaseDetail: async (req, res, next) => {
        try {
            const id = req.params.id;
            const data = await Lease.getLeaseDetail(id);
            if (data.length > 0) {
                res.status(200).send({ status: true, data: data });
            } else {
                res.status(404).send({ status: false, message: 'No data exists.' });
            }
        } catch (error) {
            next(error);
        }
    },
    getResidents: async (req, res, next) => {
        try {
            const id = req.params.id;
            const data = await Lease.getResidents(id);
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

module.exports = leaseController;