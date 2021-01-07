const { model, Schema } = require('mongoose');

const CampaignImage = new Schema({
    title: String,
    description: String,
    campaign:  [{ type: Schema.Types.ObjectId, ref: 'Campaign' }],
    imageURL: String,
    //Public Id provided by claudinary service
    public_id: String,
});

module.exports = model('CampaignImage', CampaignImage);