const Product = require('../models/product')
const Cart = require('../models/cart')

module.exports = {
    index,
    show,
    new: newFlight,
    create
}
function index(req, res) {
     Product.find({}, function(err, products) {
       res.render('Product/index', { products });
     });
  }
  function show(req, res) {
    Product.findById(req.params.id, function(err, products) {
        res.render('Product/index', { products });
      });)
}
  
function newFlight(req, res) {
    res.render('flights/new');
}
function create(req, res){
    const flight = new Flight(req.body);
    flight.departs.setFullYear(flight.departs.getFullYear() + 1)
    flight.save(function(err){
        if (err){
            return res.redirect('flights/new');
        }
          res.redirect(`/flights/${flight._id}`)
    })
}
