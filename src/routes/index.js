const express = require("express");
const router = express.Router();

//Main routes of the app
router.get("/", (req, res) => {
    //Pass a local variable to the view index: true
    res.render("index", { index: true });
});

module.exports = router;
