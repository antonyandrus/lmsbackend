const mongoose = require('mongoose');

const user = new mongoose.Schema({
    email: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    name: {type: String, required: false, trim: true}
});

module.exports = mongoose.model('User', user);