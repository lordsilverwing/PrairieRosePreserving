const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: String,
    googleId: String,
    cart: {type: Schema.Types.ObjectId, ref: 'Cart'}
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('User', userSchema)