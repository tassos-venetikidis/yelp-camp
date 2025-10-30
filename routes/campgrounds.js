const express = require("express");
const Campground = require("../models/campground");
const campgroundControllers = require("../controllers/campgrounds");
const {
  isLoggedIn,
  isAuthorized,
  validateCampground,
} = require("../middleware");

const router = express.Router();

router.get("/", campgroundControllers.index);

router.get("/new", isLoggedIn, campgroundControllers.renderNewForm);

router.post(
  "/",
  isLoggedIn,
  validateCampground,
  campgroundControllers.createCampground
);

router.get("/:id", campgroundControllers.showCampground);

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthorized,
  campgroundControllers.renderEditForm
);

router.put(
  "/:id",
  isLoggedIn,
  isAuthorized,
  validateCampground,
  campgroundControllers.updateCampground
);

router.delete(
  "/:id",
  isLoggedIn,
  isAuthorized,
  campgroundControllers.deleteCampground
);

module.exports = router;
