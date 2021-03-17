const Product = require('../models/product')
const Cart = require('../models/cart')
const User = require('../models/user')

module.exports = {
    index,
    delete : deleteItem,
    addToCart
}

function index(req, res) {
  if(!req.user || !req.user.id){
    return res.redirect('/')
  }
       Cart.find({userId: req.user.id}, function(err, carts){
         console.log(carts[0], 'this is the user/cart')
         res.render('cart/index', { cart:carts[0] });
       })
        
    // });
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
  const { product: productId, quantity, name, price } = req.body;

  const userId = req.user.id; //TODO: the logged in user id

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
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ productId, quantity, name, price });
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
    console.log(err);
    res.status(500).send("Something went wrong");
  }
}; 