const express = require("express");
const router = express.Router();
const auth = require("../config/auth");

// Welcome Page
router.get("/", (req, res) => {
  res.render("welcome");
});

// dahboard page
router.get("/dashboard", auth, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

module.exports = router;
