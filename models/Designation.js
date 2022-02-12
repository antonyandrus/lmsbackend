const mongoose = require('mongoose');

const designation = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    status: { type: Number, default: 1 }
});

module.exports = mongoose.model('Designation', designation);