const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const locationSchema = mongoose.Schema({
  addressOne: { type: String, required: false, trim: true },
  addressTwo: { type: String, required: false, trim: true },
  city: { type: String, required: false, trim: true },
  state: { type: String, required: false, trim: true },
  zipcode: { type: String, required: false, trim: true },
  country: { type: String, required: false, trim: true },
  phonenumber: { type: String, required: false, trim: true },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: null },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  modifiedBy: { type: Schema.Types.ObjectId, ref: "User", default: null }
});

const tenant = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  tenantUserId: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: null },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  modifiedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  location: { type: locationSchema },
});

module.exports = mongoose.model("Tenant", tenant);
