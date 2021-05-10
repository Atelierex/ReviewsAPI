const db = require('../dbs/sql/index.js');

const getReviews = (product_id, callback) => {
  const queryStr = `
  SELECT p.photo_url, r.* 
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
  const queryStr = `
  INSERT INTO Reviews (product_id, rating, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
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

const postCharacteristics = (product_id, characteristic, callback) => {
  const queryStr = `INSERT INTO Characteristics (product_id, characteristic_name) VALUES ('${product_id}', '${characteristic})`;

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
  VALUES ('${review_id}', '${char_id}', '${Object.values(char_value)[0]}')`;

  db.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

const postPhotos = (review_id, photo_url, callback) => {
  const queryStr = `INSERT INTO Photos (review_id, photo_url) VALUES ('${review_id}', '${photo_url}')`;

  db.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

module.exports = { getReviews, postReview, postCharacteristics, postCharReviews, postPhotos };