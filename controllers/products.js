const Product = require('../models/product')
const Cart = require('../models/cart')

module.exports = {
    index,
    show,
    create,
    newProduct
}
function index(req, res) {
     Product.find({}, function(err, products) {
        res.render('products/index', { products });
     });
  }
  function show(req, res) {
    Product.findById(req.params.id, function(err, product) {
        res.render('products/show', {product});
      });
}
  
function newProduct(req, res) {
    res.render('products/new');
}
function create(req, res){
    const product = new Product(req.body);
    product.save(function(err){
         if (err){
            return res.redirect('products/new');
         }
         console.log(product, ' this is the new product')
         res.redirect(`/products`)
         //res.redirect(`/products/${product._id}`)
         })
 }
 