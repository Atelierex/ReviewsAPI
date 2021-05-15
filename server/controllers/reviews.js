const reviews = require('../models').reviews;

const getReviews = (req, res, next) => {
  const product_id = req.query.product_id;
  if (isNaN(product_id)) {
    res.status(422).send('Error: invalid product_id provided');
  } else {
    reviews.getReviews(product_id, (err, data) => {
      if (err) {
        res.status(422).send(err);
      } else {
        const reviews = {};
        const results = [];
        reviews['product'] = product_id;
        reviews['page'] = 0;
        reviews['count'] = data.length || 5;
        reviews['results'] = results;

        for (let i = 0; i < data.length; i++) {
          const review = {};
          const photos = [];
          review['review_id'] = data[i].id;
          review['rating'] = data[i].rating;
          review['summary'] = data[i].summary;
          review['recommend'] = Boolean(data[i].recommend);
          review['response'] = data[i].response === 'null' ? null : data[i].response;
          review['body'] = data[i].body;
          review['date'] = data[i].review_date;
          review['reviewer_name'] = data[i].reviewer_name;
          review['helpfulness'] = data[i].helpfulness;

          // split photos_urls of the same review_id and push into photos array
          if (data[i].photo_urls !== null) {
            const p_urls = data[i].photo_urls.split(',');
            const p_ids = data[i].photo_ids.split(',');
            for (let j = 0; j < p_urls.length; j++) {
              photos.push({
                id: Number(p_ids[j]),
                url: String(p_urls[j])
              })
            }
          }
          review['photos'] = photos;
          results.push(review);
        }
        res.status(200).send(reviews);
        next();
      }
    })
  }

}

const postReview = (req, res, next) => {
  const review = {};
  review['product_id'] = req.body.product_id;
  review['rating'] = req.body.rating;
  review['summary'] = req.body.summary;
  review['recommend'] = (req.body.recommend === 'true') || 0;
  review['response'] = req.body.response || null;
  review['body'] = req.body.body;
  review['review_date'] = req.body.date;
  review['reported'] = (req.body.reported === 'true') || 0;
  review['reviewer_name'] = req.body.name;
  review['reviewer_email'] = req.body.email;
  review['helpfulness'] = req.body.helpfulness || 0;

  reviews.postReview(review, (err, data) => {
    if (err) {
      res.status(422).send('Error: Review body contains invalid entries');
    } else {
      const review_id = data.insertId;
      for (var photo of req.body.photos) {
        if (isValidUrl(photo)) {
          reviews.postPhotos(review_id, photo, (err, data) => {
            if (err) {
              res.status(404);
            } else {
              res.status(201);
            }
          }
          )
        }
      }
      const characteristics = req.body.characteristics;
      for (char_id in characteristics) {
        reviews.postCharReviews(review_id, char_id, characteristics[char_id], (err, data) => {
          if (err) {
            res.status(404);
          } else {
            res.status(201);
          }
        }
        )
      }
      res.status(201).send('Created');
      next();
    }
  })
}


// url validator
const isValidUrl = (str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  let url = str;
  if (str[0] === '"' && str[str.length - 1] === '"') {
    url = str.substring(1, str.length - 1);
  }
  return !!pattern.test(url);
}

module.exports = { getReviews, postReview };