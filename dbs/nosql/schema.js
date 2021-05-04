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
  date: String,
  reviewer_name: String,
  helpfulness: Number,
  photos: [String],
});

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
