const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const Review = require('../models/Review');

// @route   POST api/reviews
// @desc    Add a review
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('service', 'Service is required').not().isEmpty(),
      check('rating', 'Rating is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { service, rating, comments } = req.body;

    try {
      const newReview = new Review({
        user: req.user.id,
        service,
        rating,
        comments,
      });

      const review = await newReview.save();
      res.json(review);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/reviews
// @desc    Get all reviews
// @access  Public
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
