const express = require("express");
const router = express.Router();

/* router.get("/events", (req, res) => {
    res.render("events", { events: true });
});


router.get("/events/:id", (req, res) => {
    res.render("event-details", { eventDetails: true });
}); */

router.get("/event", (req, res) => {
    res.render("admin/events/event_form", { event: true });
});

module.exports = router;
