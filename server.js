// server.js
const express = require('express');
const mySQL = require('mysql');
const bodyParser = require('body-parser');
const db = require('./server/config/db');
const path = require("path");
const cors = require('cors')

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.set('view engine', 'pug');

app.use('/libs', express.static(path.join(__dirname, 'node_modules')));
app.use('/', express.static(path.join(__dirname, 'src')));
app.use('/tests', express.static(path.join(__dirname, 'tests')));

//var corsOptions = {
 // origin: '*',
 // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
//}

app.use(cors())

var connection = mySQL.createConnection(db.url)

require('./server/app/routes')(app, connection);





app.listen(port, () => {
  console.log('We are live on ' + port);
});
