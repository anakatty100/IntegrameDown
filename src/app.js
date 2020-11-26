const express = require("express"),
    exphdbs = require("express-handlebars"),
    path = require("path"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    session = require("session");

//Initialization
const app = express();

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

//Settings
app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "views"));

//Html templating setup
app.engine(
    ".hbs",
    exphdbs({
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        extname: ".hbs",
        helpers: require("./lib/handlebars.js"),
    })
);

//Html templating use
app.set("view engine", ".hbs");

//Parse application /x-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Public
app.use(express.static(path.join(__dirname, "public")));
app.use("/services",express.static(path.join(__dirname, "public")));
app.use("/events",express.static(path.join(__dirname, "public")));

//Routes
app.use(require("./routes/index.js"));

//Starting the server
app.listen(app.get("port"), () => {
    console.log("Server on port:", app.get("port"));
});
