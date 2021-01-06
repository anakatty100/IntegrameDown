const { model, Schema } = require('mongoose');

const Campaign = new Schema({
    name: String,
    description: String,
    year: String,
});

module.exports = model('Campaign', Campaign);