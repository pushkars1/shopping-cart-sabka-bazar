const fs = require("fs");
const path = require("path");
exports.getHomeData = (req, res, next) => {
  const filePath = path.join(
    __dirname,
    "..",
    "mockdata",
    "categories",
    "index.get.json"
  );
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  res.status(200).json({ data });
};
