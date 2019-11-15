var mysql = require('mysql');

var con= mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "edenUbuntu1"
});

module.exports = {
	con,
	"algorithm" : 'aes-256-cbc'
} 