const Product = require('../models/product')
const Cart = require('../models/cart')

module.exports = {
    index,
    show,
    new: newProduct,
    create
}
function index(req, res) {
     Product.find({}, function(err, products) {
       res.render('Product/index', { products });
     });
  }
  function show(req, res) {
    Product.findById(req.params.id, function(err, products) {
        res.render('Product/show');
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
          res.redirect(`/products/${product._id}`)
    })
}
