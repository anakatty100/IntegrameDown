const express = require("express"),
    methodOverride = require("method-override"),
    morgan = require("morgan"),
    multer = require("multer"),
    exphdbs = require("express-handlebars"),
    path = require("path"),
    bodyParser = require("body-parser"),
    session = require("session");

const mongodb = require('./database');

//Initialization
const app = express();
app.use(methodOverride('_method'))




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

//Midlewares
//Funciones que se ejecutan antes de llegar
//a las rutas
app.use(morgan("dev"));
//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
    destination: path.join(__dirname, "public/uploads"),
    filename: (req, file, callback) => {
        callback(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({ storage: storage }).single("image"));

//Parse application /x-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

//Public
app.use(express.static(path.join(__dirname, "public")));
app.use("/services", express.static(path.join(__dirname, "public")));
app.use("/events", express.static(path.join(__dirname, "public")));
app.use("/gallery", express.static(path.join(__dirname, "public")));
app.use("/campaign", express.static(path.join(__dirname, "public")));
app.use("/admin", express.static(path.join(__dirname, "public")));

app.use("/admin/gallery", express.static(path.join(__dirname, "public")));
app.use("/admin/gallery/edit", express.static(path.join(__dirname, "public")));
app.use("/admin/campaign", express.static(path.join(__dirname, "public")));

//Routes
app.use(require("./routes/index"));
app.use(require("./routes/gallery"));
app.use(require("./routes/campaign"));



module.exports = app;
