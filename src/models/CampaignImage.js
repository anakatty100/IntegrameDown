const { model, Schema } = require('mongoose');

const CampaignImage = new Schema({
    title: String,
    description: String,
    //This is a Populate, which lets you reference documents in other collections.
    //https://mongoosejs.com/docs/populate.html
    campaign:  { type: Schema.Types.ObjectId, ref: 'Campaign' },
    image: {type: Schema.Types.ObjectId, ref: 'Image'},
});

module.exports = model('CampaignImage', CampaignImage);