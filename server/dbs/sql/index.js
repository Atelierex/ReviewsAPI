const mysql = require('mysql');

const db = mysql.createPool({
  host: 'ec2-54-193-50-253.us-west-1.compute.amazonaws.com',
  port: 3306,
  user: 'user1',
  password: 'password',
  database: 'sdc'
});


// const db = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'sdc'
// });
// db.connect((err) => {
//   if (err) throw err;
//   console.log('DB connected!');
// });

module.exports = db;
