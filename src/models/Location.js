const { model, Schema } = require("mongoose");

const Location = new Schema({
    title: String,
    lat: String,
    lng: String,
});

module.exports = model('Location', Location);