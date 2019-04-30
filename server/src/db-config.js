const mysql = require('mysql')

//Set up the connection to the database
const pool = mysql.createPool({
  host     : 'db-travel-log',
  user     : 'user',
  password : 'password',
  database : 'db'
});

let query = 'CREATE TABLE IF NOT EXISTS images( \
             id INT AUTO_INCREMENT, \
             name VARCHAR(20), \
             location VARCHAR(99), \
             description VARCHAR(9999),\
             numFiles INT, \
             PRIMARY KEY (id))'

pool.getConnection(function(err, connection) {
    connection.query(query, function (err, rows, fields) {
        connection.release();
        if (err) console.log(err);
    })
});

//Export the connection
exports.pool = pool;