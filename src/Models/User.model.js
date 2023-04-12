const db = require("../Utilities/dbConfig");
const bcrypt = require('bcrypt')

class User {
    first_name;
    last_name;
    email;
    password;
    phone_number;
    is_admin;
    is_customer;
    is_active;
    created_at;
    updated_at;

    constructor(obj) {
        this.first_name = obj.first_name,        
        this.last_name = obj.last_name,        
        this.email = obj.email,
        this.password = obj.password,
        this.phone_number = obj.phone_number,     
        this.is_admin = obj.is_admin || 0,  
        this.is_customer = obj.is_customer || 0,     
        this.is_active = obj.is_active || 1,      
        this.created_at = new Date().toISOString(),  
        this.updated_at = obj.updated_at || null
    }
}

User.getByEmail = (email)=> {
    return new Promise((resolve, reject)=> {
        try {
            const query = `SELECT * FROM users WHERE email = '${email}'`;
            db.query(query, (err, sqlresult)=> {
                if(err) {
                    reject(err);
                } else {
                    resolve(sqlresult);
                }
            })
        } catch (error) {
            reject(error);
        }
    })
}

User.Register = async(data)=> {
    return new Promise(async(resolve, reject)=> {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt);
            data.password = hashedPassword
            const query = `INSERT INTO users SET ?`;
            db.query(query, data, (err, sqlresult)=> {
                if(err) {
                    reject(err);
                } else {
                    resolve(sqlresult);
                }
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = User;