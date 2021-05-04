const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const reviewSchema = new mongoose.Schema({
  review_id: Number,
  product_id: Number,
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  date: Date,
  reviewer_name: String,
  helpfulness: Number,
  photos: [{}],
});

const Review = mongoose.model('review', reviewSchema);

const metaSchema = new mongoose.Schema({
  product_id: Number,
  ratings: {
    "1": Number,
    "2": Number,
    "3": Number,
    "4": Number,
    "5": Number
  },
  recommended: {
    "false": Number,
    "true": Number
  },
  characteristics: {
    characteristic: {
      id: Number,
      value: Number
    }
  }
})

const Meta = mongoose.model('meta', metaSchema);

const testReview = new Review({
  review_id: 12345,
  product_id: 54321,
  rating: 5,
  summary: "summary",
  recommend: true,
  response: "response",
  body: "body",
  date: "5-3-2021",
  reviewer_name: "reviewer",
  helpfulness: 3,
  photos: [
    {
      "id": 536115,
      "url": "https://images.unsplash.com/photo-1560570803-7474c0f9af99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
    },
    {
      "id": 536116,
      "url": "https://images.unsplash.com/photo-1561693532-9ff59442a7db?ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80"
    },
  ],
})

const testMeta = new Meta({
  product_id: 23149,
  ratings: {
    "4": 2,
    "5": 5
  },
  recommended: {
    "false": 4,
    "true": 16
  },
  characteristics: {
    "Size": {
      id: 77777,
      value: 3.50000
    }
  }
})

testReview.save();
testMeta.save();
