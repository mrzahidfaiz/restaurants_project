const express = require("express");
const {
  register,
  login,
  logout,
  refresh,
  getAllUsers
} = require("../controllers/authController");
const auth = require("../middlewares/authHandler");
const {create, getAll, getById, update, deleteById} = require('../controllers/productController');
const {createOrder, getAllOrders, updateOrderByAdmin} = require('../controllers/orderController');

const { Router } = express;

const router = Router();

// auth Routes
router.post("/register", register);

router.post("/login", login);

router.post("/logout", auth, logout);

router.get("/refresh", refresh);

router.get("/users/all", getAllUsers)

// product Routes
router.post("/product", create);

router.get("/product/all", getAll);

router.get("/product/:id", getById);

router.put("/product", update);

router.delete("/product/:id", deleteById);

// Orders Routes
router.post("/order", createOrder);

router.get("/orders/all", getAllOrders);

// router.get("/product/:id", getById);

router.put("/order", updateOrderByAdmin);

// router.delete("/product/:id", deleteById);

module.exports = router;
