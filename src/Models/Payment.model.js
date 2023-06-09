const db = require('./../Utilities/dbConfig');

class Payment {
    lease_id;
    monthly_rent_amount;
    amount_received;
    current_balance;
    monthly_due_day;
    recurring_rent_start;
    prorated_rent_amount;
    prorated_rent_amount_submitted;
    prorated_rent_due;
    late_fee_amount;
    late_fee_date;
    security_deposit_amount;
    security_deposit_amount_submitted;
    security_deposit_due;
    payment_method_id;
    checking_account;
    first_name;
    last_name;
    security_deposit_account_number;
    security_deposit_account;
    is_active;
    created_at;
    updated_at;

    constructor(obj) {
        this.lease_id = obj.lease_id,
            this.monthly_rent_amount = obj.monthly_rent_amount,
            this.amount_received = obj.amount_received || '0',
            this.current_balance = Number(obj.monthly_rent_amount) + Number(obj.prorated_rent_amount) + Number(obj.security_deposit_amount),
            this.monthly_due_day = obj.monthly_due_day,
            this.recurring_rent_start = obj.recurring_rent_start,
            this.prorated_rent_amount = obj.prorated_rent_amount,
            this.prorated_rent_amount_submitted = obj.prorated_rent_amount_submitted || 0,
            this.prorated_rent_due = obj.prorated_rent_due,
            this.late_fee_amount = obj.late_fee_amount,
            this.late_fee_date = obj.late_fee_date,
            this.security_deposit_amount = obj.security_deposit_amount,
            this.security_deposit_amount_submitted = obj.security_deposit_amount_submitted || 0,
            this.security_deposit_due = obj.security_deposit_due,
            this.payment_method_id = obj.payment_method_id,
            this.checking_account = obj.checking_account,
            this.first_name = obj.first_name,
            this.last_name = obj.last_name,
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
            const query = `SELECT leases.id as lease_id, property.address as address, leases.lease_start_date, leases.lease_end_date, 
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

Payment.getById = async (id, paymentId, search) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT leases.id AS lease_id, 
            property.address AS address, 
            leases.lease_end_date, 
            leases.lease_start_date AS created_at,
            GROUP_CONCAT(CONCAT(residents.first_name, ' ', residents.middle_name, ' ', residents.last_name) SEPARATOR ', ') AS residents, 
            payments.id, 
            payments.current_balance, 
            payments.monthly_rent_amount,
            payments.monthly_due_day, 
            payments.late_fee_amount, 
            payments.prorated_rent_amount,
            DATE_FORMAT(payments.prorated_rent_due, '%M %e, %Y') AS prorated_rent_due,
            payments.security_deposit_amount,
            CASE
                WHEN leases.lease_end_date < CURDATE() THEN 
                    CASE
                        WHEN DATEDIFF(CURDATE(), leases.lease_end_date) > payments.late_fee_date THEN 
                            payments.current_balance + payments.late_fee_amount
                        ELSE
                            payments.current_balance
                    END
                ELSE payments.current_balance
            END AS total_payment
            FROM leases
            JOIN property ON property.id = leases.property_id
            JOIN residents ON residents.lease_id = leases.id
            JOIN payments ON payments.lease_id = leases.id
            WHERE payments.id = ${paymentId} && leases.is_active = 1
            ${search.length > 0 ? `&& CONCAT_WS('-', property.address,residents.first_name,residents.last_name,residents.email, residents.number) LIKE 
            '%${search}%'` : ''}
            GROUP BY leases.id;
            `;
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
    return new Promise((resolve, reject) => {
        try {
            db.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    conn.beginTransaction(async (err) => {
                        if (err) {
                            conn.rollback(() => {
                                conn.release();
                                reject(err);
                            })
                        } else {
                            const transactionObj = new Transactions(transaction);
                            let query = `INSERT INTO transactions SET ?`
                            conn.query(query, transactionObj, async (err, transactionResult) => {
                                if (err) {
                                    conn.rollback(() => {
                                        conn.release();
                                        reject(err);
                                    })
                                } else {
                                    query = `UPDATE payments SET amount_received = ${transaction.amount}, current_balance = current_balance - ${transaction.amount} WHERE id = ${transaction.payment_id}`;
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

Payment.getUpcomingTransactions = async (id, leaseId) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT charge, date, details, balance, payment
            FROM (
                SELECT monthly_rent_amount AS charge,
                DATE_FORMAT(DATE_ADD(DATE_ADD(DATE_FORMAT(CURRENT_DATE, '%Y-%m-01'), INTERVAL 1 MONTH), INTERVAL monthly_due_day - 1 DAY), '%M %e, %Y') AS date,
                'Monthly' AS details,
                       CASE
                           WHEN DATE_ADD(DATE_FORMAT(CURRENT_DATE, '%Y-%m-01'), INTERVAL 1 MONTH) - INTERVAL 1 DAY < CURDATE() THEN current_balance
                           ELSE 0
                       END AS balance,
                       amount_received AS payment
                FROM payments
                WHERE id = ${id} AND lease_id = ${leaseId}
                    AND DATE_FORMAT(DATE_ADD(DATE_FORMAT(CURRENT_DATE, '%Y-%m-01'), INTERVAL 1 MONTH) - INTERVAL 1 DAY, '%Y-%m-%d') BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
                    
                UNION ALL
                    
                SELECT prorated_rent_amount AS charge,
                       DATE_FORMAT(prorated_rent_due, '%M %e, %Y') AS date,
                       'Prorated rent' AS details,
                       CASE
                           WHEN prorated_rent_due < CURDATE() THEN current_balance
                           ELSE 0
                       END AS balance,
                       prorated_rent_amount_submitted AS payment
                FROM payments
                WHERE id = ${id} AND lease_id = ${leaseId}
                    AND prorated_rent_due BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
                    
                UNION ALL
                    
                SELECT security_deposit_amount AS charge,
                       DATE_FORMAT(security_deposit_due, '%M %e, %Y') AS date,
                       'Security Deposit' AS details,
                       CASE
                           WHEN security_deposit_due < CURDATE() THEN current_balance
                           ELSE 0
                       END AS balance,
                       security_deposit_amount_submitted AS payment
                FROM payments
                WHERE id = ${id} AND lease_id = ${leaseId}
                    AND security_deposit_due BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
                    
                UNION ALL
                
                SELECT b.amount AS charge,
                       DATE_FORMAT(b.due_date, '%M %e, %Y') AS date,
                       b.memo AS details,
                       CASE
                           WHEN b.due_date < CURDATE() THEN p.current_balance
                           ELSE 0
                       END AS balance,
                       0 AS payment
                FROM payments p
                JOIN bills b ON p.id = b.payment_id
                WHERE p.id = ${id} AND p.lease_id = ${leaseId}
                AND b.due_date >= CURDATE()
                    AND b.due_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                ) AS result
            ORDER BY STR_TO_DATE(date, '%M %e, %Y') ASC;            
            
            `;
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

Payment.getTransactions = async (id, leaseId) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT charge, date, details, balance, payment
            FROM (
                SELECT monthly_rent_amount AS charge,
                DATE_FORMAT(DATE_ADD(DATE_ADD(DATE_FORMAT(CURRENT_DATE, '%Y-%m-01'), INTERVAL 1 MONTH), INTERVAL monthly_due_day - 1 DAY), '%M %e, %Y') AS date,                       'Monthly Rent' AS details,
                       CASE
                           WHEN DATE_ADD(DATE_FORMAT(CURRENT_DATE, '%Y-%m-01'), INTERVAL 1 MONTH) - INTERVAL 1 DAY < CURDATE() THEN current_balance
                           ELSE 0
                       END AS balance,
                       amount_received AS payment
                FROM payments
                WHERE id = ${id} AND lease_id = ${leaseId}
                    AND DATE_FORMAT(DATE_ADD(DATE_FORMAT(CURRENT_DATE, '%Y-%m-01'), INTERVAL 1 MONTH) - INTERVAL 1 DAY, '%Y-%m-%d') < CURDATE()
                    AND DATE_FORMAT(DATE_ADD(DATE_FORMAT(CURRENT_DATE, '%Y-%m-01'), INTERVAL 1 MONTH) - INTERVAL 1 DAY, '%Y-%m-%d') >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                    
                UNION ALL
                    
                SELECT prorated_rent_amount AS charge,
                       DATE_FORMAT(prorated_rent_due, '%M %e, %Y') AS date,
                       'Prorated rent' AS details,
                       CASE
                           WHEN prorated_rent_due < CURDATE() THEN current_balance
                           ELSE 0
                       END AS balance,
                       prorated_rent_amount_submitted AS payment
                FROM payments
                WHERE id = ${id} AND lease_id = ${leaseId}
                    AND prorated_rent_due < CURDATE()
                    AND prorated_rent_due >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                    
                UNION ALL
                    
                SELECT security_deposit_amount AS charge,
                       DATE_FORMAT(security_deposit_due, '%M %e, %Y') AS date,
                       'Security Deposit' AS details,
                       CASE
                           WHEN security_deposit_due < CURDATE() THEN current_balance
                           ELSE 0
                       END AS balance,
                       security_deposit_amount_submitted AS payment
                FROM payments
                WHERE id = ${id} AND lease_id = ${leaseId}
                    AND security_deposit_due < CURDATE()
                    AND security_deposit_due >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                    
                UNION ALL
                
                SELECT b.amount AS charge,
                       DATE_FORMAT(b.due_date, '%M %e, %Y') AS date,
                       b.memo AS details,
                       p.current_balance AS balance,
                       0 AS payment
                FROM payments p
                JOIN bills b ON p.id = b.payment_id
                WHERE p.id = ${id} AND p.lease_id = ${leaseId}
                    AND b.due_date < CURDATE()
                    AND b.due_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            ) AS result
            ORDER BY STR_TO_DATE(date, '%M %e, %Y') DESC;
            `;
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

Payment.getPaymentById = async (id) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT payment_methods.id,  payment_methods.funding_source FROM payments
            JOIN payment_methods
            ON payments.payment_method_id = payment_methods.id
            WHERE payments.id = ${id}`;
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

Payment.getPayment = async (id) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT * FROM payments WHERE id = ${id}`;
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

module.exports = { Payment, Transactions };