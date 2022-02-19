const express = require("express");
const path = require("path");

const homeRoutes = require("./routes/home");
const productsRoutes = require("./routes/products");

const app = express();

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/", homeRoutes);

app.use("/products", productsRoutes);

app.listen(6767);
