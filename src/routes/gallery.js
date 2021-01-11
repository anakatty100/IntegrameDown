const express = require("express");
const router = express.Router();

const cloudinaryHandler = require("../lib/cloudinary");
const fs = require("fs-extra");

const CampaignImage = require("../models/CampaignImage.js");
const Campaign = require("../models/Campaign.js");

/* 
    Gallery RESTful endpoints
*/

router.get("/gallery", async (req, res) => {
    const galleryImages = await CampaignImage.find({}).lean();
    const campaignNames = await Campaign.find({}).lean();
    res.render("gallery", { gallery: true, galleryImages, campaignNames });
});

router.get("/admin/gallery", async (req, res) => {
    const campaigns = await Campaign.find({}).lean();
    const galleryImages = await CampaignImage.find({}).populate("campaign").lean();

    res.render("admin/gallery/gallery_form", { galleryForm: true, campaigns, galleryImages });
});

router.post("/admin/gallery", async (req, res) => {
    const result = await cloudinaryHandler.upload(req.file.path);
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

    res.redirect("/admin/gallery")
});

//should be router.delete ...
router.get("/admin/gallery/delete/:image_id", async (req, res) => {
    const { image_id } = req.params;
    const image = await CampaignImage.findByIdAndDelete(image_id);
    const result = await cloudinaryHandler.destroy(image.public_id);

    res.redirect("/admin/gallery");
});

router.get("/admin/gallery/edit/:image_id", async (req, res) => {
    const { image_id } = req.params;

    const campaignImage = await CampaignImage.findById(image_id).populate("campaign").lean();
    const campaigns = await Campaign.find().lean();

    const individualCamp = campaignImage.campaign[0];

    res.render("admin/gallery/gallery_form_edit", { campaignImage, individualCamp, campaigns });
});

router.post("/admin/gallery/edit/:image_id", async (req, res) => {
    const { image_id } = req.params;
    console.log(image_id);
    const { campaign, title, description } = req.body;

    try {
        req.file.path
    } catch (e) {
        console.log("Upps!");
        console.log(e);
    }
    if (req.file === undefined) {
        // None image was uploaded, there are no changes in the image data
        const campaignImage = await CampaignImage.findByIdAndUpdate(image_id, {
            title: title,
            description: description,
            campaign: campaign,
        });
    } else {
        console.log("Hey! entramos");
        // A new image was uploaded, there are changes in the image data
        const campaignImage = await CampaignImage.findById(image_id).populate("campaign").lean();

        await cloudinaryHandler.destroy(campaignImage.public_id);
        const result = await cloudinaryHandler.upload(req.file.path);

        const newCampaignImage = await CampaignImage.findByIdAndUpdate(image_id, {
            title: title,
            description: description,
            campaign: campaign,
            imageURL: result.url,
            public_id: result.public_id,
        });
    }

    res.redirect("/admin/gallery");
});

module.exports = router;