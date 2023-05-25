const db = require('./../Utilities/dbConfig');

class Portfolio {
    name;
    company_id;
    is_active;
    created_at;
    updated_at;

    constructor(obj){
        this.name = obj.name,
        this.company_id = obj.company_id,
        this.is_active = obj.is_active || 1,
        this.created_at = obj.created_at || new Date().toISOString(),
        this.updated_at = obj.updated_at || null
    }
}

Portfolio.getByUserId = async(id)=> {
    return new Promise((resolve, reject)=> {
        try {
            const query = `SELECT id as value, name FROM portfolio WHERE is_active=1 && company_id=${id}`;
            db.query(query, (err, sqlresult)=> {
                if(err){
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

Portfolio.getByCompany = async(id, search)=> {
    return new Promise((resolve, reject)=> {
        try {
            const query = `SELECT COUNT(p.id) AS properties, pf.id as id, pf.name AS portfolio_name
            FROM portfolio pf
            LEFT JOIN property p ON p.portfolio_id = pf.id
            WHERE pf.company_id = ${id} ${search.length > 0 ? `&& pf.name LIKE '%${search}%'` : ''}
            GROUP BY pf.id;
            `;
            db.query(query, (err, sqlresult)=> {
                if(err){
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

Portfolio.add = async(data)=> {
    return new Promise((resolve, reject)=> {
        try {
            const query = `INSERT INTO portfolio SET ?`;
            db.query(query, data, (err, sqlresult)=> {
                if(err){
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

Portfolio.update = async(id,data)=> {
    return new Promise((resolve, reject)=> {
        try {
            const query = `UPDATE portfolio SET name = '${data}' where id = ${id}`;
            db.query(query, data, (err, sqlresult)=> {
                if(err){
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

module.exports = Portfolio;