const User = require('../Models/User.model');
const jwt = require('jsonwebtoken')

const userController = {
    getUserById: async(req, res, next)=> {
        try {
            const {aud} = jwt.decode(req.headers.authorization)
            const id = Number(aud);
            if(!id) {
                res.status(400).send({status: false, message: 'Please provide a valid id.'});
            } else {
                const data = await User.getUserById(id);
                if(data.length > 0){
                    res.status(200).send({status: true, data:data[0]});
                } else {
                    res.status(404).send({status: false, message: 'No data exists.'});
                }
            }
        } catch (error) {
            next(error);
        }
    },
    getPermissions: async(req, res, next)=> {
        try {
            const id = req.params.id;
            if(!id) {
                res.status(400).send({status: false, message: 'Please provide a valid id.'});
            } else {
                const data = await User.getPermissions(id);
                if(data.length > 0){
                    res.status(200).send({status: true, data:data[0]});
                } else {
                    res.status(404).send({status: false, message: 'No data exists.'});
                }
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = userController;