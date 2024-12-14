//import mysql2 module
const mysql = require('mysql2');

//set up config
const dbConfig = {
    host: '',
    user: '',
    password: '',
    database: '',
}

//try establish connection
const db = mysql.createConnection(dbConfig);
db.connect(err => {
    if(err){
        throw err;
    }
    console.log("DB connection established...")
})

//export db
module.exports = db;