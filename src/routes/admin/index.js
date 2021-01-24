const router = require("express").Router();

router.get("/", (req, res)=> {
    res.render("admin/admin");
});

module.exports = router;