const express = require("express");
const campgroundControllers = require("../controllers/campgrounds");
const {
  isLoggedIn,
  isAuthorized,
  validateCampground,
} = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });

const router = express.Router();

router
  .route("/")
  .get(campgroundControllers.index)
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    campgroundControllers.createCampground
  );

router.get("/new", isLoggedIn, campgroundControllers.renderNewForm);

router
  .route("/:id")
  .get(campgroundControllers.showCampground)
  .put(
    isLoggedIn,
    isAuthorized,
    validateCampground,
    campgroundControllers.updateCampground
  )
  .delete(isLoggedIn, isAuthorized, campgroundControllers.deleteCampground);

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthorized,
  campgroundControllers.renderEditForm
);

module.exports = router;
