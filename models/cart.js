const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const cartSchema = new Schema({
    cartUser: [{type: Schema.Types.ObjectId, ref: 'User'}],
    total: {type: Number},
    product: [{type: Schema.Types.ObjectId, ref: 'Product'}]
})

module.exports = mongoose.model('Cart', cartSchema); 