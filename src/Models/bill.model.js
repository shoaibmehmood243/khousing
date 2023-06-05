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
            db.getConnection((err, conn)=> {
                if(err) {
                    reject(err);
                } else {
                    conn.beginTransaction((err)=> {
                        if (err) {
                            conn.rollback(() => {
                                conn.release();
                                reject(err);
                            })
                        } else {
                            let query = `INSERT INTO bills SET ?`;
                            conn.query(query, data, async (err, transactionResult) => {
                                if (err) {
                                    conn.rollback(() => {
                                        conn.release();
                                        reject(err);
                                    })
                                } else {
                                    query = `UPDATE payments SET current_balance = current_balance + ${data.amount} WHERE id = ${data.payment_id}`;
                                    conn.query(query, async (err, paymentResult) => {
                                        if (err) {
                                            conn.rollback(() => {
                                                conn.release();
                                                reject(err);
                                            })
                                        } else {
                                            conn.commit((err) => {
                                                if (err) {
                                                    conn.rollback(() => {
                                                        conn.release();
                                                        reject(err);
                                                    })
                                                } else {
                                                    conn.release();
                                                    resolve(paymentResult);
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = Bill;