const reviews = require('../models').reviews;

const getReviews = (req, res, next) => {
  const product_id = req.query.product_id || 1;
  reviews.getReviews(product_id, (err, data) => {
    console.log(data);
    if (err) {
      res.status(422).send('Error: invalid product_id provided');
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
        photos.push(data[i].photo_url);
        review['photos'] = photos;
        results.push(review);
      }

      res.status(200).send(reviews);
      next();
    }
  })
}

const postReview = (req, res, next) => {
  const review = {};
  const photos = [];
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
      let count = 0;
      for (var photo of req.body.photos) {
        if (isValidUrl(photo)) {
          reviews.postPhotos(review_id, photo, (err, data) => {
            if (err) {
              res.status(404);
            }
            count++;
            if (count === req.body.photos.length - 1) {
              for (char_name in req.body.characteristics) {
                reviews.postCharacteristics(char_name, (err, data) => {
                  if (err) {
                    res.status(404);
                  } else {
                    const char_id = data.insertId;
                    reviews.postCharReviews(review_id, char_id, req.body.characteristics[char_name], (err, data) => {
                      if (err) {
                        res.status(404);
                      } else {
                        res.status(201);
                        next();
                      }
                    })
                  }
                })
              }
            }
          })
        }
      }
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