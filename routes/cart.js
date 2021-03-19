const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cart');


router.get('/', cartCtrl.index);
router.post('/', cartCtrl.addToCart);
router.delete('/:id', cartCtrl.delete);
router.delete('/', cartCtrl.emptyCart)

module.exports = router;