const db = require('../dbs/sql/index.js');

const getRatings = (product_id, callback) => {
  const queryStr = `
  SELECT rating, count(id) as count
  FROM Reviews
  WHERE product_id = ${product_id}
  GROUP BY rating
  ORDER BY rating ASC`;

  db.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

const getRecommend = (product_id, callback) => {
  const queryStr = `
  SELECT SUM(recommend = 0), SUM(recommend = 1)
  FROM Reviews
  WHERE product_id = ${product_id}`;

  db.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

const getCharacteristics = (product_id, callback) => {
  const queryStr = `
  SELECT Characteristics.id, characteristic_name, characteristic_value
  FROM Characteristics
  INNER JOIN Characteristic_Reviews
  ON characteristic_id = Characteristics.id
  WHERE product_id = ${product_id}`;

  db.query(queryStr, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

module.exports = { getRatings, getRecommend, getCharacteristics };