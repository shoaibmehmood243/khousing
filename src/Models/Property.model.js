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

Property.Add = (property, propertyUnit)=> {
    return new Promise((resolve, reject)=> {
        try {
            db.getConnection((err, conn)=> {
                if(err) {
                    reject(err);
                } else {
                    conn.beginTransaction((err)=> {
                        if(err) {
                            conn.rollback(()=> {
                                conn.release();
                                reject(err);
                            })
                        } else {
                            let query = `INSERT INTO property SET ?`;
                            conn.query(query, property, (err, sqlresult)=> {
                                if(err) {
                                    conn.rollback(() => {
                                        conn.release();
                                        reject(err);
                                    });
                                } else {
                                    const temp1 = propertyUnit.map((units)=> {
                                        return new Promise(async(res, req)=> {
                                            let query2 = `INSERT INTO property_units SET ?`;
                                            const propertyUnitTemp = {...(await units), property_id: sqlresult.insertId};
                                            const propertyUnitObj = new PropertyUnit(propertyUnitTemp);
                                            conn.query(query2, propertyUnitObj, (err, sqlresult2)=> {
                                                if(err) {
                                                    conn.rollback(() => {
                                                        conn.release();
                                                        reject(err);
                                                        res(false)
                                                    });
                                                } else {
                                                    Promise.all(temp1)
                                                        .then((promiseReturn)=> {
                                                            if(promiseReturn.indexOf(false) == -1) {
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

Property.get = (id, search)=> {
    return new Promise((resolve, reject)=> {
        try {
            const query = `SELECT id, address, latitude, longitude, property_type FROM property
            WHERE company_id = ${id} ${search.length > 0 ? `&& address LIKE '%${search}%'` : ''}`;
            console.log(query);
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

Property.getPropertyByLease = (id, search)=> {
    return new Promise((resolve, reject)=> {
        try {
            const query = `SELECT p.id, p.address, p.latitude, p.longitude, p.property_type 
            FROM property AS p
            LEFT JOIN leases AS l ON p.id = l.property_id
            WHERE p.company_id = ${id} ${search.length > 0 ? `AND p.address LIKE '%182%'` : ''}
            AND l.property_id IS NULL
            `;
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