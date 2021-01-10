const express = require("express");
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

/* 
    Gallery RESTful endpoints
*/

router.get("/admin/gallery", async (req, res) => {
    const campaigns = await Campaign.find({}).lean();
    const galleryImages = await CampaignImage.find({}).populate("campaign").lean();

    res.render("admin/gallery/gallery_form", { galleryForm: true, campaigns, galleryImages });
});

router.post("/admin/gallery", async (req, res) => {
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

    res.redirect("/admin/gallery")
});

//should be router.delete ...
router.get("/admin/gallery/delete/:image_id", async (req, res) => {
    const { image_id } = req.params;
    const image = await CampaignImage.findByIdAndDelete(image_id);
    const result = await cloudinary.v2.uploader.destroy(image.public_id);

    res.redirect("/admin/gallery");
});

router.get("/admin/gallery/edit/:image_id", async (req, res) => {
    const { image_id } = req.params;

    const campaignImage = await CampaignImage.findById(image_id).populate("campaign").lean();
    const campaigns = await Campaign.find().lean();

    console.log(campaignImage);
    res.render("admin/gallery/gallery_form_edit", { campaignImage, campaigns });
});

module.exports = router;