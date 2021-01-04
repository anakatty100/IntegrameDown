const express = require("express");
const router = express.Router();

//Main routes of the app
router.get("/", (req, res) => {
    //Pass a local variable to the view index: true
    res.render("index", { index: true });
});

router.get("/about", (req, res) => {
    //Pass a local variable to the view index: true
    res.render("about", { about: true });
});

router.get("/services", (req, res) => {
    res.render("services", { services: true });
});

router.get("/services/id", (req, res) => {
    res.render("service-details", { serviceDetails: true });
});

router.get("/events", (req, res) => {
    res.render("events", { events: true });
});

router.get("/events/id", (req, res)=> {
    res.render("event-details", {eventDetails: true});
});

router.get("/gallery", (req, res) => {
    res.render("gallery", {gallery: true});
});

router.get("/gallery/add", (req, res) => {
    res.render("gallery_form", {galleryForm: true});
});

router.get("/faq", (req, res)=> {
    res.render("faq", {faq: true});
});

router.get("/contact", (req, res)=> {
    res.render("contact", {contact: true});
});

module.exports = router;
