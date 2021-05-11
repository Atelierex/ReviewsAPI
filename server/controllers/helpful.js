const helpful = require('../models').helpful;

const updateHelpful = (req, res, next) => {
  const review_id = req.params.review_id;
  helpful.updateHelpful(review_id, (err, data) => {
    if (err) {
      res.status(400);
    } else {
      console.log('review marked as helpful');
      res.status(204).end();
    }
  })
}

module.exports = { updateHelpful };