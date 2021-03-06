const { model, Schema } = require("mongoose");

const Event = new Schema({
   title: String,
   datetime: Object,
   price: Number,
   location: String,
   locationLink: String,
   bookLink: String,
   lookEventLink: String,
   content: Object,
});

module.exports = model('Event', Event);