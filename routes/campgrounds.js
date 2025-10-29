const express = require("express");
const Campground = require("../models/campground");
const {
  isLoggedIn,
  isAuthorized,
  validateCampground,
} = require("../middleware");

const router = express.Router();

router.get("/", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

router.post("/", isLoggedIn, validateCampground, async (req, res) => {
  const { title, location, image, price, description } = req.body.campground;
  const author = req.user._id;
  const campground = new Campground({
    title,
    location,
    image,
    price,
    description,
    author,
  });
  await campground.save();
  req.flash("success", "Successfully made a new campground!");
  res.redirect(`/campgrounds/${campground._id}`);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("author");
  if (!campground) {
    req.flash("error", "Cannot find that campground!");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground });
});

router.get("/:id/edit", isLoggedIn, isAuthorized, async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Cannot find that campground!");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/edit", { campground });
});

router.put(
  "/:id",
  isLoggedIn,
  isAuthorized,
  validateCampground,
  async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash("success", "Successfully updated campground!");
    res.redirect(`/campgrounds/${id}`);
  }
);

router.delete("/:id", isLoggedIn, isAuthorized, async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted campground!");
  res.redirect("/campgrounds");
});

module.exports = router;
