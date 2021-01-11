const { model, Schema } = require("mongoose");

const Image = new Schema({
    title: String,
    imageURL: String,
    //Public Id provided by claudinary service
    public_id: String,
});

module.exports = model("Image", Image);