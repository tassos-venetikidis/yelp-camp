const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  const { rating, body } = req.body.review;
  const newReview = new Review({ rating, body });
  newReview.author = req.user._id;
  campground.reviews.push(newReview);
  await newReview.save();
  await campground.save();
  req.flash("success", "Successfully created new review!");
  res.redirect(`/campgrounds/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted review!");
  res.redirect(`/campgrounds/${id}`);
};
