var express = require('express');
var router = express.Router();
var employeeController = require("../controllers/EmployeeController");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/employeeLogin', employeeController.EmployeeLogin);
router.post('/getEmployees', employeeController.getAllEmployees);
router.post('/getAllEmployeePayments', employeeController.getAllEmployeePayments);
router.post("/updateRecord", employeeController.updateEmployeeRecord);
module.exports = router;
