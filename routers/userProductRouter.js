const express = require('express');
const router = express();
const controller = require('../controllers/userProductsController');

router.get('/products-list/:id',controller.productsList);

module.exports = router;