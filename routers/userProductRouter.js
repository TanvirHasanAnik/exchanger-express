const express = require('express');
const router = express();
const controller = require('../controllers/userProductsController');

router.get('/products-list',controller.productsList);
router.get('/get-category',controller.getCategory);
router.get('/match-user',controller.matchUser);
router.get('/expected-product-list',controller.getExpectedProductList);
router.post('/add-product',controller.addProduct);
router.post('/add-expected-product',controller.addExpectedProduct);

module.exports = router;