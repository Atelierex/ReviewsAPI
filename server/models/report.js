const db = require('../dbs/sql/index.js');

const reportReview = (review_id, callback) => {
  const queryStr = `UPDATE Reviews SET reported = 1 WHERE id = ${review_id}`;

  db.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

module.exports = { reportReview };
