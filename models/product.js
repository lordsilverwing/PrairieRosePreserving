const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const productSchema = new Schema({
    productId: Number,
    quantity: {type: Number, min: 1, max: 10, deafult: 1},
    name: String,
    price: Number,
    description: String,
   }, {
    timestamps: true
  });

  module.exports = mongoose.model('Product', productSchema)