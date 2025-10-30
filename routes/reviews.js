const express = require("express");
const reviewControllers = require("../controllers/reviews");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthorized,
} = require("../middleware");

const router = express.Router({ mergeParams: true });

router.post("/", isLoggedIn, validateReview, reviewControllers.createReview);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthorized,
  reviewControllers.deleteReview
);

module.exports = router;
