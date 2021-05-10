const helpful = require('../models').helpful;

const updateHelpful = (req, res, next) => {
  const review_id = req.params.review_id;
  helpful.updateHelpful(review_id, (err, data) => {
    if (err) {
      res.status(400);
    } else {
      console.log('review reported');
      res.status(204);
      next();
    }
  })
}

module.exports = { updateHelpful };