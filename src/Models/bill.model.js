const db = require('./../Utilities/dbConfig');

class Bill {
    payment_id;
    amount;
    due_date;
    memo;
    is_active;
    created_at;
    updated_at;

    constructor(obj) {
        this.payment_id = obj.payment_id,
        this.amount = obj.amount,
        this.due_date = obj.due_date,
        this.memo = obj.memo,
        this.is_active = obj.is_active || 1,
        this.created_at = obj.created_at || new Date().toISOString(),
        this.updated_at = obj.updated_at || null
    }
}

Bill.add = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `INSERT INTO bills SET ?`;
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

module.exports = Bill;