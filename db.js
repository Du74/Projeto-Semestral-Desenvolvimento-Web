const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1608",
  database: "techcycle"
});
db.connect(err => {
  if (err) throw err;
  console.log('Conectado ao MySQL');
});

module.exports = db;