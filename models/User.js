const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    name: {type: String, required: false, trim: true}
});

module.exports = mongoose.model('User', User);