const { model, Schema } = require("mongoose");

const Event = new Schema({
   title: String,
   date: Date,
   price: Number,
   bookLink: String,
   lookEventLink: String,
   // Pendiente de almacenar con editor de texto wygwys
   paragraph: String, 
   images:  [{ type: Schema.Types.ObjectId, ref: 'Image' }],
   location: { type: Schema.Types.ObjectId, ref: 'Location' },
});

module.exports = model('Event', Event);