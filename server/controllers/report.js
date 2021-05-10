const helpful = require('../models').helpful;

const reportReview = (req, res, next) => {
  const review_id = req.params.review_id;
  helpful.reportReview(review_id, (err, data) => {
    if (err) {
      res.status(400);
    } else {
      console.log('helpful updated');
      res.status(204);
      next();
    }
  })
}

module.exports = { reportReview };