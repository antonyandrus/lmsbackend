const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const tenant = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    addressOne: {type: String, required: false, trim: true},
    addressTwo: {type: String, required: false, trim: true},
    city: {type: String, required: false, trim: true},
    state: {type: String, required: false, trim: true},
    zipcode: {type: String, required: false, trim: true},
    country: {type: String, required: false, trim: true},
    phonenumber: {type: String, required: false, trim: true},
    tenantUserId: {type: ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Tenant', tenant);