var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const dotenv = require('dotenv');
var mongoDb = "mongodb://localhost/learningsystem";

var usersRouter = require("./routes/users");
var tenantRouter = require('./routes/tenant');

var app = express();

dotenv.config({ path: './.env' });
/**
 * Mongoose connection
 */
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true });
var dbConnectionCheck = mongoose.connection;
dbConnectionCheck.on(
  "error",
  console.error.bind(console, "Mongodb Connection Error")
);
dbConnectionCheck.once("open", function () {
  console.log("Connected successfully");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", usersRouter);
app.use('/api/tenant', tenantRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
});

module.exports = app;
