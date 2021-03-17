const express = require("express");
const router = express.Router();

const CampaignImage = require("../models/CampaignImage.js");
const Campaign = require("../models/Campaign.js");
const Event = require("../models/Event");

const { sortEventDates, dateToEsObj } = require("../lib/formatTime");

const indexController = require("../controllers/index");

//Main routes of the app
router.get("/", indexController.getIndex);

router.get("/about", indexController.getAbout);

router.get("/services", indexController.getServices);

router.get("/events", indexController.getEvents);

router.get("/events/:event_id", indexController.getEventId);

router.get("/gallery", indexController.getGallery);

router.get("/faq", indexController.getFaq);

router.get("/contact", indexController.getContact);

module.exports = router;