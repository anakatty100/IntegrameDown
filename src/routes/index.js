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
    const campaignNames = await Campaign.find({}).lean();
    res.render("gallery", { gallery: true, galleryImages, campaignNames });
});

router.get("/gallery/add", async (req, res) => {
    const campaigns = await Campaign.find({}).lean();
    const galleryImages = await CampaignImage.find({}).populate("campaign").lean();

    console.log("--------------------");
    console.log('%j', galleryImages);
    console.log("--------------------");
    res.render("gallery_form", { galleryForm: true, campaigns, galleryImages });
});

router.post("/gallery/add", async (req, res) => {
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const { title, campaign, description } = req.body;

    const newImageGallery = new CampaignImage({
        title: title,
        description: description,
        campaign: campaign,
        imageURL: result.url,
        public_id: result.public_id,
    });

    const dbResponse = await newImageGallery.save();

    try {
        await fs.unlink(req.file.path);
    } catch (e) {
        console.log(e);
    }


    res.redirect("/gallery/add")
});

//should be router.delete ...
router.get("/gallery/delete/:image_id", async (req, res) => {
    const { image_id } = req.params;
    const image = await CampaignImage.findByIdAndDelete(image_id);
    const result = await cloudinary.v2.uploader.destroy(image.public_id);

    res.redirect("/gallery/add");
});

router.get("/campaign/add", async (req, res) => {

    const campaigns = await Campaign.find({}).lean();
    console.log(campaigns);
    res.render("campaign_form", { campaigns });
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

//should be router.delete ...
router.get("/campaign/delete/:campaign_id", async (req, res) => {
    const { campaign_id } = req.params;
    const campaign = await Campaign.findByIdAndDelete(campaign_id);

    res.redirect("/campaign/delete");
});

router.get("/faq", (req, res) => {
    res.render("faq", { faq: true });
});

router.get("/contact", (req, res) => {
    res.render("contact", { contact: true });
});

module.exports = router;
