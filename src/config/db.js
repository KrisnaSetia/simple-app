/* eslint-disable @typescript-eslint/no-require-imports */
const mysql= require("mysql");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dummy_telkomsel'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ',err);
    }else{
    }
    console.log('Connected to database');
});

export default db;