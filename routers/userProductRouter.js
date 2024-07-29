const express = require('express');
const router = express();
const controller = require('../controllers/userProductsController');

router.get('/products-list',controller.productsList);
router.post('/add-product',controller.addProduct);

module.exports = router;