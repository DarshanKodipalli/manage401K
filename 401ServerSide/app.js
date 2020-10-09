const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const companyRouter = require('./routes/company');
const employeeRouter = require('./routes/employee.js');
const appConfig = require("./config/config");


appConfig.con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the Database!");
});


const app = express();


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Change later to only allow our server
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/', indexRouter);
app.use('/company/', companyRouter);
app.use('/employee/', employeeRouter);


const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});

module.exports = app;