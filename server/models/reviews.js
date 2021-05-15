const db = require('../dbs/sql/index.js');

const getReviews = (product_id, callback) => {
  const queryStr = `
  SELECT GROUP_CONCAT(p.photo_url) AS photo_urls, GROUP_CONCAT(p.id) AS photo_ids, r.* 
  FROM Reviews r 
  LEFT JOIN Photos p 
  ON p.review_id = r.id
  WHERE r.product_id = '${product_id}' AND r.reported = 0
  GROUP BY r.id`;
  db.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

const postReview = (review, callback) => {
  const queryStr = `
  INSERT INTO Reviews (product_id, rating, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
  VALUES (${db.escape(review.product_id)}, ${db.escape(review.rating)}, ${db.escape(review.summary)}, ${db.escape(review.body)}, ${db.escape(review.recommend)},
  ${db.escape(review.reported)}, ${db.escape(review.reviewer_name)}, ${db.escape(review.reviewer_email)}, ${db.escape(review.response)}, ${db.escape(review.helpfulness)})`;

  db.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

const postCharacteristics = (product_id, characteristic, callback) => {
  const queryStr = `INSERT INTO Characteristics (product_id, characteristic_name) VALUES (${db.escape(product_id)}, ${db.escape(characteristic)})`;

  db.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

const postCharReviews = (review_id, char_id, char_value, callback) => {
  const queryStr = `INSERT INTO Characteristic_Reviews (review_id, characteristic_id, characteristic_value)
  VALUES (${db.escape(review_id)}, ${db.escape(char_id)}, ${db.escape(char_value)})`;

  db.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

const postPhotos = (review_id, photo_url, callback) => {
  const queryStr = `INSERT INTO Photos (review_id, photo_url) VALUES (${db.escape(review_id)}, ${db.escape(photo_url)})`;

  db.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

module.exports = { getReviews, postReview, postCharacteristics, postCharReviews, postPhotos };