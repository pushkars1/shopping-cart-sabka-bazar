const express = require("express");
const { getHomeData } = require("../controllers/home");

const router = express.Router();

router.get('/home', getHomeData);

module.exports = router;
