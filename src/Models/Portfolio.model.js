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

module.exports = Portfolio;