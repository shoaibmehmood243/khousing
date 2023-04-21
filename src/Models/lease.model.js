const db = require('../Utilities/dbConfig');

class Lease {
    property_id;
    lease_term;
    lease_start_date;
    lease_length;
    is_active;
    created_at;
    updated_at;

    constructor(obj) {
        this.property_id = obj.property_id,
            this.lease_term = obj.lease_term,
            this.lease_start_date = obj.lease_start_date,
            this.lease_length = obj.lease_length,
            this.is_active = obj.is_active || 1,
            this.created_at = obj.created_at || new Date().toISOString(),
            this.updated_at = obj.updated_at || null
    }
}

class Residents {
    lease_id;
    first_name;
    middle_name;
    last_name;
    email;
    number;
    is_active;
    created_at;
    updated_at;

    constructor(obj) {
        this.lease_id = obj.lease_id,
            this.first_name = obj.first_name,
            this.middle_name = obj.middle_name,
            this.last_name = obj.last_name,
            this.email = obj.email,
            this.number = obj.number,
            this.is_active = obj.is_active || 1,
            this.created_at = obj.created_at || new Date().toISOString(),
            this.updated_at = obj.updated_at || null
    }
}

Lease.get = async (id, search) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT leases.id as lease_id, property.address as address, leases.lease_start_date as created_at,
            GROUP_CONCAT(CONCAT(residents.first_name, ' ', residents.middle_name, ' ', residents.last_name) SEPARATOR ', ') as residents
            FROM leases
            JOIN property ON property.id = leases.property_id
            JOIN residents ON residents.lease_id = leases.id
            WHERE property.company_id = ${id} && leases.is_active = 1
            ${search.length > 0 ? `&& CONCAT_WS('-', property.address,residents.first_name,residents.last_name,residents.email, residents.number) LIKE 
            '%${search}%'` : ''}
            GROUP BY leases.id
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

Lease.add = async (leases, residents) => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, conn) => {
            if (err) {
                reject(err);
            } else {
                conn.beginTransaction((err) => {
                    if (err) {
                        conn.rollback(() => {
                            conn.release();
                            reject(err);
                        });
                    } else {
                        let query = `INSERT INTO leases SET ?`;
                        conn.query(query, leases, (err, sqlresult1) => {
                            if (err) {
                                conn.rollback(() => {
                                    conn.release();
                                    reject(err);
                                });
                            } else {
                                const temp1 = residents.map((resident) => {
                                    return new Promise(async (res, rej) => {
                                        const residentTemp = { ...(await resident), lease_id: sqlresult1.insertId };
                                        const residentObj = new Residents(residentTemp);
                                        let query2 = `INSERT INTO residents SET ?`;
                                        conn.query(query2, residentObj, (err, sqlresult2) => {
                                            if (err) {
                                                conn.rollback(() => {
                                                    conn.release();
                                                    reject(err);
                                                    res(false);
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
                                                                        data: sqlresult2.insertId,
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
                                                    .catch((err) => {
                                                        conn.rollback(() => {
                                                            conn.release();
                                                            reject(new Error("Error in promise"));
                                                        });
                                                    })
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
    })
}

module.exports = Lease;