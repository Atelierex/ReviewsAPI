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
      for (let i = 0; i < data.length; i++) {
        metadata['ratings'][data[i].rating] = data[i].count;
      }
      reviewsMeta.getRecommend(product_id, (err, data) => {
        metadata['recommended'] = {};
        if (err) {
          res.status(404);
        } else {
          metadata['recommended']['0'] = data[0]['not_recommended'];
          metadata['recommended']['1'] = data[0]['recommended'];
          reviewsMeta.getCharacteristics(product_id, (err, data) => {
            metadata['characteristics'] = {};
            if (err) {
              res.status(404);
            } else {
              for (let i = 0; i < data.length; i++) {
                const char = {};
                char['id'] = data[i].id;
                char['value'] = data[i].characteristic_value;
                metadata['characteristics'][data[i].characteristic_name] = char;
              }
              res.send(metadata);
              next();
            }
          })
        }
      })
    }
  })
}

module.exports = { getMetadata };