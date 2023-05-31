const db = require('./../Utilities/dbConfig');

class PaymentMethods {
    user_id;
    type;
    funding_source;
    card_name;
    card_number;
    routing_number;
    expiry_date;
    cvc;
    billing_address;
    apartment;
    city;
    state;
    zip;
    is_active;
    created_at;
    updated_at;

    constructor(obj) {
        this.user_id = obj.user_id,
        this.type = obj.type,
        this.funding_source = obj.funding_source,
        this.card_name = obj.card_name,
        this.card_number = obj.card_number,
        this.routing_number = obj.routing_number,
        this.expiry_date = obj.expiry_date,
        this.cvc = obj.cvc,
        this.billing_address = obj.billing_address,
        this.apartment = obj.apartment,
        this.city = obj.city,
        this.zip = obj.zip,
        this.state = obj.state,
        this.is_active = obj.is_active || 1,
        this.created_at = obj.created_at || new Date().toISOString(),
        this.updated_at = obj.updated_at || null
    }
}

PaymentMethods.add = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `INSERT INTO payment_methods SET ?`;
            db.query(query, data, (err, sqlresult) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(sqlresult)
                }
            })
        } catch (error) {
            reject(error);
        }
    })
}

PaymentMethods.get = async (id) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT * FROM payment_methods WHERE user_id = ${id}`;
            db.query(query, (err, sqlresult) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(sqlresult)
                }
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = PaymentMethods;