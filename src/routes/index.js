const express = require("express");
const router = express.Router();

const CampaignImage = require("../models/CampaignImage.js");
const Campaign = require("../models/Campaign.js");
const Event = require("../models/Event");

const { sortEventDates, dateToEsObj } = require("../lib/formatTime");

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

router.get("/events", async (req, res) => {
    const eventsData = await Event.find({}).lean();
    sortEventDates(eventsData);
    const events = eventsData.map((item) => {
        const event = {
            ...item,
            dateTimeFormated: dateToEsObj(item.datetime),
        };
        return event;
    });
    console.log(events);
    res.render("events", { events });
});


router.get("/events/:event_id", async (req, res) => {
    const { event_id } = req.params;
    let event = await Event.findById(event_id).lean();
    event.dateTimeFormated = dateToEsObj(event.datetime);
    const content = JSON.stringify(event.content);
    res.render("event-details", { eventDetails: true, event, eventDetailsScript: true, content});
});

router.get("/gallery", async (req, res) => {

    const galleryImages = await CampaignImage.find().populate([{
        path: 'campaign',
        model: 'Campaign'
    }, {
        path: 'image',
        model: 'Image'
    }]).lean();

    const campaignNames = await Campaign.find({}).lean();

    res.render("gallery", { gallery: true, galleryImages, campaignNames });
});



router.get("/faq", (req, res) => {
    res.render("faq", { faq: true });
});

router.get("/contact", (req, res) => {
    res.render("contact", { contact: true });
});

module.exports = router;