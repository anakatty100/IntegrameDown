const express = require("express");
const { route } = require("../app");
const router = express.Router();

const CampaignImage = require("../models/CampaignImage.js");
const Campaign = require("../models/Campaign.js");
const cloudinary = require("cloudinary");
const fs = require("fs-extra");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


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


router.get("/events/id", (req, res) => {
    res.render("event-details", { eventDetails: true });
});

router.get("/gallery", async (req, res) => {
    const galleryImages = await CampaignImage.find({}).lean();
    const campaignNames = galleryImages.map((image) => {
        return {
            id: image.campaignId,
            name: image.campaign,
        };
    });
    res.render("gallery", { gallery: true, galleryImages, campaignNames });
});

router.get("/gallery/add", async (req, res) => {
    const campaigns = await Campaign.find({}).lean();
    res.render("gallery_form", { galleryForm: true, campaigns });
});

router.post("/gallery/add", async (req, res) => {
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const { title, campaign, description } = req.body;
    const newImageGallery = new CampaignImage({
        title: title,
        description: description,
        campaign: campaign,
        campaignId: campaign.replace(/\s/g, ""),
        imageURL: result.url,
        public_id: result.public_id,
    });

    const dbResponse = await newImageGallery.save();

    await fs.unlink(req.file.path);

    res.redirect("/gallery")
});

router.get("/campaign/add", (req, res) => {
    res.render("campaign_form");
});

router.post("/campaign/add", async (req, res) => {
    const { name, description, year } = req.body;
    const newCampaign = Campaign({
        name: name,
        description: description,
        year: year,
    });

    const dbResponse = await newCampaign.save();

    res.redirect("/gallery/add");
});

router.get("/faq", (req, res) => {
    res.render("faq", { faq: true });
});

router.get("/contact", (req, res) => {
    res.render("contact", { contact: true });
});

module.exports = router;
