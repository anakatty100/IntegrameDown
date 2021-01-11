const { model, Schema } = require("mongoose");

const Event = new Schema({
   title: String,
   date: Date,  
   price: Number,
   bookLink: String, 
   lookEvent: String,
   paragraph: String,
   
});

module.exports = model('Event', Event);