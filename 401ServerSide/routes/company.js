var express = require('express');
var router = express.Router();
var companyController = require("../controllers/CompanyController");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/companyLogin', companyController.companyLogin);
router.post('/checkOTP', companyController.checkOTP);
router.post('/addEmployee', companyController.addEmployee);
router.post('/getEmployees', companyController.getAllEmployees);
router.post('/makePayment', companyController.makeMonthlyPayment);
router.post('/getAllPayments', companyController.getMonthlyPaymentsMade);
router.post('/usersContri', companyController.getUsersContribution);
router.post('/getDeptEmployeeLists', companyController.getDeptEmployeeLists);
module.exports = router;