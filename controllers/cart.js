const Product = require('../models/product')
const Cart = require('../models/cart')
const User = require('../models/user')


module.exports = {
    index,
    delete : deleteItem,
    addToCart,
    emptyCart
}

function index(req, res) {
  if(!req.user || !req.user.id){
    return res.redirect('/user')
  }
    Cart.find({userId: req.user.id}, function(err, carts){
    res.render('cart/index', { carts });
    })
}
async function deleteItem(req, res) {
  const productId = req.params.id;
  const userId = req.user.id;
  let cart = await Cart.findOne({userId})
  if (cart) {
    let itemIndex = cart.products.findIndex(p => p.productId == productId);
    if (itemIndex > -1) {
      cart.products.splice(index, 1)
      cart = await cart.save();
      return res.redirect('/cart')
    }
  }
}
async function addToCart(req, res) {
  if(!req.user || !req.user.id){
    return res.redirect('/user')
  }
  const { product: productId, quantity, name, price } = req.body;

  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
        cart.total = cart.products.reduce((acc, product) => { return acc + (product.price * product.quantity) }, 0);
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ productId, quantity, name, price });
        cart.total = cart.products.reduce((acc, product) => { return acc + (product.price * product.quantity) }, 0);
      }
      cart = await cart.save();
      return res.redirect('/products')
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity, name, price }]
      });

      return res.redirect('/products');
    }
  } catch (err) {
    res.send(err)
  }
}; 

// function getCartTotal() {
//   price.total = price[0].products.reduce((acc, product) => { return acc + (product.price * product.quantity) }, 0);
// }

async function emptyCart(req, res) {
  const userId = req.user.id; 
  try {
      let cart = await Cart.findOne({userId})
      cart.products = [];
      cart.total = 0
      let data = await cart.save();
      res.redirect('/cart')
   } catch (err) {
      res.send(err)
  }
}