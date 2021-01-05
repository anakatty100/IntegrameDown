const { model, Schema } = require('mongoose');

const CampaignImage = new Schema({
    title: String,
    description: String,
    campaign: String,
    imageURL: String,
    //Public Id provided by claudinary service
    public_id: String,
});

module.exports = model('CampaignImage', CampaignImage);