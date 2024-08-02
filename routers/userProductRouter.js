const express = require('express');
const router = express();
const controller = require('../controllers/userProductsController');

router.get('/products-list',controller.productsList);
router.get('/get-category',controller.getCategory);
router.post('/add-product',controller.addProduct);
router.post('/expected-product',controller.expectedProduct);

module.exports = router;