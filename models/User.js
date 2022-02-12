const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socialSchema = new mongoose.Schema({
  facebook: { type: String, required: false, trim: true },
  twitter: { type: String, required: false, trim: true },
  linkedin: { type: String, required: false, trim: true },
  instagram: { type: String, required: false, trim: true }
});

const addressSchema = new mongoose.Schema({
  address: { type: String, required: false, trim: true },
  city: { type: String, required: false, trim: true },
  state: { type: String, required: false, trim: true },
  zipCode: { type: String, required: false, trim: true },
  country: { type: String, required: false, trim: true }
});

const userInfo = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  birthDate: { type: Date, required: false, trim: true },
  phone: { type: Number, required: false, trim: true },
  image: { type: String, required: false, trim: true },
  about: { type: String, required: false, trim: true }
});

const user = new mongoose.Schema({
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  role: { type: Schema.Types.ObjectId, ref: "Designation", required: true, trim: false },
  employeeId: { type: String, required: true, trim: true },
  joinedDate: { type: Date, default: Date.now() },
  status: { type: Number, default: 1 },
  tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true },
  userinfo: { type: userInfo },
  emergencyContact: { type: userInfo },
  address: { type: addressSchema },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: null },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  modifiedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
    default: null,
  }
});

module.exports = mongoose.model("User", user);
