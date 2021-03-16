const express = require('express');
const router = express.Router();
const productsCtrl = require('../controllers/products');

router.get('/', productsCtrl.index);
router.get('/new', productsCtrl.newProduct);
router.get('/:id', productsCtrl.show);
router.post('/', productsCtrl.create);

module.exports = router;
