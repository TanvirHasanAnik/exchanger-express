const express = require('express');
const router = express();
const controller = require('../controllers/userProductsController');

router.get('/products-list',controller.productsList);
router.get('/all-products-list',controller.allProductList);
router.get('/expected-products-list',controller.expectedProductList);
router.get('/get-product',controller.getProduct);
router.get('/get-category',controller.getCategory);
router.get('/match-user',controller.matchUser);
router.get('/expected-product-list',controller.getExpectedProductList);
router.get('/expected-category-list',controller.expectedCategoryList);
router.post('/add-product',controller.addProduct);
router.post('/add-expected-product',controller.addExpectedProduct);
router.post('/delete-expected-product',controller.deleteExpectedProduct);

module.exports = router;