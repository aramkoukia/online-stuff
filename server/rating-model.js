const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ratingSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  userid: String,
  email: String,
  productid: String,
});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;