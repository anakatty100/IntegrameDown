const express = require("express"),
    methodOverride = require("method-override"),
    morgan = require("morgan"),
    multer = require("multer"),
    exphdbs = require("express-handlebars"),
    path = require("path"),
    bodyParser = require("body-parser");

//Database URI callback
const mongodb = require('./database');

const rootDir = require("./lib/path");

//Initialization
const app = express();
app.use(methodOverride('_method'));




//Settings
app.set("port", process.env.PORT || 5000);
app.set("views", path.join(rootDir, "views"));

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

//Midlewares
//Funciones que se ejecutan antes de llegar
//a las rutas
app.use(morgan("dev"));

//Parse application /x-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Multer is a midleware that transform the incoming files (images)
//and add them in a local folder
const storage = multer.diskStorage({
    destination: path.join(rootDir, "public", "uploads"),
    filename: (req, file, callback) => {
        callback(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({ storage: storage }).single("image"));

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());


//Public
console.log("Root dir: ", rootDir);
app.use(express.static(path.join(rootDir, "public")));

//Routes
app.use(require("./routes/index"));

app.use("/admin", require("./routes/admin/index"));
app.use("/admin", require("./routes/admin/gallery"));
app.use("/admin", require("./routes/admin/campaign"));
app.use("/admin", require("./routes/admin/event"));
app.use("/admin", require("./routes/admin/service"));



module.exports = app;
