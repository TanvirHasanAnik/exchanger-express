const express = require('express');
const router = express();
const controller = require('../controllers/reviewController');

router.post('/add-review',controller.addReview);
router.get('/get-review',controller.getReview);
router.get('/get-review-count',controller.getReviewCounts);
router.get('/sentiment',controller.sentiment);

module.exports = router;