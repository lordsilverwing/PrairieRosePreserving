const Product = require('../models/product')
const Cart = require('../models/cart')
const User = require('../models/user')


module.exports = {
    index,
    delete : deleteItem,
    addToCart,
    emptyCart,

}

async function index(req, res) {
	if (!req.user || !req.user.id) {
		return res.redirect('/user')
	}
	const carts = await Cart.find({
		userId: req.user.id
	})
	if (!carts.length) {
		const newCart = await Cart.create({
			userId: req.user.id,
			products: []
		});
		newCart = await newCart.save();
		carts = [newCart]
	}
	res.render('cart/index', {
		carts
	});
}
async function deleteItem(req, res) {
	const productId = req.params.id;
	const userId = req.user.id;
	let cart = await Cart.findOne({
		userId
	})
	if (cart) {
		let itemIndex = cart.products.findIndex(p => p.productId == productId);
		if (itemIndex > -1) {
			cart.products.splice(itemIndex, 1)
			cart = await cart.save();
			return res.redirect('/cart')
		}
	}
}
async function addToCart(req, res) {
	if (!req.user || !req.user.id) {
		return res.redirect('/user')
	}
	const {
		product: productId,
		quantity,
		name,
		price
	} = req.body;
	const userId = req.user.id;
	try {
		let cart = await Cart.findOne({
			userId
		});
		if (cart) {
			let itemIndex = cart.products.findIndex(p => p.productId == productId);
			if (itemIndex > -1) {
				let productItem = cart.products[itemIndex];
				productItem.quantity = quantity;
				cart.products[itemIndex] = productItem;
			} else {
				cart.products.push({
					productId,
					quantity,
					name,
					price
				});
			}
			cart = await cart.save();
			return res.redirect('/products')
		} else {
			const newCart = await Cart.create({
				userId,
				products: [{
					productId,
					quantity,
					name,
					price
				}]
			});
			return res.redirect('/products');
		}
	} catch (err) {
		res.send(err)
	}
};
async function emptyCart(req, res) {
	const userId = req.user.id;
	try {
		let cart = await Cart.findOne({
			userId
		})
		cart.products = [];
		let data = await cart.save();
		res.redirect('/')
	} catch (err) {
		res.send(err)
	}
}