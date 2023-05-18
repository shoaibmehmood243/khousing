const db = require('./../Utilities/dbConfig');

class Payment {
    lease_id;
    monthly_rent_amount;
    amount_received;
    current_balance;
    monthly_due_day;
    recurring_rent_start;
    prorated_rent_amount;
    prorated_rent_due;
    late_fee_amount;
    late_fee_date;
    security_deposit_amount;
    security_deposit_due;
    checking_account;
    security_deposit_account_number;
    security_deposit_account;
    is_active;
    created_at;
    updated_at;

    constructor(obj) {
        this.lease_id = obj.lease_id,
        this.monthly_rent_amount = obj.monthly_rent_amount,
        this.amount_received = obj.amount_received || '0',
        this.current_balance = obj.current_balance,
        this.monthly_due_day = obj.monthly_due_day,
        this.recurring_rent_start = obj.recurring_rent_start,
        this.prorated_rent_amount = obj.prorated_rent_amount,
        this.prorated_rent_due = obj.prorated_rent_due,
        this.late_fee_amount = obj.late_fee_amount,
        this.late_fee_date = obj.late_fee_date,
        this.security_deposit_amount = obj.security_deposit_amount,
        this.security_deposit_due = obj.security_deposit_due,
        this.checking_account = obj.checking_account,
        this.security_deposit_account_number = obj.security_deposit_account_number,
        this.security_deposit_account = obj.security_deposit_account,
        this.is_active = obj.is_active || 1,
        this.created_at = obj.created_at || new Date().toISOString(),
        this.updated_at = obj.updated_at || null
    }
}

class Transactions {
    payment_id;
    payees;
    amount;
    created_at;
    updated_at;

    constructor(obj) {
        this.payment_id = obj.payment_id,
        this.payees = obj.payees,
        this.amount = obj.amount,
        this.created_at = obj.created_at || new Date().toISOString(),
        this.updated_at = obj.updated_at || null
    }
}

Payment.get = async (id, search) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT leases.id as lease_id, property.address as address, leases.lease_end_date, 
            leases.lease_start_date as created_at,
            GROUP_CONCAT(CONCAT(residents.first_name, ' ', residents.middle_name, ' ', residents.last_name)
                         SEPARATOR ', ') as residents,
            payments.id, payments.current_balance, payments.monthly_rent_amount,
            payments.amount_received, payments.monthly_due_day,
            IFNULL(transactions.id, '') as transaction_id, IFNULL(transactions.created_at, '') as transaction_created_at,
            IFNULL(transactions.amount, '') as transaction_amount, IFNULL(transactions.payees, '') as payees
            FROM leases
            JOIN property ON property.id = leases.property_id
            JOIN residents ON residents.lease_id = leases.id
            JOIN payments ON payments.lease_id = leases.id
            LEFT JOIN transactions ON transactions.payment_id = payments.id
            WHERE property.company_id = ${id} && leases.is_active = 1
            ${search.length > 0 ? `&& CONCAT_WS('-', property.address,residents.first_name,residents.last_name,residents.email, residents.number) LIKE 
                        '%${search}%'` : ''}
            AND (
            transactions.created_at = (
                SELECT MAX(created_at)
                FROM transactions
                WHERE transactions.payment_id = payments.id
            )
            OR transactions.id IS NULL
            )
            GROUP BY leases.id, payments.id`;
            db.query(query, (err, sqlresult) => {
                if (err) {
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

Payment.getById = async (id, propertyId, search) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT leases.id as lease_id, property.address as address, leases.lease_end_date, 
                leases.lease_start_date as created_at,
                GROUP_CONCAT(CONCAT(residents.first_name, ' ', residents.middle_name, ' ', residents.last_name) 	
                SEPARATOR ', ') as residents, payments.id, payments.current_balance, payments.monthly_rent_amount, 
                payments.monthly_due_day, payments.late_fee_amount, payments.prorated_rent_amount, payments.security_deposit_amount
                FROM leases
                JOIN property ON property.id = leases.property_id
                JOIN residents ON residents.lease_id = leases.id
                JOIN payments ON payments.lease_id = leases.id
                WHERE property.company_id = ${id} && payments.id = ${propertyId} && leases.is_active = 1
                ${search.length > 0 ? `&& CONCAT_WS('-', property.address,residents.first_name,residents.last_name,residents.email, residents.number) LIKE 
                '%${search}%'` : ''}
                GROUP BY leases.id`;
            db.query(query, (err, sqlresult) => {
                if (err) {
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

Payment.add = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `INSERT INTO payments SET ?`;
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

Payment.RecordPayment = async (transaction) => {
    return new Promise((resolve, reject)=> {
        try {
            db.getConnection((err, conn)=> {
                if(err) {
                    reject(err);
                } else {
                    conn.beginTransaction(async(err)=> {
                        if(err) {
                            conn.rollback(()=> {
                                conn.release();
                                reject(err);
                            })
                        } else {
                            const transactionObj = new Transactions(transaction);
                            let query = `INSERT INTO transactions SET ?`
                            conn.query(query, transactionObj, async(err, transactionResult)=> {
                                if(err){
                                    conn.rollback(()=> {
                                        conn.release();
                                        reject(err);
                                    })
                                } else {
                                    query = `UPDATE payments SET amount_received = ${transaction.amount}, current_balance = current_balance - ${transaction.amount} WHERE id = ${transaction.payment_id}`;
                                    conn.query(query, async(err, paymentResult)=> {
                                        if(err) {
                                            conn.rollback(()=> {
                                                conn.release();
                                                reject(err);
                                            })
                                        } else {
                                            conn.commit((err)=> {
                                                if(err) {
                                                    conn.rollback(()=> {
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

module.exports = {Payment, Transactions};