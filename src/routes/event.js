const express = require("express");
const { route } = require(".");
const router = express.Router();

router.get("/events", (req, res) => {
    res.render("events", { events: true });
});


router.get("/events/:id", (req, res) => {
    res.render("event-details", { eventDetails: true });
});

module.exports = router;
