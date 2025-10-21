const express = require("express");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review");
const Campground = require("../models/campground");
const { reviewSchema } = require("../validationSchemas");

const router = express.Router({ mergeParams: true });

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.post("/", validateReview, async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  const { rating, body } = req.body.review;
  const newReview = new Review({ rating, body });
  campground.reviews.push(newReview);
  await newReview.save();
  await campground.save();
  res.redirect(`/campgrounds/${id}`);
});

router.delete("/:reviewId", async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/campgrounds/${id}`);
});

module.exports = router;
