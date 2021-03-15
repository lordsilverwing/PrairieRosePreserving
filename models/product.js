const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String},
    description: {type: String},
    price: {type: Number},
    quantity: {type: Number, min: 1, default: 1},
    available: {type: Boolean}
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Product', productSchema)