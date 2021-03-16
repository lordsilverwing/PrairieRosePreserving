const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const productSchema = new Schema({
    name: {type: String},
    description: {type: String},
    price: {type: Currency, required: true, min: 0},
    quantity: {type: Number, min: 0, default: 1},
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Product', productSchema)