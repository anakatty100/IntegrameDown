const express = require("express");
const router = express.Router();

const Campaign = require("../models/Campaign.js");
const CampaignImage = require("../models/CampaignImage");
const { route } = require("./index.js");
let ObjectId = require("mongoose").Types.ObjectId;

/* 
    Campaign RESTful endpoints
*/

router.get("/admin/campaign", async (req, res) => {

    const campaigns = await Campaign.find({}).lean();
    console.log(campaigns);
    res.render("admin/campaigns/campaign_form", { campaigns });
});

router.post("/admin/campaign", async (req, res) => {
    const { name, description, year } = req.body;
    const newCampaign = Campaign({
        name: name,
        description: description,
        year: year,
    });

    const dbResponse = await newCampaign.save();

    res.redirect("/admin/campaign");
});

//should be router.delete ...
router.get("/admin/campaign/delete/:campaign_id", async (req, res) => {
    const { campaign_id } = req.params;
    //Safe relational remove from arrays:
    //https://stackoverflow.com/questions/19786075/mongoose-deleting-pull-a-document-within-an-array-does-not-work-with-objectid
    const campaign = await Campaign.findByIdAndDelete(campaign_id);
    //Delete the CampaignImage that has the campaign related information
    //in all the matched queries
    await CampaignImage.update({}, { $pull: { campaign: campaign_id } });

    res.redirect("/admin/campaign");
});

router.get("/admin/campaign/edit/:campaign_id", async (req, res) => {
    const { campaign_id } = req.params;

    const campaign = await Campaign.findById(campaign_id).lean();
    res.render("admin/campaigns/campaign_form_edit", { campaign });
});

router.post("/admin/campaign/edit/:campaign_id", async (req, res) => {
    const { campaign_id } = req.params;

    const { name, description, year } = req.body;

    console.log({
        name, description, year,
    });

    const campaign = await Campaign.findByIdAndUpdate(campaign_id, {
        name: name,
        description: description,
        year: year,
    });
    res.redirect("/admin/campaign");
});

module.exports = router;