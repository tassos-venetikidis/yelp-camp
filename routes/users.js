const express = require("express");
const router = express.Router();
const passport = require("passport");
const userControllers = require("../controllers/users");
const { storeReturnTo } = require("../middleware");

router.get("/register", userControllers.renderRegisterForm);

router.post("/register", userControllers.registerUser);

router.get("/login", userControllers.renderLoginForm);

router.post(
  "/login",
  storeReturnTo,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  userControllers.login
);

router.get("/logout", userControllers.logout);

module.exports = router;
