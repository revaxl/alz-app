const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const medicationSchema = new Schema({
    name: {
        type: String,
        required: true },
    dose: Number,
    taken: {
        type: Boolean,
        default: false },
    user: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'}]
});

module.exports = mongoose.model('Medication', medicationSchema);