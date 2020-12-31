const mongoose = require('mongoose');

//Connect DB
// Mongo Path -> mongod --dbpath=/home/mike/data
mongoose.connect("mongodb://localhost:integrame", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("DB connected");
});