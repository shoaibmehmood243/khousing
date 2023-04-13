const db = require("../Utilities/dbConfig");

class Property {
    user_id;
    property_type;
    address;
    reviews;
    bedrooms;
    bathrooms;
    sq_feet;
    created_at;
    updated_at;
    is_active;

    constructor(obj) {
        this.user_id = obj.user_id || 2,
        this.property_type = obj.property_type,
        this.address = obj.address,
        this.reviews = obj.reviews,
        this.bedrooms = obj.bedrooms,
        this.bathrooms = obj.bathrooms,
        this.sq_feet = obj.sq_feet,
        this.created_at = obj.created_at || new Date().toISOString(),
        this.updated_at = obj.updated_at || null,
        this.is_active = obj.is_active || 1
    }
}

Property.Add = (data)=> {
    return new Promise((resolve, reject)=> {
        try {
            const query = `INSERT INTO property SET ?`;
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

Property.get = ()=> {
    return new Promise((resolve, reject)=> {
        try {
            const query = `SELECT * FROM property`;
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

module.exports = Property;