// Setting up MySQL connection & dependencies
const mysql = require('mysql');
const util = require('util');

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 1170,
        user: 'root',
        password: 'test123',
        database: 'burgers_db'
    });
};

// This makes the connection with the mysql database
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as ID: ${connection.threadId}`);
});

connection.query = util.promisify(connection.query);

// This will export the connection for ORM use
module.exports = connection;