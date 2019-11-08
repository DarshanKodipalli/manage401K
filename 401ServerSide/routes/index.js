var express = require('express');
var router = express.Router();
var adminController = require("../controllers/AdminController");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({"status":1,"msg":"Welcome!"});
});
router.post('/login', adminController.adminLogin);
router.post('/logout', adminController.adminLogout);
router.post('/addCompany', adminController.addCompany);
router.get('/getCompanies',adminController.getAllCompanies);

module.exports = router;
