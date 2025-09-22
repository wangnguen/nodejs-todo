const express = require("express");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

const clientRoute = require("./routes/index.route");
const errorHandler = require("./middlewares/errrorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(helmet());
app.use(morgan("dev"));

// static files
app.use(express.static(path.join(__dirname, "..", "public")));

// view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// routes
app.use("/", clientRoute);

// catch error
app.use(errorHandler);

module.exports = app;
