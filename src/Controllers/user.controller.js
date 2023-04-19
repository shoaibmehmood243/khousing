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
    getUserByCompanyId: async(req, res, next)=> {
        try {
            const id = req.params.id;
            if(!id) {
                res.status(400).send({status: false, message: 'Please provide a valid id.'});
            } else {
                const data = await User.getUserByCompanyId(id);
                if(data.length > 0){
                    res.status(200).send({status: true, data:data});
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
    },
    add: async(req, res, next)=> {
        try {
            const emailRes = await User.getByEmail(req.body.user.email);
            if(emailRes.length > 0) {
                res.status(200).send({status: false,message:'User with this email is already registered. Try using other email.'});
            } else {
                const userObj = new User(req.body.user);
                const data = await User.add(userObj, req.body.permissions);
                res.status(200).send({status: true, data: data});
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = userController;