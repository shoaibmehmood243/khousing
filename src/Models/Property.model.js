const db = require("../Utilities/dbConfig");
const PropertyUnit = require('./PropertyUnit.model')

class Property {
    user_id;
    property_type;
    address;
    reviews;
    sq_feet;
    created_at;
    updated_at;
    is_active;

    constructor(obj) {
        this.user_id = obj.user_id || 2,
        this.property_type = obj.property_type,
        this.address = obj.address,
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
                                                    res(true);
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
                                                                        sales_order_id: sqlresult.insertId,
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