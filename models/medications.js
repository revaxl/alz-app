const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const medicationSchema = new Schema({
    name: {
        type: String,
        required: true },
    dose: Number,
    time: {
        type: Date,
        required: true
    },
    taken: {
        type: String,
        default: false },
    user: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'}]
});

module.exports = mongoose.model('Medication', medicationSchema);