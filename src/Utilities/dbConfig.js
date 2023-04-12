const mysql = require("mysql");

const db = mysql.createPool({
    host: '191.101.13.52',
    user: 'u116608330_root',
    password: 'Temppass@22',
    database: 'u116608330_khousing'
});
db.getConnection((err, connection)=> {
    if(err) {
        console.log(err);
    } else {
        console.log('DB connection successfull')
    }
})

module.exports = db;