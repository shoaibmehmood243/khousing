const db = require("../Utilities/dbConfig");
const PropertyUnit = require('./PropertyUnit.model')

class Property {
    user_id;
    portfolio_id;
    company_id;
    property_type;
    address;
    latitude;
    longitude;
    reviews;
    sq_feet;
    created_at;
    updated_at;
    is_active;

    constructor(obj) {
        this.user_id = obj.user_id || 2,
            this.portfolio_id = obj.portfolio_id,
            this.company_id = obj.company_id,
            this.property_type = obj.property_type,
            this.address = obj.address,
            this.latitude = obj.latitude,
            this.longitude = obj.longitude,
            this.reviews = obj.reviews,
            this.sq_feet = obj.sq_feet,
            this.created_at = obj.created_at || new Date().toISOString(),
            this.updated_at = obj.updated_at || null,
            this.is_active = obj.is_active || 1
    }
}

Property.Add = (property, propertyUnit) => {
    return new Promise((resolve, reject) => {
        try {
            db.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    conn.beginTransaction((err) => {
                        if (err) {
                            conn.rollback(() => {
                                conn.release();
                                reject(err);
                            })
                        } else {
                            let query = `INSERT INTO property SET ?`;
                            conn.query(query, property, (err, sqlresult) => {
                                if (err) {
                                    conn.rollback(() => {
                                        conn.release();
                                        reject(err);
                                    });
                                } else {
                                    const temp1 = propertyUnit.map((units) => {
                                        return new Promise(async (res, req) => {
                                            let query2 = `INSERT INTO property_units SET ?`;
                                            const propertyUnitTemp = { ...(await units), property_id: sqlresult.insertId };
                                            const propertyUnitObj = new PropertyUnit(propertyUnitTemp);
                                            conn.query(query2, propertyUnitObj, (err, sqlresult2) => {
                                                if (err) {
                                                    conn.rollback(() => {
                                                        conn.release();
                                                        reject(err);
                                                        res(false)
                                                    });
                                                } else {
                                                    res(true);
                                                    Promise.all(temp1)
                                                        .then((promiseReturn) => {
                                                            if (promiseReturn.indexOf(false) == -1) {
                                                                conn.commit((err) => {
                                                                    if (err) {
                                                                        conn.rollback(() => {
                                                                            conn.release();
                                                                            reject(err);
                                                                        });
                                                                    } else {
                                                                        conn.release();
                                                                        resolve({
                                                                            data: sqlresult.insertId,
                                                                        });
                                                                    }
                                                                });
                                                            } else {
                                                                conn.rollback(() => {
                                                                    conn.release();
                                                                    reject(new Error("Error in commit"));
                                                                });
                                                            }
                                                        })
                                                        .catch(() => {
                                                            conn.rollback(() => {
                                                                conn.release();
                                                                reject(new Error("Error in promise"));
                                                            });
                                                        });
                                                }
                                            })
                                        })
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

Property.get = (id, search) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT id, address, latitude, longitude, property_type FROM property
            WHERE company_id = ${id} ${search.length > 0 ? `&& address LIKE '%${search}%'` : ''}`;
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

Property.delete = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `DELETE FROM property WHERE id = ${id}`;
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

Property.getPropertyByLease = (id, search) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT p.id, p.address, p.latitude, p.longitude, p.property_type 
            FROM property AS p
            LEFT JOIN leases AS l ON p.id = l.property_id
            WHERE p.company_id = ${id} ${search.length > 0 ? `AND p.address LIKE '%182%'` : ''}
            AND l.property_id IS NULL
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

Property.getCustomerPayments = async (email) => {
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
            LEFT JOIN payments ON payments.lease_id = leases.id
            LEFT JOIN transactions ON transactions.payment_id = payments.id
            WHERE residents.email = '${email}' && leases.is_active = 1
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

Property.getCustomerPaymentsById = async (id) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT
            payments.id,
            payments.current_balance,
            CASE
              WHEN payments.monthly_due_day >= DAY(CURRENT_DATE()) THEN payments.monthly_rent_amount
              WHEN payments.monthly_due_day + payments.late_fee_date >= DAY(CURRENT_DATE()) THEN payments.monthly_rent_amount
              ELSE payments.monthly_rent_amount + payments.late_fee_amount
            END AS total_amount_due,
            payments.amount_received,
            payments.monthly_due_day,
            payments.late_fee_amount,
            DATE_FORMAT(DATE_FORMAT(CURRENT_DATE(), '%Y-%m') + INTERVAL (payments.monthly_due_day - 1) DAY, '%Y-%m-%d') AS due_date,
            payment_methods.id AS payment_method_id,
            payment_methods.card_number,
            payment_methods.routing_number
          FROM
            payments
          JOIN
            payment_methods ON payments.payment_method_id = payment_methods.id
          WHERE
            payments.id = ${id}
          GROUP BY
            payments.id
          
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

module.exports = Property;