const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const cartSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      products: [
        {
            productId: Number,
            quantity:{type: Number, enum: [1, 2, 3, 4, 5, 6]},
            name: String,
            price: Number
        }
      ],
      active: {
        type: Boolean,
        default: true
      },
      modifiedOn: {
        type: Date,
        default: Date.now
      }
    },
    { timestamps: true }
  );
  

module.exports = mongoose.model('Cart', cartSchema); 