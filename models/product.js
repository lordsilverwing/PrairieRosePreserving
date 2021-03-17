const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const productSchema = new Schema({
    productId: Number,
    quantity: Number,
        name: String,
        price: Number
   }, {
    timestamps: true
  });

  module.exports = mongoose.model('Product', productSchema)