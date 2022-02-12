const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const createError = require("http-errors");
const dotenv = require('dotenv').config();
const path = require("path");

// Routers
const usersRouter = require("./routes/users");
const tenantRouter = require('./routes/tenant');

/**
 * Mongoose connection
 */
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const dbConnectionCheck = mongoose.connection;
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
