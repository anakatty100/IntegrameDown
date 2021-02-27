const Campaign = require("../models/Campaign");
const CampaignImage = require("../models/CampaignImage");

module.exports.getCampaign = async (req, res) => {
    const campaigns = await Campaign.find({}).lean();

    res.render("admin/campaigns/campaign_form", { campaigns });
};

module.exports.postCampaign = async (req, res) => {
    const { name, description, year } = req.body;
    const newCampaign = Campaign({
        name: name,
        description: description,
        year: year,
    });

    const dbResponse = await newCampaign.save();

    res.redirect("/admin/campaign");
};

module.exports.getDeleteCampaign = async (req, res) => {
    const { campaign_id } = req.params;
    //Safe relational remove from arrays:
    const campaign = await Campaign.findByIdAndDelete(campaign_id);
    //Delete the CampaignImage that has the campaign related information
    //in all the matched queries
    await CampaignImage.update({ campaign: campaign_id }, { campaign: null });

    res.redirect("/admin/campaign");
};

module.exports.getEditCampaign = async (req, res) => {
    const { campaign_id } = req.params;

    const campaign = await Campaign.findById(campaign_id).lean();
    res.render("admin/campaigns/campaign_form_edit", { campaign });
};

module.exports.postEditCampaign = async (req, res) => {
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
};