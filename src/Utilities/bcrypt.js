const bcrypt = require('bcrypt');

const comparePassword = async (provided, current, cb) => {
    try {
      const result = await bcrypt.compare(provided, current);
      if (!result) {
        throw "Invalid email/password";
      }
      cb(undefined, result);
    } catch (err) {
      cb(err, undefined)
    }
};

module.exports = {comparePassword};