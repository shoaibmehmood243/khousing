const User = require('../Models/User.model');
const { comparePassword } = require('../Utilities/bcrypt');
const { signAccessToken, signRefreshToken } = require('../Utilities/jwtUtil');

const controller = {
    register: async(req, res, next)=> {
        try {
            const emailRes = await User.getByEmail(req.body.email);
            if(emailRes.length > 0) {
                res.status(200).send({status: false,message:'User with this email is already registered. Try using other email.'});
            } else {
                const userObj = req.body;
                const response = await User.Register(userObj);
                if(response) {
                    res.status(200).send({status: true,response});
                }
            }
        } catch (error) {
            next(error);
        }
    },
    customerRegister: async(req, res, next)=> {
        try {
            const emailRes = await User.getByEmail(req.body.email);
            if(emailRes.length > 0) {
                res.status(200).send({status: false,message:'User with this email is already registered. Try using other email.'});
            } else {
                const response = await User.CustomerRegister(req.body);
                if(response) {
                    res.status(200).send({status: true,response});
                }
            }
        } catch (error) {
            next(error);
        }
    },
    login: async(req, res, next)=> {
        try {
            const emailRes = await User.getByEmail(req.body.email);
            if(emailRes.length === 0) {
                res.status(200).send({status: false,message: 'User with this email is not registered. Please register with us.'})
            } else {
                await comparePassword(req.body.password,emailRes[0].password, async(err, passwordRes)=> {
                    if(err) {
                        res.status(200).send({status: false,message: 'Invalid email/password. Please try again.'})
                    } else {
                        const accessToken = await signAccessToken(emailRes[0].id);
                        const refreshToken = await signRefreshToken(emailRes[0].id);
                        res.cookie('accessToken', `bearer ${accessToken}`,{
                            httpOnly: false,
                            maxAge: 24 * 60 * 60 * 1000,
                            path: '/'
                        });
                        const {password, ...user} = emailRes[0];
                        res.status(200).send({data: user,refreshToken,accessToken,status: true,message: 'User logged in successfully.'})
                    }
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = controller;
