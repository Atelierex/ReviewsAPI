const db = require('../dbs/sql/index.js');

const getReviews = (product_id, callback) => {
  const queryStr = `SELECT p.photo_url, r.* 
  FROM Reviews r 
  LEFT JOIN Photos p 
  ON p.review_id = r.id AND r.product_id = '${product_id}' AND r.reported = 0`;

  db.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

const postReview = (review, callback) => {
  const queryStr = `INSERT INTO Reviews (product_id, rating, summary, body, recommend, 
    reported, reviewer_name, reviewer_email, response, helpfulness)
    VALUES ('${review.product_id}', '${review.rating}', '${review.summary}', '${review.body}', '${review.recommend}',
    '${review.reported}', '${review.reviewer_name}', '${review.reviewer_email}', '${review.response}', '${review.helpfulness}')`;

  db.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}