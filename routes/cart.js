const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cart');

router.get('/', cartCtrl.index);
router.get('/:id', cartCtrl.show);
router.post('/', cartCtrl.create);

module.exports = router;