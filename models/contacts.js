const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const contactSchema = ({
    fname: String,
    lname: String,
    phone: String,
    adress: String,
    longitude: Number,
    latitude: Number
});

module.exports = mongoose.model('Contact', contactSchema);
