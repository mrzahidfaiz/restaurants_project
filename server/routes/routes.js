const express = require("express");
const {
  register,
  login,
  logout,
  refresh,
} = require("../controllers/authController");
const auth = require("../middlewares/authHandler");

const { Router } = express;

const router = Router();

// auth Routes
router.post("/register", register);

router.post("/login", login);

router.post("/logout", auth, logout);

router.get("/refresh", refresh);

module.exports = router;
