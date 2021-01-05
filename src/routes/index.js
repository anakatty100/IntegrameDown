const express = require("express");
const { route } = require("../app");
const router = express.Router();

const CampaignImage = require("../models/CampaignImage.js");
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

router.get("/events/id", (req, res)=> {
    res.render("event-details", {eventDetails: true});
});

router.get("/gallery", (req, res) => {
    res.render("gallery", {gallery: true});
});

router.get("/gallery/add", (req, res) => {
    res.render("gallery_form", {galleryForm: true});
});

router.post("/gallery/add", async (req, res)=> {
    //console.log(req.body);
    //console.log(req.file);

    const result = await cloudinary.v2.uploader.upload(req.file.path);
    //console.log(result);

    const {title, campaign, description} = req.body;
    const newImageGallery = new CampaignImage({
        title: title,
        description: description,
        campaign: campaign,
        imageURL: result.url,
        public_id: result.public_id,
    });

    await newImageGallery.save();
    
    await fs.unlink(req.file.path);

    res.send("Hi!")
});

router.get("/faq", (req, res)=> {
    res.render("faq", {faq: true});
});

router.get("/contact", (req, res)=> {
    res.render("contact", {contact: true});
});

module.exports = router;
