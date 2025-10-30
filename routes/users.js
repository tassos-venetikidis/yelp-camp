const express = require("express");
const router = express.Router();
const passport = require("passport");
const userControllers = require("../controllers/users");
const { storeReturnTo } = require("../middleware");

router
  .route("/register")
  .get(userControllers.renderRegisterForm)
  .post(userControllers.registerUser);

router
  .route("/login")
  .get(userControllers.renderLoginForm)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    userControllers.login
  );

router.get("/logout", userControllers.logout);

module.exports = router;
