const mysql = require('mysql')

//Set up the connection to the database
const pool = mysql.createPool({
  host     : 'db-travel-log',
  user     : 'user',
  password : 'password',
  database : 'db'
});

//Create the featured photos table
let createFeatured = 'CREATE TABLE IF NOT EXISTS featuredPhotos( \
             id INT AUTO_INCREMENT, \
             country VARCHAR(99), \
             location VARCHAR(99), \
             file VARCHAR(99), \
             PRIMARY KEY (id))'

pool.getConnection(function(err, connection) {
    connection.query(createFeatured, function (err, rows, fields) {
        connection.release();
        if (err) console.log(err);
    })
});


//Create the all photos table
let createAll = 'CREATE TABLE IF NOT EXISTS allPhotos( \
             id INT AUTO_INCREMENT, \
             country VARCHAR(99), \
             location VARCHAR(99), \
             file VARCHAR(99), \
             PRIMARY KEY (id))'

pool.getConnection(function(err, connection) {
    connection.query(createAll, function (err, rows, fields) {
        connection.release();
        if (err) console.log(err);
    })
});

//Export the connection
exports.pool = pool;