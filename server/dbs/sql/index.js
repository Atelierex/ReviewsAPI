const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sdc'
});
db.connect((err) => {
  if (err) throw err;
  console.log('DB connected!');
});

module.exports = db;
