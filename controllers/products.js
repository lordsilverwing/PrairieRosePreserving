const Product = require('../models/product')
const Cart = require('../models/cart')
var multer = require('multer');
var fs = require('fs');

module.exports = {
    index,
    show,
    new: newProduct,
    create
}
function index(req, res) {
     Product.find({}, function(err, products) {
       res.render('products/index', { products });
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
    product.imgPath = saveImg(req, res, product);
    product.save(function(err){
        if (err){
           return res.redirect('products/new');
        }
        console.log(product, ' this is the new product')
        res.redirect(`/products`)
        //res.redirect(`/products/${product._id}`)
        })
}

const imageDir = 'uploads/'

function saveImg(req, res, product){
    var body = '';
    let filePath = imageDir + product.name + '-' + Date.now();
    req.on('data', function(data) {
        body += data;
    });

    req.on('end', function (){
        fs.appendFile(__dirPath + filePath, body, function() {
            res.end();
        });
    });
    return filePath;
}