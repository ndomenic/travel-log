const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db-config');
const pool = db.pool;
const bodyParser = require('body-parser');
var fs = require('fs');

//Directory constants
const serverDir = __dirname.substring(0, __dirname.length - 3)
const imagesDir = serverDir + "images";

//Setup the express app
const app = express();
const allowedOrigins = ['http://localhost:3000', 'http://domenichini.ca:8080'];
app.use(cors({
	credentials: true,
	origin: function(origin, callback){
		if(!origin) return callback(null, true);
		if(allowedOrigins.indexOf(origin) === -1){
		  var msg = 'The CORS policy for this site does not ' +
		            'allow access from the specified Origin.';
		  return callback(new Error(msg), false);
		}
		return callback(null, true);
	}
}));
app.use(bodyParser.json());
app.use(express.static(serverDir + "build"));

app.get('/getLinks/:country/:location/:table', (req,res) =>{
		let baseLink = '/images/' + req.params.country + '/' + req.params.location + '/';
		let arr = [];

		pool.getConnection(function(err, connection) {
	    connection.query('SELECT file FROM ' + req.params.table + ' WHERE country="' + req.params.country + '" AND location="' + req.params.location + '"', function (err, rows, fields) {
	        connection.release();
	        if (err) console.log(err);
	        rows.forEach(function(element) {
	        	arr.push(baseLink + element["file"])
	        });
	        res.json({"links": arr});
	    })
		});
});

app.get('/images/:country/:location/:fileName', (req, res) => {
	let options = {
    root: imagesDir + '/' + req.params.country + '/' + req.params.location,
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  let fileName = req.params.fileName;
  res.sendFile(fileName, options, function (err) {
    if (err) console.log(err);
  });
});

//Serve the static page if the user doesn't hit any of the other endpoints
app.get('*', (req,res) =>{
    res.sendFile(path.join(serverDir+'build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port).on('error', function(err){
    console.log('An error occurred!');
    console.log(err);
});

process.on('uncaughtException', function(err) {
    console.log('process.on handler');
    console.log(err);
});

console.log('App is listening on port ' + port);