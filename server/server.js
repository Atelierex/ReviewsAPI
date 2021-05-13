require('newrelic');
const express = require('express');
const app = express();
const { reviews, reviewsMeta, helpful, report } = require('./controllers/index.js');
const port = 3000;
app.use(express.json());

app.get('/reviews', reviews.getReviews);
app.get('/reviews/meta', reviewsMeta.getMetadata);
app.post('/reviews', reviews.postReview);
app.put('/reviews/:review_id/helpful', helpful.updateHelpful);
app.put('/reviews/:review_id/report', report.reportReview);

app.listen(port, () => {
  console.log(`Listening on PORT: ${port}`)
})