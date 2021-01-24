const express = require("express");
const router = express.Router();

router.get("/services", (req, res) => {
    res.render("admin/services/service_form");
});

module.exports = router;