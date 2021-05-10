const db = require('../dbs/sql/index.js');

const updateHelpful = (review_id, callback) => {
  const queryStr = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${review_id}`;

  db.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

module.exports = { updateHelpful };
