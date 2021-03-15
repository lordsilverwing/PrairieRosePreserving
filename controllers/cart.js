const Product = require('../models/product')
const Cart = require('../models/cart')

module.exports = {
    index,
    deleteItem
}
function index(req, res) {
     Cart.find({}, function(err, products) {
       res.render('Cart/index', { products });
     });
  }
function deleteItem(req, res) {
    Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
        console.log(deletedProduct, ' this is removed item')
        res.redirect('/cart');
      });
}
  