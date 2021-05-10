const reviewsMeta = require('../models').reviewsMeta;

const getMetadata = (req, res, next) => {
  const product_id = req.query.product_id || 1;
  const metadata = {};
  metadata['product_id'] = product_id;

  reviewsMeta.getRatings(product_id, (err, data) => {
    if (err) {
      res.status(404);
    } else {
      metadata['ratings'] = {};
      metadata['ratings']["0"] = String(data[0]['SUM(rating = 0)']);
      metadata['ratings']["1"] = String(data[0]['SUM(rating = 1)']);
      metadata['ratings']["2"] = String(data[0]['SUM(rating = 2)']);
      metadata['ratings']["3"] = String(data[0]['SUM(rating = 3)']);
      metadata['ratings']["4"] = String(data[0]['SUM(rating = 4)']);
      metadata['ratings']["5"] = String(data[0]['SUM(rating = 5)']);
      metadata['recommend'] = {};
      reviewsMeta.getRecommend(product_id, (err, data) => {
        if (err) {
          res.status(404);
        } else {
          metadata['recommend']['true'] = String(data[0]['SUM(recommend = 1)']);
          metadata['recommend']['false'] = String(data[0]['SUM(recommend = 0)']);
        }
      })
      reviewsMeta.getCharacteristics(product_id, (err, characteristics) => {
        if (err) {
          res.status(404);
        } else {
          for (var char of characteristics) {
            const characteristic = {};
            characteristic['id'] = char.id;
            characteristic['value'] = String(char.characteristic_value);
            metadata['characteristics'][char.characteristic_name] = characteristic;
          }
        }
      })
      res.send(metadata);
      next();
    }
  })
}

module.exports = { getMetadata };