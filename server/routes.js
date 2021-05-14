const express = require('express');
const { reviews, reviewsMeta, helpful, report, loaderio } = require('./controllers/index.js');
const router = express.Router();

// router.get('/loaderio-5d886566a4788d7b18a783b471e05e20', loaderio.token);
router.get('/loaderio-9e2243158a0580e7ebac1c56d822ad11', loaderio.token);
router.get('/reviews', reviews.getReviews);
router.get('/reviews/meta', reviewsMeta.getMetadata);
router.post('/reviews', reviews.postReview);
router.put('/reviews/:review_id/helpful', helpful.updateHelpful);
router.put('/reviews/:review_id/report', report.reportReview);

module.exports = router;