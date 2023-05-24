const db = require("../Utilities/dbConfig");
const bcrypt = require('bcrypt');
const UserPermission = require("./UserPermission.model");
const Portfolio = require("./Portfolio.model");

class User {
    first_name;
    last_name;
    email;
    password;
    phone_number;
    is_admin;
    is_customer;
    is_secondary;
    user_type;
    company_id;
    is_active;
    created_at;
    updated_at;

    constructor(obj) {
        this.first_name = obj.first_name,
            this.last_name = obj.last_name,
            this.email = obj.email,
            this.password = obj.password,
            this.phone_number = obj.phone_number,
            this.is_admin = obj.is_admin || 0,
            this.is_customer = obj.is_customer || 0,
            this.is_secondary = obj.is_secondary || 0,
            this.user_type = obj.user_type,
            this.company_id = obj.company_id,
            this.is_active = obj.is_active || 1,
            this.created_at = obj.created_at || new Date().toISOString(),
            this.updated_at = obj.updated_at || null
    }
}

class Company {
    company_name;
    created_at;
    updated_at;

    constructor(obj) {
        this.company_name = obj.company_name,
            this.created_at = obj.created_at || new Date().toISOString(),
            this.updated_at = obj.updated_at || null
    }
}

User.add = (data, permissions) => {
    return new Promise(async (resolve, reject) => {
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
                            const salt = await bcrypt.genSalt(10);
                            const hashedPassword = await bcrypt.hash(data.password, salt);
                            data.password = hashedPassword;
                            let query = `INSERT INTO users SET ?`;
                            conn.query(query, data, (err, sqlresult) => {
                                if (err) {
                                    conn.rollback(() => {
                                        conn.release();
                                        reject(err);
                                    })
                                } else {
                                    const permissionObj = { ...permissions, user_id: sqlresult.insertId };
                                    const newPermission = new UserPermission(permissionObj);
                                    query = `INSERT INTO user_permission SET ?`;
                                    conn.query(query, newPermission, (err, sqlresult2) => {
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
                                                    resolve({ sqlresult })
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

User.getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT * FROM users WHERE email = '${email}'`;
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

User.Register = async (data) => {
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
                            const companyObj = { company_name: `${data.first_name}'s company` };
                            const company = new Company(companyObj);
                            let query = `INSERT INTO company SET ?`
                            conn.query(query, company, async (err, companyResult) => {
                                if (err) {
                                    conn.rollback(() => {
                                        conn.release();
                                        reject(err);
                                    })
                                } else {
                                    const salt = await bcrypt.genSalt(10);
                                    const hashedPassword = await bcrypt.hash(data.password, salt);
                                    data.password = hashedPassword;
                                    data.company_id = companyResult.insertId;
                                    const userObj = new User(data);
                                    query = `INSERT INTO users SET ?`;
                                    conn.query(query, userObj, (err, userResult) => {
                                        if (err) {
                                            conn.rollback(() => {
                                                conn.release();
                                                reject(err);
                                            })
                                        } else {
                                            const permissionObj = { user_id: userResult.insertId };
                                            const permission = new UserPermission(permissionObj);
                                            query = `INSERT INTO user_permission SET ?`;
                                            conn.query(query, permission, (err, permissionResult) => {
                                                if (err) {
                                                    conn.rollback(() => {
                                                        conn.release();
                                                        reject(err);
                                                    })
                                                } else {
                                                    const portfolioObj = { company_id: companyResult.insertId, name: 'Portfolio 1' };
                                                    const portfolio = new Portfolio(portfolioObj);
                                                    query = `INSERT INTO portfolio SET ?`;
                                                    conn.query(query, portfolio, (err, portfolioResult) => {
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
                                                                    resolve(userResult);
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
                        }
                    })
                }
            })
        } catch (error) {
            reject(error);
        }
    })
}

User.CustomerRegister = async (data) => {
    return new Promise(async (resolve, reject) => {
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
                            const salt = await bcrypt.genSalt(10);
                            const hashedPassword = await bcrypt.hash(data.password, salt);
                            data.password = hashedPassword;
                            data.company_id = -1;
                            const userObj = new User(data);
                            let query = `INSERT INTO users SET ?`;
                            db.query(query, userObj, (err, userResult) => {
                                if (err) {
                                    conn.rollback(() => {
                                        conn.release();
                                        reject(err);
                                    })
                                } else {
                                    const permissionObj = { user_id: userResult.insertId };
                                    const permission = new UserPermission(permissionObj);
                                    query = `INSERT INTO user_permission SET ?`;
                                    conn.query(query, permission, (err, permissionResult) => {
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
                                                    resolve(userResult);
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

User.getPermissions = async (id) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT * FROM user_permission WHERE user_id = ${id}`;
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

User.getUserById = async (id) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT users.id as user_id, users.first_name, users.last_name, users.email, users.phone_number,
                 users.is_admin, users.user_type, users.company_id, users.is_customer FROM users WHERE id = ${id}`;
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

User.getUserByCompanyId = async (id, search) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT users.first_name, users.last_name, users.email, 
            users.phone_number, users.user_type FROM users WHERE company_id = ${id}
            ${search.length > 0 ? `&& CONCAT_WS('-',first_name,last_name,email, phone_number, user_type) LIKE 
            '%${search}%'` : ''}
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

module.exports = User;