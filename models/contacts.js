const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const contactSchema = ({
    fname: {
        type: String,
        required: true },
    lname: {
        type: String,
        required: true },
    phone: {
        type: String,
        required: true },
    address: {
        type: String,
        required: true },
    longitude: Number,
    latitude: Number,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true }
});

module.exports = mongoose.model('Contact', contactSchema);
