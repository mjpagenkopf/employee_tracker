const mysql = require('mysql');

// Enable access to .env variables
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',

    user: 'root',

    password: process.env.DB_PASSWORD,

    database: 'employee_db',
});

module.exports = connection;