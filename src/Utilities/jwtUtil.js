const JWT = require('jsonwebtoken');

const signAccessToken = (userId)=> {
    return new Promise((resolve, reject)=> {
        const payload = {};
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: '1h',
            issuer: "rentalManagement.com",
            audience: userId.toString(),
        };

        JWT.sign(payload, secret, options, (err, token) => {
            debugger;
        if (err) {
            console.log(err);
            return reject(new Error("Internal Server Error"));
        }

        resolve(token);
        });
    })
}

const signRefreshToken = (userID) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1h",
        issuer: "rentalmanagement.com",
        audience: userID.toString(),
      };
  
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          return reject(new Error("Internal Server Error"));
        }
  
        resolve(token);
      });
    });
};

module.exports = {
    signAccessToken,
    signRefreshToken
}