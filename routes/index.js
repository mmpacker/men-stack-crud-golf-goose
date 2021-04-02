const router = require("express").Router();

router.get("/", function (req, res) {
  res.render("index", { title: "Golf Goose", user: req.user ? req.user : null });
});

module.exports = router;
