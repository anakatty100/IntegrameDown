const express = require("express");
const router = express.Router();

const Campaign = require("../../models/Campaign.js");
const CampaignImage = require("../../models/CampaignImage");

const campaignController = require("../../controllers/campaign");

/* 
    Campaign RESTful endpoints
*/

router.get("/campaign", campaignController.getCampaign);

router.post("/campaign", campaignController.postCampaign);

router.get("/campaign/delete/:campaign_id", campaignController.getDeleteCampaign);

router.get("/campaign/edit/:campaign_id", campaignController.getEditCampaign);

router.post("/campaign/edit/:campaign_id", campaignController.postEditCampaign);

module.exports = router;