var mysql = require('mysql');

var con= mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "edenUbuntu"
});

module.exports = {
	con,
	"algorithm" : 'aes-256-cbc'
} 