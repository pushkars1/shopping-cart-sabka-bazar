const express = require("express");

const router = express.Router();

const {
  getAllProducts,
  getProductsByCategory,
  getProductById,
} = require("../controllers/products");

router.get("/allproducts", getAllProducts);

router.get("/:categoryId", getProductsByCategory);

router.get("/product/:productId", getProductById);

module.exports = router;
