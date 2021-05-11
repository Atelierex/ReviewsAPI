const report = require('../models').report;

const reportReview = (req, res, next) => {
  const review_id = req.params.review_id;
  report.reportReview(review_id, (err, data) => {
    if (err) {
      res.status(400);
    } else {
      console.log('review reported');
      res.status(204).end();
    }
  })
}

module.exports = { reportReview };