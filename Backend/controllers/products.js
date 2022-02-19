const path = require("path");
const fs = require("fs");
const filePath = path.join(
  __dirname,
  "..",
  "mockdata",
  "products",
  "index.get.json"
);
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

exports.getAllProducts = (req, res, next) => {
  res.status(200).json({ data });
};

exports.getProductsByCategory = (req, res, next) => {
  const { categoryId } = req.params;
  if (categoryId === "allproducts") {
    return this.getAllProducts(req, res, next);
  }
  const filteredData = data.filter((item) => item.category === categoryId);
  res.status(200).json({ data: filteredData });
};

exports.getProductById = (req, res, next) => {
  const { productId } = req.params;
  const product = data.filter((item) => item.id === productId);
  res.status(200).json({ data: product });
};
